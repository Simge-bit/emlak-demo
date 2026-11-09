#!/usr/bin/env python3
"""Her gün web sitesi olmayan emlak ofisleri için önizleme siteleri hazırlar ve listeyi e-postayla gönderir.

Kullanım:
    python3 araclar/gunluk_onizleme.py            # 10 ofis hazırlar, e-posta gönderir
    python3 araclar/gunluk_onizleme.py --adet 3 --eposta-yok

Akış:
  1. OpenStreetMap'ten telefonu kayıtlı, web sitesi kayıtlı olmayan emlak ofisleri alınır (haftada bir yenilenir).
  2. Daha önce önizleme hazırlanmamış ofisler arasından seçim yapılır. Zincir markalar atlanır.
  3. Her ofis için bölgesine uygun temsili ilanlarla klasik şablonda önizleme üretilir (araclar/demo_olustur.py).
  4. Seçilen ofisler data/gonderilenler.json dosyasına yazılır.
  5. Önizleme linkleri ve hazır WhatsApp mesajlarıyla bir liste e-postası gönderilir.

E-posta için ortam değişkenleri: SMTP_KULLANICI, SMTP_SIFRE, LISTE_ALICI (Brevo SMTP).
Harita verisi: © OpenStreetMap katkıda bulunanlar (ODbL).
"""
import argparse
import hashlib
import html
import json
import os
import random
import re
import smtplib
import sys
import time
import urllib.parse
import urllib.request
from datetime import date, datetime, timedelta
from email.mime.text import MIMEText
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import demo_olustur  # noqa: E402

KOK = Path(__file__).resolve().parent.parent
VERI = KOK / "data"
ADAY_DOSYA = VERI / "osm-adaylar.json"
GONDERILEN = VERI / "gonderilenler.json"
SITE = "https://onizleme.konutra.com.tr/demo/"
UA = "konutra-onizleme/1.0 (github.com/Simge-bit/emlak-demo)"
OVERPASS = "https://overpass-api.de/api/interpreter"
BROSUR = "https://konutra.com.tr/konutra-brosur.pdf"

# Taranacak iller ve bölgeye göre yaklaşık metrekare fiyatları (TL, 2026 sonu, temsili ilanlar için)
ILLER = {"İstanbul": (62000, 330), "Ankara": (36000, 210), "İzmir": (48000, 260), "Bursa": (34000, 190),
         "Antalya": (52000, 280), "Kocaeli": (33000, 190), "Muğla": (70000, 330), "Mersin": (30000, 170),
         "Adana": (24000, 140), "Konya": (25000, 140), "Gaziantep": (22000, 130), "Kayseri": (24000, 130),
         "Eskişehir": (28000, 160), "Tekirdağ": (30000, 170), "Aydın": (38000, 210), "Sakarya": (28000, 160),
         "Samsun": (25000, 140), "Trabzon": (27000, 150)}
ZINCIR = ["remax", "re/max", "coldwell", "century 21", "century21", "turyap", "era ", "keller williams", "realty world",
          "dialog", "rozi", "emlakjet", "hepsiemlak", "sahibinden", "tapu.com", "engel & völkers", "engel&völkers", "sotheby"]
RENKLER = ["#1F2D5C", "#7A1F2B", "#1E4D3A", "#2B3A55", "#5B2A86", "#0F4C5C", "#6B3E26", "#283618"]
KAPAKLAR = ["img/ev-modern-havuz.jpg", "img/ev-beyaz-villa.jpg", "img/ev-modern-villa.jpg", "img/ev-havuzlu-villa.jpg", "img/ev-catili.jpg"]
IC = ["img/ic-gri-salon.jpg", "img/ic-moda-salon.jpg", "img/ic-genis-salon.jpg", "img/ic-bitkili-salon.jpg", "img/ic-urla-salon.jpg",
      "img/ic-ahsap-salon.jpg", "img/ic-bebek-salon.jpg", "img/ic-sari-koltuk.jpg"]
