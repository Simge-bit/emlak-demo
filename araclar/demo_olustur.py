#!/usr/bin/env python3
"""Bir emlak ofisi için kişiye özel demo üretir.

Kullanım:
    python3 araclar/demo_olustur.py ofisler/ofis-adi.json

Çıktı demo/<klasor>/ altına yazılır ve şu adresten açılır:
    https://simge-bit.github.io/emlak-demo/demo/<klasor>/

Demo, tasarım dosyalarını (css, js, yazı tipi) ana siteden kullanır. Bu yüzden ana sitede
yapılan her tasarım düzeltmesi bütün demolara kendiliğinden yansır. Demo klasöründe
yalnızca sayfalar, ofis ayarı (js/ofis.js) ve ofisin kendi fotoğrafları bulunur.
"""
import json
import re
import shutil
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
from datetime import date
from io import BytesIO
from pathlib import Path

from PIL import Image

KOK = Path(__file__).resolve().parent.parent
SITE = "https://simge-bit.github.io/emlak-demo/"
SAYFALAR = ["index.html", "ilanlar.html", "ilan.html", "hizmetler.html", "danismanlar.html", "danisman.html",
            "hakkimizda.html", "blog.html", "yazi.html", "iletisim.html", "degerleme.html", "kvkk.html"]
AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
UA = "emlak-demo-olusturucu/1.0 (github.com/Simge-bit/emlak-demo)"


def slug(metin):
    tr = str.maketrans("çğıöşüÇĞİÖŞÜ", "cgiosuCGIOSU")
    s = unicodedata.normalize("NFKD", metin.translate(tr)).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def bugun():
    d = date.today()
    return f"{d.day} {AYLAR[d.month - 1]} {d.year}"


def gorsel_kaydet(kaynak, hedef_ad, cikti, genislik):
    """Fotoğrafı linkten indirir ya da diskten okur, büyük ve küçük sürümünü kaydeder."""
    if re.match(r"^https?://", kaynak):
        istek = urllib.request.Request(kaynak, headers={"User-Agent": UA})
        veri = urllib.request.urlopen(istek, timeout=30).read()
        im = Image.open(BytesIO(veri))
    else:
        yol = Path(kaynak)
        if not yol.is_absolute():
            yol = KOK / yol
        im = Image.open(yol)
    im = im.convert("RGB")
    for klasor, w in (("img/p", genislik), ("img/p/sm", 760)):
        kopya = im.copy()
        if kopya.width > w:
            kopya = kopya.resize((w, round(kopya.height * w / kopya.width)), Image.LANCZOS)
        (cikti / klasor).mkdir(parents=True, exist_ok=True)
        kopya.save(cikti / klasor / hedef_ad, quality=74, optimize=True, progressive=True)
    return f"img/p/{hedef_ad}"


def konum_bul(*parcalar):
    """Adresten enlem ve boylam bulur (OpenStreetMap Nominatim, ücretsiz). Saniyede bir istek sınırı vardır."""
    q = ", ".join(p for p in parcalar if p) + ", Türkiye"
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({"q": q, "format": "json", "limit": 1})
    time.sleep(1.1)
    try:
        sonuc = json.load(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30))
    except Exception as e:  # ağ hatasında demo yine üretilsin
        print(f"  ! Konum bulunamadı ({q}): {e}")
        return None
    if not sonuc:
        print(f"  ! Konum bulunamadı: {q}")
        return None
    return round(float(sonuc[0]["lat"]), 5), round(float(sonuc[0]["lon"]), 5)


def ilan_tamamla(x, sira, danisman_idleri):
    x = dict(x)
    x.setdefault("id", slug(f'{x.get("mahalle", "")} {x["baslik"]}'))
    x.setdefault("ilanNo", str(1000 + sira))
    x.setdefault("tarih", bugun())
    x.setdefault("tip", "Satılık")
    x.setdefault("kategori", "Daire")
    x.setdefault("tapu", "Kat mülkiyetli")
    x.setdefault("kredi", x["tip"] == "Satılık")
    x.setdefault("aidat", 0)
    x.setdefault("banyo", 1)
    x.setdefault("kat", "")
    x.setdefault("yas", 0)
    x.setdefault("isitma", "Kombi")
    x.setdefault("ozellikler", [])
    x.setdefault("aciklama", "")
    if x.get("danisman") not in danisman_idleri:
        x["danisman"] = danisman_idleri[0] if danisman_idleri else None
    if "lat" not in x or "lng" not in x:
        # Mahalle ya da site adı haritada bulunamazsa ilçenin merkezi kullanılır
        k = konum_bul(x.get("mahalle"), x.get("ilce"), x.get("il")) or konum_bul(x.get("ilce"), x.get("il"))
        if k:
            x["lat"], x["lng"] = k
    return x


