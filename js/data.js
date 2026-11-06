// Demo verisi. Gerçek sürümde bu bilgiler yönetim panelinden gelecek.
window.DATA = {
  ofis: {
    ad: "Ihlamur Gayrimenkul",
    kisa: "Ihlamur",
    telefon: "0 212 000 00 00",
    eposta: "merhaba@ihlamur.example",
    adres: "Kuruçeşme Cad. No 00, Beşiktaş, İstanbul",
    lat: 41.0569, lng: 29.0335,
    kurulus: 2011,
    yetki: "3400000",
    site: "https://simge-bit.github.io/emlak-demo/",
    // WhatsApp numarası ülke koduyla, boşluksuz (örneğin 905320000000). Boş kalırsa kişi seçtirir.
    whatsapp: "",
    // Butonlar, harita işaretleri ve WhatsApp düğmesi bu renkte olur
    renk: "#111111",
    tanitim: "Ihlamur Gayrimenkul 2011'de İstanbul'da kuruldu. Bugün beş danışmanımızla İstanbul, Urla ve Bodrum'da çalışıyoruz. Her evi ilana koymadan önce kendimiz geziyor ve fotoğraflıyoruz.",
    hakkinda: "Elif Aksoy ve Orhan Tekin, Ihlamur Gayrimenkul'ü 2011'de İstanbul'da kurdu. Ofis ilk yıllarında yalnızca Boğaziçi'ndeki evlerle ilgilendi. Bugün İstanbul, Urla ve Bodrum'da beş danışmanla çalışıyor."
  },

  // Ana sayfa ve hakkımızda sayfasındaki büyük rakamlar
  istatistik: [[15, "Yıldır bu işi yapıyoruz"], [340, "Tamamlanan satış ve kiralama"], [3, "Şehirde ofisimiz var"]],

  tarihce: [
    [2011, "Ofis Beşiktaş'ta iki kişiyle açıldı. İlk yıllarda Boğaziçi'ndeki müstakil evlerle ilgilendi."],
    [2015, "Anadolu yakasında çalışmaya başladık ve Kadıköy ile Üsküdar'daki evleri portföye ekledik."],
    [2018, "Urla ofisi açıldı. Bu ofis bağ evleri ve Çeşme yarımadasındaki yazlıklarla ilgileniyor."],
    [2022, "Bodrum ofisi Yalıkavak'ta açıldı ve yabancı alıcılarla çalışmaya başladı."],
    [2026, "Bugün üç şehirde beş danışmanla çalışıyoruz."]
  ],

  // Açılış slaytında gösterilecek ilanlar ve "Ayın evi". Boş kalırsa ilk ilanlar kullanılır.
  vitrin: ["zekeriyakoy-orman-evi", "yalikavak-villa", "urla-bag-evi", "tarabya-ahsap-cephe"],
  ayinEvi: "yalikavak-villa",

  danismanlar: [
    { id: "elif", ad: "Elif Aksoy", unvan: "Kurucu ortak", bolge: "Boğaziçi ve Sarıyer", foto: "img/kisi-elif.jpg", tel: "0 212 000 00 01",
      bio: "Elif Aksoy mimarlık eğitiminden sonra 2011'de ofisi kurdu. Boğaziçi ve Sarıyer'deki müstakil evlerle ilgileniyor. Bir evi değerlendirirken önce ışığa ve plana bakar." },
    { id: "orhan", ad: "Orhan Tekin", unvan: "Kurucu ortak", bolge: "Beşiktaş ve Nişantaşı", foto: "img/kisi-orhan.jpg", tel: "0 212 000 00 02",
      bio: "Orhan Tekin yirmi yılı aşkın süredir İstanbul'da konut satışı yapıyor. Beşiktaş ve Nişantaşı'ndaki eski apartman dairelerini iyi tanır. Ofisin sözleşme ve tapu süreçlerini o yürütür." },
    { id: "can", ad: "Can Demirel", unvan: "Danışman", bolge: "Kadıköy ve Üsküdar", foto: "img/kisi-can.jpg", tel: "0 216 000 00 03",
      bio: "Can Demirel Anadolu yakasında doğup büyüdü. Moda, Kuzguncuk ve Çengelköy'deki satılık ve kiralık evlerle ilgileniyor. Kiracı ve ev sahibi arasındaki süreci baştan sona takip eder." },
    { id: "defne", ad: "Defne Yılmaz", unvan: "Danışman", bolge: "Urla ve Çeşme", foto: "img/kisi-defne.jpg", tel: "0 232 000 00 04",
      bio: "Defne Yılmaz İzmir ofisini yönetiyor. Urla bağ evleri ve Alaçatı'daki yazlıklar onun bölgesidir. Daha önce peyzaj mimarı olarak çalıştı." },
    { id: "mert", ad: "Mert Kaya", unvan: "Danışman", bolge: "Bodrum", foto: "img/kisi-mert.jpg", tel: "0 252 000 00 05",
      bio: "Mert Kaya Bodrum yarımadasındaki villa ve arsalarla ilgileniyor. Yalıkavak ve Göltürkbükü'nde yaşayan yabancı alıcılarla İngilizce çalışır." }
  ],

  ilanlar: [
    { id: "zekeriyakoy-orman-evi", ilanNo: "1042", tarih: "21 Ekim 2026", tapu: "Kat mülkiyetli", kredi: true, aidat: 0, baslik: "Orman kenarında müstakil ev", tip: "Satılık", kategori: "Müstakil ev",
      il: "İstanbul", ilce: "Sarıyer", mahalle: "Zekeriyaköy", fiyat: 74500000, oda: "5+1", m2: 420, arsa: 1100, banyo: 4, kat: "3 katlı", yas: 6, isitma: "Yerden ısıtma",
      lat: 41.1985, lng: 29.0322, danisman: "elif",
      gorseller: ["img/ev-zekeriyakoy.jpg", "img/ic-ahsap-salon.jpg", "img/ic-beyaz-yatak.jpg", "img/ic-cam-merdiven.jpg"],
      aciklama: "Ev Zekeriyaköy'ün kuzeyinde, orman sınırına bakan bir parselde duruyor. Zemin kattaki salon bahçeye doğru tamamen camla açılıyor. Üst katta her birinin kendi banyosu olan dört yatak odası var. Ev 2020'de bir mimarlık ofisinin projesiyle inşa edildi.",
      ozellikler: ["Bahçe", "Kapalı otopark", "Şömine", "Yerden ısıtma", "Akıllı ev sistemi", "Depo"] },

    { id: "kuzguncuk-ahsap-ev", ilanNo: "1038", tarih: "12 Ekim 2026", tapu: "Müstakil tapulu", kredi: true, aidat: 0, baslik: "Restore edilmiş ahşap ev", tip: "Satılık", kategori: "Müstakil ev",
      il: "İstanbul", ilce: "Üsküdar", mahalle: "Kuzguncuk", fiyat: 38900000, oda: "4+1", m2: 210, arsa: 160, banyo: 2, kat: "3 katlı", yas: 95, isitma: "Kombi",
      lat: 41.0352, lng: 29.0318, danisman: "can",
      gorseller: ["img/ev-ahsap.jpg", "img/ic-bitkili-salon.jpg", "img/ic-mutfak.jpg", "img/ic-genis-salon.jpg"],
      aciklama: "Ev 1930'larda yapıldı ve 2019'da aslına uygun olarak restore edildi. Ahşap cephe ve iç merdiven korunurken tesisat tamamen yenilendi. Arka bahçede eski bir dut ağacı var. İskeleye yürüyerek beş dakikada ulaşılıyor.",
      ozellikler: ["Bahçe", "Tarihi yapı", "Boğaz'a yakın", "Yenilenmiş tesisat"] },

    { id: "moda-isikli-daire", ilanNo: "1045", tarih: "27 Ekim 2026", tapu: "Kat mülkiyetli", kredi: true, aidat: 2400, baslik: "Moda'da ışıklı daire", tip: "Satılık", kategori: "Daire",
      il: "İstanbul", ilce: "Kadıköy", mahalle: "Moda", fiyat: 18750000, oda: "3+1", m2: 135, banyo: 2, kat: "4. kat", yas: 40, isitma: "Kombi",
      lat: 40.9822, lng: 29.0262, danisman: "can",
      gorseller: ["img/ic-moda-salon.jpg", "img/ic-beyaz-mutfak.jpg", "img/ic-sari-koltuk.jpg"],
      aciklama: "Daire Moda Caddesi'ne iki sokak mesafedeki bir apartmanın dördüncü katında. Salon ve mutfak güneye bakıyor ve gün boyu ışık alıyor. Ahşap zeminler yeni cilalandı. Binada asansör var.",
      ozellikler: ["Asansör", "Balkon", "Ahşap zemin", "Denize yürüme mesafesi"] },

    { id: "bebek-kiralik-daire", ilanNo: "1047", tarih: "30 Ekim 2026", tapu: "Kat mülkiyetli", kredi: false, aidat: 3800, baslik: "Bebek'te eşyalı daire", tip: "Kiralık", kategori: "Daire",
      il: "İstanbul", ilce: "Beşiktaş", mahalle: "Bebek", fiyat: 95000, oda: "2+1", m2: 110, banyo: 1, kat: "2. kat", yas: 25, isitma: "Merkezi",
      lat: 41.0771, lng: 29.0436, danisman: "orhan",
      gorseller: ["img/ic-bebek-salon.jpg", "img/ic-yemek.jpg", "img/ic-gri-salon.jpg"],
      aciklama: "Daire Bebek parkının arkasındaki sakin bir sokakta. Eşyalı olarak kiralanıyor ve hemen taşınmaya hazır. Kira sözleşmesi en az bir yıllık yapılıyor. Aidat kiraya dahil değildir.",
      ozellikler: ["Eşyalı", "Asansör", "Kapıcı", "Merkezi ısıtma"] },

    { id: "yalikavak-villa", ilanNo: "1031", tarih: "2 Ekim 2026", tapu: "Müstakil tapulu", kredi: true, aidat: 0, baslik: "Deniz manzaralı villa", tip: "Satılık", kategori: "Villa",
      il: "Muğla", ilce: "Bodrum", mahalle: "Yalıkavak", fiyat: 96000000, oda: "5+2", m2: 480, arsa: 1450, banyo: 5, kat: "2 katlı", yas: 3, isitma: "Isı pompası",
      lat: 37.1061, lng: 27.2935, danisman: "mert",
      gorseller: ["img/ev-havuzlu-villa.jpg", "img/ev-beyaz-villa.jpg", "img/ic-cam-merdiven.jpg", "img/ic-genis-salon.jpg"],
      aciklama: "Villa Yalıkavak marinasına bakan bir yamaçta. Sonsuzluk havuzu ve teras batıya baktığı için gün batımı evin her yerinden görülüyor. Bodrum taşıyla kaplı alt katta misafir dairesi var. Ev tapulu ve iskanlıdır.",
      ozellikler: ["Havuz", "Deniz manzarası", "Misafir dairesi", "Isı pompası", "Güneş paneli"] },

    { id: "urla-bag-evi", ilanNo: "1036", tarih: "9 Ekim 2026", tapu: "Müstakil tapulu", kredi: true, aidat: 0, baslik: "Bağ içinde modern ev", tip: "Satılık", kategori: "Müstakil ev",
      il: "İzmir", ilce: "Urla", mahalle: "Zeytinalanı", fiyat: 27500000, oda: "3+1", m2: 190, arsa: 2400, banyo: 2, kat: "Tek katlı", yas: 4, isitma: "Yerden ısıtma",
      lat: 38.3225, lng: 26.7395, danisman: "defne",
      gorseller: ["img/ev-urla.jpg", "img/ic-urla-salon.jpg", "img/ic-genis-salon.jpg"],
      aciklama: "Ev Urla'nın bağ yolunda, zeytin ve üzüm bahçeleri arasında duruyor. Tek katlı plan sayesinde her oda bahçeye açılıyor. Cephede yerel ahşap ve siyah metal kullanıldı. Arsada kırk yaşında zeytin ağaçları var.",
      ozellikler: ["Bahçe", "Zeytinlik", "Tek katlı", "Yerden ısıtma", "Otopark"] },

    { id: "alacati-yazlik", ilanNo: "1044", tarih: "24 Ekim 2026", tapu: "Müstakil tapulu", kredi: false, aidat: 0, baslik: "Alaçatı'da yazlık", tip: "Kiralık", kategori: "Villa",
      il: "İzmir", ilce: "Çeşme", mahalle: "Alaçatı", fiyat: 240000, oda: "4+1", m2: 230, arsa: 600, banyo: 3, kat: "2 katlı", yas: 5, isitma: "Klima",
      lat: 38.2816, lng: 26.3748, danisman: "defne",
      gorseller: ["img/ev-beyaz-villa.jpg", "img/ic-sari-koltuk.jpg", "img/ic-yemek.jpg"],
      aciklama: "Villa Alaçatı çarşısına on dakika yürüme mesafesinde. Haziran ile eylül arasında aylık olarak kiralanıyor. Havuzun çevresi rüzgardan korunacak şekilde duvarla çevrili. Fiyata temizlik hizmeti dahildir.",
      ozellikler: ["Havuz", "Eşyalı", "Temizlik dahil", "Klima"] },

    { id: "catili-ev-omerli", ilanNo: "1040", tarih: "18 Ekim 2026", tapu: "Kat mülkiyetli", kredi: true, aidat: 4500, baslik: "Göl kenarında yeni ev", tip: "Satılık", kategori: "Müstakil ev",
      il: "İstanbul", ilce: "Çekmeköy", mahalle: "Ömerli", fiyat: 31200000, oda: "4+1", m2: 260, arsa: 700, banyo: 3, kat: "2 katlı", yas: 1, isitma: "Isı pompası",
      lat: 41.0731, lng: 29.3412, danisman: "can",
      gorseller: ["img/ev-catili.jpg", "img/ic-gri-salon.jpg", "img/ic-mutfak.jpg"],
      aciklama: "Ev Ömerli barajına yakın, sekiz evden oluşan küçük bir sitede. Çatı katı tek parça bir çalışma odası olarak tasarlandı. Isı pompası ve güneş panelleri sayesinde enerji gideri düşüktür. İlk sahibine satılıyor.",
      ozellikler: ["Bahçe", "Site içinde", "Isı pompası", "Çalışma odası", "Sıfır bina"] },

    { id: "tarabya-ahsap-cephe", ilanNo: "1046", tarih: "29 Ekim 2026", tapu: "Kat irtifaklı", kredi: false, aidat: 1500, baslik: "Ahşap cepheli ikiz ev", tip: "Kiralık", kategori: "Müstakil ev",
      il: "İstanbul", ilce: "Sarıyer", mahalle: "Tarabya", fiyat: 185000, oda: "4+1", m2: 240, arsa: 300, banyo: 3, kat: "3 katlı", yas: 8, isitma: "Yerden ısıtma",
      lat: 41.1384, lng: 29.0549, danisman: "elif",
      gorseller: ["img/ev-koyu-ahsap.jpg", "img/ic-ahsap-salon.jpg", "img/ic-beyaz-yatak.jpg"],
      aciklama: "Ev Tarabya koyunun üst tarafındaki sessiz bir sokakta. Cephesi ısıl işlem görmüş koyu ahşapla kaplı. Uzun dönem kiracı aranıyor ve evcil hayvan kabul ediliyor. Ev eşyasız olarak kiralanıyor.",
      ozellikler: ["Bahçe", "Evcil hayvan kabul", "Otopark", "Yerden ısıtma"] }
  ],

  hizmetler: [
    { baslik: "Satış", gorsel: "img/ev-beyaz-ahsap.jpg", metin: "Evinizin satış sürecini ilk görüşmeden tapu devrine kadar yürütüyoruz. Satış fiyatını bölgedeki güncel satışlara göre birlikte belirliyoruz." },
    { baslik: "Kiralama", gorsel: "img/ic-bebek-salon.jpg", metin: "Kiracı adaylarıyla görüşmeleri, kira sözleşmesini ve evin teslimini yürütüyoruz." },
    { baslik: "Değerleme", gorsel: "img/ev-modern-villa.jpg", metin: "Evinizin bugünkü değerini, evin durumuna ve bölgedeki benzer satışlara bakarak belirliyoruz." },
    { baslik: "Alım danışmanlığı", gorsel: "img/ev-modern-havuz.jpg", metin: "Bütçenize ve ihtiyacınıza uygun evleri bulup gösteriyor, alım sürecini tapu devrine kadar takip ediyoruz." }
  ],

  ofisler: [
    { sehir: "İstanbul", adres: "Kuruçeşme Cad. No 00, Beşiktaş", tel: "0 212 000 00 00", lat: 41.0569, lng: 29.0335 },
    { sehir: "Urla", adres: "İskele Mah. No 00, Urla, İzmir", tel: "0 232 000 00 00", lat: 38.3602, lng: 26.7716 },
    { sehir: "Bodrum", adres: "Yalıkavak Marina yolu No 00, Bodrum", tel: "0 252 000 00 00", lat: 37.1035, lng: 27.2905 }
  ],

  yazilar: [
    { id: "kira-sozlesmesi", baslik: "Kira sözleşmesi yaparken nelere dikkat etmelisiniz?", tarih: "28 Ekim 2026", gorsel: "img/ic-gri-salon.jpg", yazar: "orhan",
      ozet: "Kira sözleşmesi ev sahibi ile kiracı arasındaki en önemli belgedir. İmzalamadan önce birkaç maddeyi mutlaka kontrol etmenizi öneriyoruz.",
      icerik: [
        "Kira sözleşmesi ev sahibi ile kiracı arasındaki ilişkinin temelidir. Sözleşmede kira bedeli, ödeme günü, depozito tutarı ve sözleşmenin süresi açıkça yazmalıdır. Bu bilgilerden biri eksikse ileride anlaşmazlık çıkması kolaylaşır.",
        "Evin teslim edildiği andaki durumunu bir tutanakla kayıt altına almanızı öneriyoruz. Duvarlardaki çatlakları, beyaz eşyaların durumunu ve sayaç değerlerini fotoğraflarla birlikte tutanağa ekleyin. Bu tutanak taşınırken depozitonun iadesinde iki taraf için de güvence olur.",
        "Aidat, demirbaş ve büyük onarım giderlerinin kime ait olduğu da sözleşmede yazmalıdır. Genel kural olarak olağan kullanım giderleri kiracıya, binanın kendisiyle ilgili büyük giderler ise ev sahibine aittir. Yine de bunu sözleşmede açıkça belirtmek en sağlıklı yoldur."
      ] },
    { id: "ahsap-ev", baslik: "Eski bir ahşap evi almadan önce nelere bakmalısınız?", tarih: "14 Ekim 2026", gorsel: "img/ev-ahsap.jpg", yazar: "can",
      ozet: "Ahşap evler İstanbul'un en güzel yapıları arasındadır. Ancak satın almadan önce yapının durumunu dikkatle incelemek gerekir.",
      icerik: [
        "İstanbul'daki eski ahşap evlerin çoğu tescilli yapıdır. Tescilli bir evde yapılacak her onarım için koruma kurulundan izin almak gerekir. Bu yüzden satın almadan önce evin tescil durumunu ve varsa onaylı rölövesini öğrenmelisiniz.",
        "Ahşap yapılarda en sık görülen sorunlar nem, böcek ve çürümedir. Özellikle zemin kat kirişleri ile çatı arasını bir uzmana kontrol ettirmenizi öneriyoruz. Restorasyon görmüş bir evde hangi işlerin yapıldığını gösteren belgeleri satıcıdan isteyin.",
        "Bu evlerin bakım maliyeti betonarme bir daireden yüksektir. Buna karşılık doğru restore edilmiş bir ahşap ev değerini uzun yıllar korur. Kuzguncuk, Çengelköy ve Arnavutköy gibi semtlerde bu tür evlere talep her zaman yüksek olmuştur."
      ] },
    { id: "urla-imar", baslik: "Urla'da bağ evi alırken imar durumunu öğrenmek", tarih: "2 Ekim 2026", gorsel: "img/ev-urla.jpg", yazar: "defne",
      ozet: "Urla'da arazi ve bağ evi alırken en önemli konu imar durumudur. Bu yazıda nereden ve nasıl bilgi alabileceğinizi anlatıyoruz.",
      icerik: [
        "Urla'daki arazilerin büyük kısmı tarım arazisi ya da zeytinlik olarak kayıtlıdır. Bu arazilere yapılabilecek yapının büyüklüğü sınırlıdır. Bir bağ evi almadan önce arsanın imar durumunu belediyeden yazılı olarak almanızı öneriyoruz.",
        "Zeytinlik alanlarda yapılaşmaya ilişkin özel kurallar vardır. Bu kurallar yüzünden bazı arsalarda ev yapmak hiç mümkün olmayabilir. Arsadaki mevcut evin iskanı olup olmadığını da tapu kaydından kontrol etmelisiniz.",
        "Ofisimiz ilana koyduğu her arsa ve ev için imar durumunu önceden araştırır. Bu bilgiyi ilan sayfasında ya da görüşme sırasında sizinle paylaşırız."
      ] }
  ]
};

window.fmtKisa = function (ilan) {
  const f = ilan.fiyat;
  const s = f >= 1e6 ? (f / 1e6).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " M" : Math.round(f / 1e3) + " B";
  return s + " TL" + (ilan.tip === "Kiralık" ? "/ay" : "");
};
window.odaSayisi = function (oda) { return parseInt(oda, 10); };

window.fmtFiyat = function (ilan) {
  const s = new Intl.NumberFormat("tr-TR").format(ilan.fiyat) + " TL";
  return ilan.tip === "Kiralık" ? s + " / ay" : s;
};