IC2 = ["img/ic-beyaz-mutfak.jpg", "img/ic-mutfak.jpg", "img/ic-beyaz-yatak.jpg", "img/ic-yemek.jpg", "img/ic-cam-merdiven.jpg"]


def istek(url, veri=None, bekle=1.1):
    time.sleep(bekle)
    r = urllib.request.Request(url, data=veri, headers={"User-Agent": UA})
    return json.load(urllib.request.urlopen(r, timeout=120))


def overpass(sorgu):
    """Harita servisi yoğunken hata verebilir. Üç kez, artan aralıklarla denenir."""
    for deneme in range(3):
        try:
            return istek(OVERPASS, urllib.parse.urlencode({"data": sorgu}).encode(), bekle=2 + deneme * 15)["elements"]
        except Exception:
            if deneme == 2:
                raise


def adaylari_getir():
    """OpenStreetMap'teki Türkiye geneli emlak ofislerini toplar. Dosya bir haftadan eskiyse yenilenir."""
    if ADAY_DOSYA.exists() and datetime.fromtimestamp(ADAY_DOSYA.stat().st_mtime) > datetime.now() - timedelta(days=7):
        return json.loads(ADAY_DOSYA.read_text(encoding="utf-8"))
    q = '[out:json][timeout:240];area["ISO3166-1"="TR"]["admin_level"="2"]->.a;(nwr["office"="estate_agent"](area.a);nwr["shop"="estate_agent"](area.a););out center tags;'
    try:
        ogeler = overpass(q)
    except Exception as h:
        print(f"! Harita verisi alınamadı: {h}")
        return json.loads(ADAY_DOSYA.read_text(encoding="utf-8")) if ADAY_DOSYA.exists() else []
    adaylar = []
    for e in ogeler:
        t = e.get("tags", {})
        lat = e.get("lat") or e.get("center", {}).get("lat")
        lng = e.get("lon") or e.get("center", {}).get("lon")
        il = t.get("addr:province") or t.get("addr:city") or ""
        adaylar.append({"id": f'{e["type"]}/{e["id"]}', "il": il, "lat": lat, "lng": lng, "tags": t})
    ADAY_DOSYA.write_text(json.dumps(adaylar, ensure_ascii=False), encoding="utf-8")
    return adaylar


def telefon_duzelt(ham):
    """'+90 532 123 45 67' gibi bir değeri (görünen, whatsapp, cep mi) üçlüsüne çevirir."""
    d = re.sub(r"\D", "", ham.split(";")[0])
    if d.startswith("90"):
        d = d[2:]
    d = d.lstrip("0")
    if len(d) != 10:
        return None
    gorunen = f"0{d[:3]} {d[3:6]} {d[6:8]} {d[8:]}"
    return gorunen, "90" + d, d.startswith("5")


def uygun_mu(a, gonderilen):
    t = a["tags"]
    ad = t.get("name", "").strip()
    if not ad or a["id"] in gonderilen or not a["lat"]:
        return False
    if any(k in t for k in ("website", "contact:website", "url", "contact:instagram_website")):
        return False
    if not any(k in t for k in ("phone", "contact:phone", "contact:mobile")):
        return False
    kucuk = ad.replace("İ", "i").replace("I", "ı").lower()
    # Haritada emlak ofisi olarak işaretlenmiş ama adı başka bir işi anlatan yerler atlanır
    if not re.search(r"emlak|gayrimenkul|gayrımenkul|estate|realty|konut|yatırım|danışmanlık", kucuk):
        return False
    return not any(z in kucuk for z in ZINCIR)


def ters_konum(lat, lng):
    url = "https://nominatim.openstreetmap.org/reverse?" + urllib.parse.urlencode({"lat": lat, "lon": lng, "format": "json", "zoom": 16, "accept-language": "tr"})
    try:
        return istek(url).get("address", {})
    except Exception:
        return {}


