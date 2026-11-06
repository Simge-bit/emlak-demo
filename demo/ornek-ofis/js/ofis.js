// Körfez Emlak için üretilmiş ofis ayarı. Bu dosyayı elle değil, araclar/demo_olustur.py ile üretin.
(function () {
  const D = window.DATA, ayar = {
 "ofis": {
  "ad": "Körfez Emlak",
  "kisa": "Körfez",
  "telefon": "0 232 000 00 10",
  "whatsapp": "",
  "eposta": "bilgi@korfez.example",
  "adres": "Atatürk Cad. No 00, Karşıyaka, İzmir",
  "yetki": "3500000",
  "renk": "#1F3A5F",
  "tanitim": "Körfez Emlak 2008'den beri Karşıyaka ve Bostanlı'da ev alıp satanlara yardımcı oluyor. Mahalleyi iyi tanıyan üç danışmanla çalışıyoruz.",
  "hakkinda": "Körfez Emlak 2008'de Karşıyaka'da kuruldu. Ofis bugün Karşıyaka, Bostanlı ve Mavişehir'deki daireler ile müstakil evlerle ilgileniyor.",
  "demoNot": "Bu sayfa aracın nasıl çalıştığını göstermek için hazırlanmış hayali bir örnektir.",
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
   "bio": "Ayşe Demir ofisi 2008'de kurdu. Karşıyaka'daki eski apartmanları ve kentsel dönüşüm projelerini yakından takip ediyor.",
   "tel": "0 232 000 00 10"
  },
  {
   "id": "mert",
   "ad": "Mert Arslan",
   "unvan": "Danışman",
   "bolge": "Bostanlı",
   "foto": "img/p/kisi-mert.jpg",
   "bio": "Mert Arslan Bostanlı ve Mavişehir'deki kiralık dairelerle ilgileniyor.",
   "tel": "0 232 000 00 10"
  }
 ],
 "ilanlar": [
  {
   "baslik": "Deniz manzaralı 3+1 daire",
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
   "aciklama": "Daire Bostanlı sahiline iki dakika yürüme mesafesinde. Salon ve balkon körfeze bakıyor.",
   "ozellikler": [
    "Deniz manzarası",
    "Asansör",
    "Otopark"
   ],
   "gorseller": [
    "img/p/bostanli-deniz-manzarali-3-1-daire-1.jpg",
    "img/p/bostanli-deniz-manzarali-3-1-daire-2.jpg",
    "img/p/bostanli-deniz-manzarali-3-1-daire-3.jpg"
   ],
   "id": "bostanli-deniz-manzarali-3-1-daire",
   "ilanNo": "1001",
   "tarih": "6 Kasım 2026",
   "tapu": "Kat mülkiyetli",
   "kredi": true,
   "isitma": "Kombi",
   "lat": 38.45703,
   "lng": 27.09836
  },
  {
   "baslik": "Bahçeli müstakil ev",
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
   "aciklama": "Ev Karşıyaka Yalı mahallesinde, ağaçlı bir sokakta. Arka bahçede limon ve mandalina ağaçları var.",
   "ozellikler": [
    "Bahçe",
    "Şömine"
   ],
   "gorseller": [
    "img/p/yali-bahceli-mustakil-ev-1.jpg",
    "img/p/yali-bahceli-mustakil-ev-2.jpg"
   ],
   "id": "yali-bahceli-mustakil-ev",
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
   "baslik": "Eşyalı 2+1 daire",
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
   "aciklama": "Daire site içinde, havuzlu bir bahçeye bakıyor. Eşyalı olarak kiralanıyor.",
   "ozellikler": [
    "Eşyalı",
    "Site içinde",
    "Havuz"
   ],
   "gorseller": [
    "img/p/mavisehir-esyali-2-1-daire-1.jpg",
    "img/p/mavisehir-esyali-2-1-daire-2.jpg"
   ],
   "id": "mavisehir-esyali-2-1-daire",
   "ilanNo": "1003",
   "tarih": "6 Kasım 2026",
   "tapu": "Kat mülkiyetli",
   "kredi": false,
   "isitma": "Kombi",
   "lat": 38.48222,
   "lng": 27.08298
  },
  {
   "baslik": "Yeni binada 3+1 daire",
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
   "aciklama": "Daire kentsel dönüşümle yeniden yapılan bir binada. Yerden ısıtma ve kapalı otopark var.",
   "ozellikler": [
    "Sıfır bina",
    "Kapalı otopark",
    "Yerden ısıtma"
   ],
   "gorseller": [
    "img/p/atakent-yeni-binada-3-1-daire-1.jpg",
    "img/p/atakent-yeni-binada-3-1-daire-2.jpg",
    "img/p/atakent-yeni-binada-3-1-daire-3.jpg"
   ],
   "id": "atakent-yeni-binada-3-1-daire",
   "ilanNo": "1004",
   "tarih": "6 Kasım 2026",
   "tapu": "Kat mülkiyetli",
   "kredi": true,
   "aidat": 0,
   "isitma": "Kombi",
   "lat": 38.46635,
   "lng": 27.08803
  }
 ],
 "vitrin": [
  "bostanli-deniz-manzarali-3-1-daire",
  "yali-bahceli-mustakil-ev",
  "mavisehir-esyali-2-1-daire",
  "atakent-yeni-binada-3-1-daire"
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