def main(ayar_yolu):
    ayar = json.loads(Path(ayar_yolu).read_text(encoding="utf-8"))
    ofis = ayar["ofis"]
    klasor = ayar.get("klasor") or slug(ofis["ad"])
    cikti = KOK / "demo" / klasor
    if cikti.exists():
        shutil.rmtree(cikti)
    (cikti / "js").mkdir(parents=True)
    adres = f"{SITE}demo/{klasor}/"
    print(f"Demo hazırlanıyor: {ofis['ad']} -> demo/{klasor}/")

    ofis.setdefault("kisa", ofis["ad"].split(" ")[0])
    ofis["site"] = adres
    ofis.setdefault("demoNot", f"Bu sayfa {ofis['ad']} için hazırlanmış bir tasarım önizlemesidir.")
    veri = {"ofis": ofis}

    # Ofisler
    if "ofisler" in ayar:
        ofisler = []
        for o in ayar["ofisler"]:
            o = dict(o)
            if "lat" not in o or "lng" not in o:
                k = konum_bul(o.get("adres"), o.get("sehir"))
                if k:
                    o["lat"], o["lng"] = k
            ofisler.append(o)
        veri["ofisler"] = ofisler

    # Danışmanlar
    danisman_idleri = None
    if "danismanlar" in ayar:
        dl = []
        for d in ayar["danismanlar"]:
            d = dict(d)
            d.setdefault("id", slug(d["ad"]))
            d.setdefault("unvan", "Danışman")
            d.setdefault("bolge", "")
            d.setdefault("bio", "")
            d.setdefault("tel", ofis.get("telefon", ""))
            if d.get("foto"):
                d["foto"] = gorsel_kaydet(d["foto"], f"kisi-{d['id']}.jpg", cikti, 900)
            else:
                d["foto"] = "img/kisi-orhan.jpg"
            dl.append(d)
        veri["danismanlar"] = dl
        danisman_idleri = [d["id"] for d in dl]

    # İlanlar
    if "ilanlar" in ayar:
        if danisman_idleri is None:
            danisman_idleri = ["elif"]  # danışman verilmezse ana demonun danışmanları kullanılır
        il = []
        for i, x in enumerate(ayar["ilanlar"]):
            x = ilan_tamamla(x, i + 1, danisman_idleri)
            print(f"  ilan {i + 1}: {x['baslik']}")
            kaynaklar, x["gorseller"] = x.get("gorseller", []), []
            for n, g in enumerate(kaynaklar):
                try:
                    x["gorseller"].append(gorsel_kaydet(g, f"{x['id']}-{n + 1}.jpg", cikti, 1800))
                except Exception as e:  # tek bir fotoğraf yüzünden bütün demo durmasın
                    print(f"  ! Fotoğraf alınamadı ({e}): {g}")
            # Fotoğrafı inmeyen ilan demoya alınmaz. Gerçek bir ofisin ilanına başka evin fotoğrafı konmamalı.
            if not x["gorseller"]:
                print(f"  ! Fotoğrafı olmadığı için demoya alınmadı: {x['baslik']}")
                continue
            il.append(x)
        veri["ilanlar"] = il
        veri["vitrin"] = ayar.get("vitrin") or [x["id"] for x in il[:4]]
        veri["ayinEvi"] = ayar.get("ayinEvi", "")

    for anahtar in ("istatistik", "tarihce", "hizmetler", "yazilar"):
        if anahtar in ayar:
            veri[anahtar] = ayar[anahtar]

    # Ana sitenin örnek yazılarındaki yazarlar yeni danışmanlarla eşleşmezse ilk danışmana bağlanır
    yazar_duzelt = f"""
  if (D.yazilar && D.danismanlar.length) D.yazilar.forEach((y) => {{ if (!D.danismanlar.some((d) => d.id === y.yazar)) y.yazar = D.danismanlar[0].id; }});""" if danisman_idleri else ""

    js = f"""// {ofis['ad']} için üretilmiş ofis ayarı. Bu dosyayı elle değil, araclar/demo_olustur.py ile üretin.
(function () {{
  const D = window.DATA, ayar = {json.dumps(veri, ensure_ascii=False, indent=1)};
  Object.assign(D.ofis, ayar.ofis);
  delete ayar.ofis;
  Object.assign(D, ayar);{yazar_duzelt}
  // Ana sitenin fotoğrafları iki klasör yukarıda durur
  const yol = (v) => typeof v === "string" && v.startsWith("img/") && !v.startsWith("img/p/") ? "../../" + v : v;
  const gez = (o) => {{ for (const k in o) {{ if (o[k] && typeof o[k] === "object") gez(o[k]); else o[k] = yol(o[k]); }} }};
  gez(D);
}})();
"""
    (cikti / "js" / "ofis.js").write_text(js, encoding="utf-8")

    # Sayfalar: tasarım dosyaları ana siteden, isimler ofisten
    sehirler = ", ".join(dict.fromkeys(o["sehir"] for o in veri.get("ofisler", []))) or ""
    aciklama = ofis.get("aciklama") or f"{ofis['ad']} satılık ve kiralık ev ilanları" + (f", {sehirler}" if sehirler else "") + "."
    ilk_gorsel = veri["ilanlar"][0]["gorseller"][0] if veri.get("ilanlar") else "img/ev-zekeriyakoy.jpg"
    for ad in SAYFALAR:
        s = (KOK / ad).read_text(encoding="utf-8")
        s = s.replace('src="js/ofis.js"', 'src="__OFIS__"')
        s = re.sub(r'(href|src)="(css|js|fonts|img)/', r'\1="../../\2/', s)
        s = s.replace('href="favicon.svg"', 'href="../../favicon.svg"').replace('src="__OFIS__"', 'src="js/ofis.js"')
        s = s.replace("Ihlamur Gayrimenkul", ofis["ad"]).replace("Ihlamur", ofis["kisa"])
        s = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{aciklama}">', s)
        s = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{aciklama}">', s)
        s = re.sub(r'<link rel="canonical"[^>]*>\n', "", s)
        og = ilk_gorsel if ilk_gorsel.startswith("img/p/") else ilk_gorsel
        s = re.sub(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{adres if og.startswith("img/p/") else SITE}{og}">', s)
        s = s.replace('<meta name="theme-color"', '<meta name="robots" content="noindex, nofollow">\n<meta name="theme-color"', 1)
        (cikti / ad).write_text(s, encoding="utf-8")

    print(f"Hazır. Yerelde: http://localhost:8791/demo/{klasor}/  Yayında: {adres}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