def yakin_mahalleler(lat, lng):
    q = f'[out:json][timeout:30];(node["place"~"^(suburb|quarter|neighbourhood)$"](around:2500,{lat},{lng}););out tags;'
    try:
        adlar = [e["tags"].get("name") for e in overpass(q)]
    except Exception:
        adlar = []
    temiz = []
    for a in adlar:
        if a and len(a) < 28 and a not in temiz:
            temiz.append(re.sub(r"\s+Mahallesi$", "", a))
    return temiz


def de_eki(ad):
    """Gaziosmanpaşa'da, Kadıköy'de, Esenyurt'ta"""
    kucuk = ad.replace("I", "ı").replace("İ", "i").lower()
    unluler = re.findall(r"[aeıioöuü]", kucuk)
    unlu = unluler[-1] if unluler else "e"
    return f"{ad}'{'t' if re.search(r'[fstkçşhp]$', kucuk) else 'd'}{'a' if unlu in 'aıou' else 'e'}"


def yuvarla(n, adim):
    return int(round(n / adim) * adim)


def ilanlar_uret(rnd, il, ilce, mahalleler, lat, lng):
    m2_satis, m2_kira = ILLER.get(il, (25000, 140))
    sablon = [
        ("Satılık", "Daire", "3+1", 125, "Asansörlü binada, ara katta {m2} m² 3+1 daire. Ebeveyn banyolu ve kapalı otoparklıdır. Toplu ulaşıma ve okullara yakındır."),
        ("Satılık", "Daire", "2+1", 95, "Bakımlı binada {m2} m² 2+1 daire. Doğalgaz kombili ve balkonludur. Krediye uygundur."),
        ("Satılık", "Daire", "4+1", 170, "Site içinde {m2} m² 4+1 daire. Geniş salon, iki banyo ve kapalı otopark bulunmaktadır."),
        ("Kiralık", "Daire", "2+1", 90, "Ana caddeye yakın, {m2} m² 2+1 daire. Doğalgaz kombili, aileye kiralıktır."),
        ("Satılık", "Daire", "1+1", 60, "Yeni binada {m2} m² 1+1 daire. Kira getirisi yüksek, yatırıma uygundur."),
        ("Kiralık", "Daire", "3+1", 130, "Asansörlü binada {m2} m² 3+1 daire. Aydınlık ve geniş balkonludur."),
        ("Satılık", "Dükkan", None, 70, "Cadde üzerinde, vitrin cepheli {m2} m² dükkan. Kiracılıdır, yatırıma uygundur."),
        ("Satılık", "Daire", "3+1", 140, "Yeni yapılmış binada {m2} m² 3+1 daire. Ankastre mutfak ve kapalı otopark mevcuttur."),
    ]
    mah = mahalleler or [ilce]
    ana, ikinci = rnd.sample(IC, len(IC)), rnd.sample(IC2, len(IC2))
    ilanlar = []
    for i, (tip, kat, oda, m2, acik) in enumerate(sablon):
        m2 = int(m2 * rnd.uniform(.9, 1.12))
        mahalle = mah[i % len(mah)]
        if tip == "Satılık":
            carpan = 1.15 if kat == "Dükkan" else 1
            fiyat = yuvarla(m2 * m2_satis * carpan * rnd.uniform(.85, 1.15), 50000)
        else:
            fiyat = yuvarla(m2 * m2_kira * rnd.uniform(.85, 1.15), 500)
        baslik = f"{de_eki(mahalle)} {tip} " + (f"{oda} Daire" if oda else "Dükkan")
        gorseller = [ana[i % len(ana)], ikinci[i % len(ikinci)]]
        x = {"id": f"ilan-{i + 1}", "baslik": baslik, "tip": tip, "kategori": kat, "il": il, "ilce": ilce, "mahalle": mahalle,
             "fiyat": fiyat, "m2": m2, "kat": "Zemin kat" if kat == "Dükkan" else f"{rnd.randint(1, 6)}. kat", "yas": rnd.randint(2, 18),
             "aciklama": acik.format(m2=m2), "gorseller": gorseller,
             "lat": round(lat + rnd.uniform(-.008, .008), 5), "lng": round(lng + rnd.uniform(-.01, .01), 5)}
        if oda:
            x["oda"], x["banyo"], x["isitma"] = oda, 2 if oda in ("4+1",) else 1, "Kombi (doğalgaz)"
        if tip == "Kiralık":
            x["aidat"] = yuvarla(rnd.uniform(400, 1200), 50)
        ilanlar.append(x)
    return ilanlar


