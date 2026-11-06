// Körfez Emlak için üretilmiş ofis ayarı. Bu dosyayı elle değil, araclar/demo_olustur.py ile üretin.
(function () {
  const D = window.DATA, ayar = {
 "ofis": {
  "ad": "Körfez Emlak",
  "kisa": "Körfez",
  "telefon": "0 232 000 00 10",
  "whatsapp": "905320000010",
  "eposta": "bilgi@korfez.example",
  "adres": "Atatürk Cad. No 00, Karşıyaka, İzmir",
  "yetki": "3500000",
  "renk": "#1F3A5F",
  "tanitim": "Körfez Emlak, 2008 yılından bu yana Karşıyaka merkezli olarak konut ve işyeri alım satım ve kiralama süreçlerinde danışmanlık hizmeti vermektedir.",
  "hakkinda": "Ofisimiz Karşıyaka Atatürk Caddesi üzerinde yer almaktadır. Karşıyaka, Bostanlı, Mavişehir ve Atakent bölgelerindeki portföyümüzle alıcı, satıcı ve kiracılara hizmet sunmaktayız.",
  "demoNot": "Bu sayfa aracın nasıl çalıştığını göstermek için hazırlanmış hayali bir örnektir.",
  "aciklama": "Karşıyaka, Bostanlı ve Mavişehir'de satılık ve kiralık daire, müstakil ev ve işyeri ilanları.",
  "saatler": "Pazartesi - Cumartesi, 09.00 - 19.00",
  "kapak": "img/ev-modern-havuz.jpg",
  "site": "https://simge-bit.github.io/emlak-demo/demo/ornek-ofis/"
 },
 "ofisler": [
  {
   "sehir": "Karşıyaka",
   "adres": "Atatürk Cad. No 00, Karşıyaka, İzmir",
   "tel": "0 232 000 00 10",
   "lat": 38.4561,
   "lng": 27.1095
  }
 ],
 "danismanlar": [
  {
   "id": "ayse",
   "ad": "Ayşe Demir",
   "unvan": "Kurucu",
   "bolge": "Karşıyaka",
   "foto": "img/p/kisi-ayse.jpg",
   "bio": "Ayşe Demir, 2008 yılında Körfez Emlak'ı kurmuştur. Karşıyaka'da konut alım satımı ve kentsel dönüşüm projelerinde danışmanlık vermektedir.",
   "tel": "0 232 000 00 10"
  },
  {
   "id": "mert",
   "ad": "Mert Arslan",
   "unvan": "Danışman",
   "bolge": "Bostanlı",
   "foto": "img/p/kisi-mert.jpg",
   "bio": "Mert Arslan, Bostanlı ve Mavişehir bölgelerinde kiralık ve satılık konut danışmanlığı yapmaktadır.",
   "tel": "0 232 000 00 10"
  }
 ],
 "ilanlar": [
  {
   "baslik": "Bostanlı'da Deniz Manzaralı Satılık 3+1 Daire",
   "tip": "Satılık",
   "kategori": "Daire",
   "il": "İzmir",
   "ilce": "Karşıyaka",
   "mahalle": "Bostanlı",
   "fiyat": 9850000,
   "oda": "3+1",
   "m2": 140,
   "banyo": 2,
   "kat": "6. kat",
   "yas": 8,
   "danisman": "ayse",
   "aidat": 1800,
   "aciklama": "Bostanlı sahiline iki dakika yürüme mesafesinde, 6. katta 140 m² 3+1 daire. Salon ve balkon körfez manzaralıdır. Asansörlü ve kapalı otoparklı binada yer almaktadır. Krediye uygundur.",
   "ozellikler": [
    "Deniz manzarası",
    "Asansör",
    "Otopark"
   ],
   "gorseller": [
    "img/p/bostanli-bostanli-da-deniz-manzarali-satilik-3-1-daire-1.jpg",
    "img/p/bostanli-bostanli-da-deniz-manzarali-satilik-3-1-daire-2.jpg",
    "img/p/bostanli-bostanli-da-deniz-manzarali-satilik-3-1-daire-3.jpg"
   ],
   "id": "bostanli-bostanli-da-deniz-manzarali-satilik-3-1-daire",
   "ilanNo": "1001",
   "tarih": "6 Kasım 2026",
   "tapu": "Kat mülkiyetli",
   "kredi": true,
   "isitma": "Kombi",
   "lat": 38.45703,
   "lng": 27.09836
  },
  {
   "baslik": "Yalı Mahallesi'nde Bahçeli Satılık Müstakil Ev",
   "tip": "Satılık",
   "kategori": "Müstakil ev",
   "il": "İzmir",
   "ilce": "Karşıyaka",
   "mahalle": "Yalı",
   "fiyat": 16500000,
   "oda": "4+1",
   "m2": 220,
   "banyo": 2,
   "kat": "2 katlı",
   "yas": 25,
   "danisman": "ayse",
   "aciklama": "Karşıyaka Yalı Mahallesi'nde, ağaçlı bir sokakta 220 m² iki katlı müstakil ev. Ön ve arka bahçeli, meyve ağaçlıdır. Otopark alanı mevcuttur.",
   "ozellikler": [
    "Bahçe",
    "Şömine"
   ],
   "gorseller": [
    "img/p/yali-yali-mahallesi-nde-bahceli-satilik-mustakil-ev-1.jpg",
    "img/p/yali-yali-mahallesi-nde-bahceli-satilik-mustakil-ev-2.jpg"
   ],
   "id": "yali-yali-mahallesi-nde-bahceli-satilik-mustakil-ev",
   "ilanNo": "1002",
   "tarih": "6 Kasım 2026",
   "tapu": "Kat mülkiyetli",
   "kredi": true,
   "aidat": 0,
   "isitma": "Kombi",
   "lat": 38.46775,
   "lng": 27.09124
  },
  {
   "baslik": "Mavişehir'de Site İçinde Eşyalı Kiralık 2+1 Daire",
   "tip": "Kiralık",
   "kategori": "Daire",
   "il": "İzmir",
   "ilce": "Karşıyaka",
   "mahalle": "Mavişehir",
   "fiyat": 32000,
   "oda": "2+1",
   "m2": 95,
   "banyo": 1,
   "kat": "3. kat",
   "yas": 12,
   "danisman": "mert",
   "aidat": 1500,
   "aciklama": "Havuzlu ve güvenlikli site içinde, 3. katta 95 m² 2+1 daire. Eşyalı olarak kiralanmaktadır. Aidat dahil değildir.",
   "ozellikler": [
    "Eşyalı",
    "Site içinde",
    "Havuz"
   ],
   "gorseller": [
    "img/p/mavisehir-mavisehir-de-site-icinde-esyali-kiralik-2-1-daire-1.jpg",
    "img/p/mavisehir-mavisehir-de-site-icinde-esyali-kiralik-2-1-daire-2.jpg"
   ],
   "id": "mavisehir-mavisehir-de-site-icinde-esyali-kiralik-2-1-daire",
   "ilanNo": "1003",
   "tarih": "6 Kasım 2026",
   "tapu": "Kat mülkiyetli",
   "kredi": false,
   "isitma": "Kombi",
   "lat": 38.48222,
   "lng": 27.08298
  },
  {
   "baslik": "Atakent'te Yeni Binada Satılık 3+1 Daire",
   "tip": "Satılık",
   "kategori": "Daire",
   "il": "İzmir",
   "ilce": "Karşıyaka",
   "mahalle": "Atakent",
   "fiyat": 11200000,
   "oda": "3+1",
   "m2": 150,
   "banyo": 2,
   "kat": "4. kat",
   "yas": 1,
   "danisman": "mert",
   "aciklama": "Kentsel dönüşümle yeniden yapılan binada, 4. katta 150 m² 3+1 daire. Yerden ısıtma, ebeveyn banyosu ve kapalı otopark mevcuttur. Krediye uygundur.",
   "ozellikler": [
    "Sıfır bina",
    "Kapalı otopark",
    "Yerden ısıtma"
   ],
   "gorseller": [
    "img/p/atakent-atakent-te-yeni-binada-satilik-3-1-daire-1.jpg",
    "img/p/atakent-atakent-te-yeni-binada-satilik-3-1-daire-2.jpg",
    "img/p/atakent-atakent-te-yeni-binada-satilik-3-1-daire-3.jpg"
   ],
   "id": "atakent-atakent-te-yeni-binada-satilik-3-1-daire",
   "ilanNo": "1004",
   "tarih": "6 Kasım 2026",
   "tapu": "Kat mülkiyetli",
   "kredi": true,
   "aidat": 0,
   "isitma": "Kombi",
   "lat": 38.46635,
   "lng": 27.08803
  },
  {
   "id": "bostanli-kiralik-3-1",
   "baslik": "Bostanlı'da Sahile Yakın Kiralık 3+1 Daire",
   "tip": "Kiralık",
   "kategori": "Daire",
   "il": "İzmir",
   "ilce": "Karşıyaka",
   "mahalle": "Bostanlı",
   "fiyat": 38000,
   "oda": "3+1",
   "m2": 130,
   "banyo": 2,
   "kat": "2. kat",
   "yas": 10,
   "isitma": "Kombi (doğalgaz)",
   "aidat": 900,
   "aciklama": "Bostanlı sahiline yürüme mesafesinde, 2. katta 130 m² 3+1 daire. Eşyasız olarak kiralanmaktadır.",
   "gorseller": [
    "img/p/bostanli-kiralik-3-1-1.jpg",
    "img/p/bostanli-kiralik-3-1-2.jpg"
   ],
   "ilanNo": "1005",
   "tarih": "6 Kasım 2026",
   "tapu": "Kat mülkiyetli",
   "kredi": false,
   "ozellikler": [],
   "danisman": "ayse",
   "lat": 38.45703,
   "lng": 27.09836
  },
  {
   "id": "carsi-dukkan",
   "baslik": "Karşıyaka Çarşı'da Kiracılı Satılık Dükkan",
   "tip": "Satılık",
   "kategori": "Dükkan",
   "il": "İzmir",
   "ilce": "Karşıyaka",
   "mahalle": "Tuzçullu",
   "fiyat": 8400000,
   "m2": 65,
   "kat": "Zemin kat",
   "yas": 20,
   "tapu": "Kat mülkiyeti",
   "aciklama": "Karşıyaka Çarşı'da yaya trafiği yoğun sokakta, vitrin cepheli 65 m² dükkan. Kiracılıdır, yatırıma uygundur.",
   "gorseller": [
    "img/p/carsi-dukkan-1.jpg"
   ],
   "lat": 38.4572,
   "lng": 27.1108,
   "ilanNo": "1006",
   "tarih": "6 Kasım 2026",
   "kredi": true,
   "aidat": 0,
   "banyo": 1,
   "isitma": "Kombi",
   "ozellikler": [],
   "danisman": "ayse"
  },
  {
   "id": "alaybey-1-1",
   "baslik": "Alaybey'de Yatırımlık Satılık 1+1 Daire",
   "tip": "Satılık",
   "kategori": "Daire",
   "il": "İzmir",
   "ilce": "Karşıyaka",
   "mahalle": "Alaybey",
   "fiyat": 4250000,
   "oda": "1+1",
   "m2": 60,
   "banyo": 1,
   "kat": "3. kat",
   "yas": 4,
   "isitma": "Kombi (doğalgaz)",
   "tapu": "Kat mülkiyeti",
   "kredi": true,
   "aciklama": "İzban ve metroya yürüme mesafesinde, 4 yıllık binada 60 m² 1+1 daire. Kira getirisi yüksektir. Krediye uygundur.",
   "gorseller": [
    "img/p/alaybey-1-1-1.jpg"
   ],
   "ilanNo": "1007",
   "tarih": "6 Kasım 2026",
   "aidat": 0,
   "ozellikler": [],
   "danisman": "ayse",
   "lat": 38.46063,
   "lng": 27.12146
  },
  {
   "id": "mavisehir-4-1",
   "baslik": "Mavişehir'de Havuzlu Sitede Satılık 4+1 Daire",
   "tip": "Satılık",
   "kategori": "Daire",
   "il": "İzmir",
   "ilce": "Karşıyaka",
   "mahalle": "Mavişehir",
   "fiyat": 14900000,
   "oda": "4+1",
   "m2": 185,
   "banyo": 2,
   "kat": "8. kat",
   "yas": 6,
   "isitma": "Merkezi",
   "tapu": "Kat mülkiyeti",
   "kredi": true,
   "aciklama": "Havuzlu ve sosyal tesisli sitede, 8. katta 185 m² 4+1 daire. Körfez manzaralı, iki banyolu ve kapalı otoparklıdır. Krediye uygundur.",
   "gorseller": [
    "img/p/mavisehir-4-1-1.jpg",
    "img/p/mavisehir-4-1-2.jpg",
    "img/p/mavisehir-4-1-3.jpg"
   ],
   "ilanNo": "1008",
   "tarih": "6 Kasım 2026",
   "aidat": 0,
   "ozellikler": [],
   "danisman": "ayse",
   "lat": 38.48222,
   "lng": 27.08298
  }
 ],
 "vitrin": [
  "bostanli-bostanli-da-deniz-manzarali-satilik-3-1-daire",
  "yali-yali-mahallesi-nde-bahceli-satilik-mustakil-ev",
  "mavisehir-mavisehir-de-site-icinde-esyali-kiralik-2-1-daire",
  "atakent-atakent-te-yeni-binada-satilik-3-1-daire"
 ],
 "ayinEvi": "",
 "istatistik": [
  [
   18,
   "Yıldır Karşıyaka'dayız"
  ],
  [
   520,
   "Tamamlanan satış ve kiralama"
  ],
  [
   3,
   "Danışman"
  ]
 ],
 "tarihce": [
  [
   2008,
   "Ofis Karşıyaka çarşısında iki kişiyle açıldı."
  ],
  [
   2016,
   "Bostanlı ve Mavişehir'deki yeni projeler portföye eklendi."
  ],
  [
   2026,
   "Bugün üç danışmanla çalışıyoruz."
  ]
 ]
};
  Object.assign(D.ofis, ayar.ofis);
  delete ayar.ofis;
  Object.assign(D, ayar);
  if (D.yazilar && D.danismanlar.length) D.yazilar.forEach((y) => { if (!D.danismanlar.some((d) => d.id === y.yazar)) y.yazar = D.danismanlar[0].id; });
  // Ana sitenin fotoğrafları iki klasör yukarıda durur
  const yol = (v) => typeof v === "string" && v.startsWith("img/") && !v.startsWith("img/p/") ? "../../" + v : v;
  const gez = (o) => { for (const k in o) { if (o[k] && typeof o[k] === "object") gez(o[k]); else o[k] = yol(o[k]); } };
  gez(D);
})();