def ad_duzelt(ad):
    """'fazilet emlak' -> 'Fazilet Emlak'. Büyük harfli kısaltmalara (RE, GYO) dokunulmaz."""
    def kelime(k):
        if not k or k.isupper() or not k[0].isalpha():
            return k
        ilk = {"i": "İ", "ı": "I"}.get(k[0], k[0].upper())
        return ilk + k[1:]
    return " ".join(kelime(k) for k in ad.split(" "))


def ofis_hazirla(a):
    t = a["tags"]
    ad = ad_duzelt(re.sub(r"\s+", " ", t["name"]).strip())
    tel = telefon_duzelt(t.get("contact:mobile") or t.get("phone") or t.get("contact:phone"))
    if not tel:
        return None
    adres_osm = ters_konum(a["lat"], a["lng"])
    il = adres_osm.get("province") or adres_osm.get("state") or a["il"] or ""
    il = re.sub(r"\s+(İli|ili)$", "", il)
    if not il:
        return None
    a = {**a, "il": il}
    ilce = t.get("addr:district") or adres_osm.get("town") or adres_osm.get("county") or adres_osm.get("city_district") or a["il"]
    mahalle = adres_osm.get("suburb") or adres_osm.get("quarter") or adres_osm.get("neighbourhood")
    mahalleler = yakin_mahalleler(a["lat"], a["lng"])
    if mahalle:
        mahalle = re.sub(r"\s+Mahallesi$", "", mahalle)
        mahalleler = [mahalle] + [m for m in mahalleler if m != mahalle]
    mahalleler = mahalleler[:5]
    sokak = " ".join(x for x in (t.get("addr:street"), ("No: " + t["addr:housenumber"]) if t.get("addr:housenumber") else None) if x)
    adres = ", ".join(x for x in (f"{mahalle} Mah." if mahalle else None, sokak or None, ilce, a["il"]) if x)
    tohum = int(hashlib.md5(a["id"].encode()).hexdigest(), 16)
    rnd = random.Random(tohum)
    kisa = ad.split(" ")[0]
    klasor = demo_olustur.slug(ad)
    if (KOK / "demo" / klasor).exists():
        klasor = f"{klasor}-{tohum % 1000}"
    ilanlar = ilanlar_uret(rnd, a["il"], ilce, mahalleler, a["lat"], a["lng"])
    ayar = {
        "klasor": klasor, "sablon": "klasik", "ortak_gorsel": True,
        "ofis": {
            "ad": ad, "kisa": kisa, "telefon": tel[0], "whatsapp": tel[1] if tel[2] else "", "eposta": "",
            "adres": adres, "yetki": "", "renk": RENKLER[tohum % len(RENKLER)], "temsili": True, "kapak": KAPAKLAR[tohum % len(KAPAKLAR)],
            "tanitim": f"{ad}, {ilce} merkezli olarak konut, işyeri ve arsa alım satım ve kiralama süreçlerinde danışmanlık hizmeti vermektedir.",
            "hakkinda": f"{ilce} ve çevresindeki portföyümüzle alıcı, satıcı ve kiracılara hizmet sunmaktayız.",
            "aciklama": f"{ilce} ve çevresinde satılık ve kiralık daire, işyeri ve arsa ilanları.",
            "demoNot": f"Bu sayfa {ad} için hazırlanmış bir tasarım önizlemesidir. İlanlar ve fotoğraflar temsilidir.",
            "saatler": "Pazartesi - Cumartesi, 09.00 - 19.00",
        },
        "ofisler": [{"sehir": ilce, "adres": adres, "tel": tel[0], "lat": round(a["lat"], 5), "lng": round(a["lng"], 5)}],
        "danismanlar": [], "istatistik": [], "tarihce": [], "yazilar": [],
        "ilanlar": ilanlar,
    }
    yol = KOK / "ofisler" / "otomatik" / f"{klasor}.json"
    yol.parent.mkdir(parents=True, exist_ok=True)
    yol.write_text(json.dumps(ayar, ensure_ascii=False, indent=1), encoding="utf-8")
    demo_olustur.main(str(yol))
    return {"osm": a["id"], "ad": ad, "il": a["il"], "ilce": ilce, "telefon": tel[0], "whatsapp": tel[1] if tel[2] else None,
            "cep": tel[2], "link": f"{SITE}{klasor}/", "klasor": klasor, "tarih": date.today().isoformat()}


def mesaj(o):
    return (f"Merhaba, iyi günler. Ben Simge Solmaz, emlak ofislerine kurumsal web sitesi hazırlayan Konutra'nın kurucusuyum. "
            f"Ofisinizin numarasına haritalardaki herkese açık işletme kaydınızdan ulaştım.\n\n"
            f"{o['ad']} için ücretsiz bir site örneği hazırladım, sizden herhangi bir bilgi veya ödeme istemiyorum.\n{o['link']}\n\n"
            f"Örnekteki ilanlar temsilidir. Beğenirseniz mevcut ilanlarınızla hazırlanmış halini de ücretsiz iletebilirim. "
            f"Sorularınızı bu numaradan yazılı olarak iletebilirsiniz.\n\n"
            f"Mesaj almak istemezseniz belirtmeniz yeterlidir.\nkonutra.com.tr")


def eposta_gonder(liste):
    kullanici, sifre, alici = os.environ.get("SMTP_KULLANICI"), os.environ.get("SMTP_SIFRE"), os.environ.get("LISTE_ALICI")
    if not (kullanici and sifre and alici):
        print("! SMTP bilgileri yok, e-posta gönderilmedi.")
        return
    satirlar = []
    for o in liste:
        if o["whatsapp"]:
            dugme = f'<a href="https://wa.me/{o["whatsapp"]}?text={urllib.parse.quote(mesaj(o))}" style="display:inline-block;background:#1F2D5C;color:#fff;text-decoration:none;font-weight:bold;padding:10px 16px;border-radius:6px">WhatsApp\'ta aç</a>'
        else:
            dugme = f'<a href="tel:+{"90" + re.sub(r"\D", "", o["telefon"])[1:]}" style="display:inline-block;background:#fff;color:#1F2D5C;border:1px solid #1F2D5C;text-decoration:none;font-weight:bold;padding:9px 15px;border-radius:6px">Sabit hat, arayın</a>'
        satirlar.append(f"""<tr><td style="padding:16px 0;border-top:1px solid #e4e6eb">
<div style="font-size:16px;font-weight:bold;color:#1d2129">{html.escape(o['ad'])}</div>
<div style="font-size:13px;color:#5f6573;margin:3px 0 10px">{html.escape(o['ilce'])}, {html.escape(o['il'])} · {html.escape(o['telefon'])}</div>
{dugme} &nbsp; <a href="{o['link']}" style="color:#1F2D5C;font-size:14px">Önizlemeyi gör</a></td></tr>""")
    govde = f"""<!DOCTYPE html><html lang="tr"><body style="margin:0;background:#f4f5f8;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" style="padding:20px 10px"><tr><td align="center"><table role="presentation" width="100%" style="max-width:560px;background:#fff;border-radius:10px;padding:24px">
<tr><td><div style="font-size:13px;color:#5f6573">Konutra günlük liste</div><h1 style="margin:4px 0 6px;font-size:22px;color:#1F2D5C">{len(liste)} ofis için önizleme hazır</h1>
<p style="margin:0 0 6px;font-size:14px;color:#3b3f4a;line-height:1.5">Her ofiste "WhatsApp'ta aç" düğmesine bastığınızda mesaj ve önizleme linki hazır yazılmış olarak açılır. Göndermeden önce önizlemeye bir kez bakmanız önerilir.</p></td></tr>
{''.join(satirlar)}
<tr><td style="padding-top:16px;border-top:1px solid #e4e6eb;font-size:12px;color:#8a8f9c">Ofis bilgileri OpenStreetMap verisinden alınmıştır. Yanlış ya da kapanmış ofisleri atlayabilirsiniz.</td></tr>
</table></td></tr></table></body></html>"""
    m = MIMEText(govde, "html", "utf-8")
    m["Subject"] = f"Konutra: bugün {len(liste)} ofis için önizleme hazır"
    m["From"] = "Konutra <bildirim@konutra.com.tr>"
    m["To"] = alici
    with smtplib.SMTP("smtp-relay.brevo.com", 587, timeout=60) as s:
        s.starttls()
        s.login(kullanici, sifre)
        s.sendmail("bildirim@konutra.com.tr", [alici], m.as_string())
    print(f"E-posta gönderildi: {alici}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--adet", type=int, default=15)
    ap.add_argument("--eposta-yok", action="store_true")
    ap.add_argument("--liste", help="Hazırlanan listeyi bu dosyaya yaz (depo dışında bir yol)")
    ap.add_argument("--eposta-gonder", help="Daha önce yazılmış listeyi e-postayla gönder ve çık")
    arg = ap.parse_args()
    if arg.eposta_gonder:
        eposta_gonder(json.loads(Path(arg.eposta_gonder).read_text(encoding="utf-8")))
        return
    VERI.mkdir(exist_ok=True)
    gonderilen = json.loads(GONDERILEN.read_text(encoding="utf-8")) if GONDERILEN.exists() else []
    gidenler = {g["osm"] for g in gonderilen}
    adaylar = [a for a in adaylari_getir() if uygun_mu(a, gidenler)]
    # Her gün karışık seçim. WhatsApp'tan ulaşılabilen cep telefonlu ofisler öne alınır.
    rnd = random.Random(date.today().toordinal())
    rnd.shuffle(adaylar)
    def cep(a):
        t = a["tags"]
        tel = telefon_duzelt(t.get("contact:mobile") or t.get("phone") or t.get("contact:phone") or "")
        return bool(tel and tel[2])
    adaylar.sort(key=lambda a: not cep(a))
    print(f"Uygun aday: {len(adaylar)}")
    hazir = []
    for a in adaylar:
        if len(hazir) >= arg.adet:
            break
        try:
            o = ofis_hazirla(a)
        except Exception as h:
            print(f"! {a['tags'].get('name')} hazırlanamadı: {h}")
            continue
        if o:
            hazir.append(o)
    # Depo herkese açık olduğu için yalnızca harita kimliği, klasör ve tarih saklanır
    gonderilen += [{"osm": o["osm"], "klasor": o["klasor"], "tarih": o["tarih"]} for o in hazir]
    GONDERILEN.write_text(json.dumps(gonderilen, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Hazırlanan: {len(hazir)}")
    if arg.liste:
        Path(arg.liste).write_text(json.dumps(hazir, ensure_ascii=False), encoding="utf-8")
    elif hazir and not arg.eposta_yok:
        eposta_gonder(hazir)


if __name__ == "__main__":
    main()
