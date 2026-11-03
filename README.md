# Ihlamur Gayrimenkul demo sitesi

Emlak ofisleri için hazırlanmış statik bir tasarım demosu. Ofis ve ilanlar hayalidir.

## Yerelde açmak

```
cd ~/Developer/emlak-demo
python3 -m http.server 8791
```

Ardından tarayıcıda http://localhost:8791 adresini açın.

## Dosyalar

- `js/data.js` ofis bilgileri, ilanlar, danışmanlar, hizmetler ve blog yazıları. İçeriği değiştirmek için yalnızca bu dosyayı düzenlemek yeterli.
- `js/site.js` menü, alt bilgi, favoriler, animasyonlar ve ilan kartı şablonu.
- `js/map.js` OpenStreetMap haritası.
- `css/site.css` ana sayfa ve ortak stiller, `css/pages.css` iç sayfalar.
- `img/` büyük fotoğraflar, `img/sm/` kartlarda kullanılan küçük sürümler.
- `js/vendor/` Lenis (yumuşak kaydırma) ve Leaflet (harita), ikisi de MIT lisanslı.
- `fonts/` Schibsted Grotesk, SIL Open Font License.

Fotoğraflar Unsplash lisansıyla kullanılmıştır.

## Bir emlak ofisine özel demo hazırlamak

1. `ofisler/ornek-ofis.json` dosyasını kopyalayın, örneğin `ofisler/kaya-emlak.json`.
2. Ofisin adını, telefonunu, adresini, rengini ve tanıtım yazısını girin. `klasor` demo linkinin son kısmıdır.
3. İlanları ofisin sahibinden ya da kendi sitesindeki ilanlarından girin. `gorseller` alanına fotoğrafın linkini yazmak yeterli, araç indirir ve küçültür. `lat` ve `lng` yazılmazsa konum mahalle ve ilçeden bulunur.
4. Aracı çalıştırın:

```
python3 araclar/demo_olustur.py ofisler/kaya-emlak.json
```

5. http://localhost:8791/demo/kaya-emlak/ adresinden kontrol edin, sonra GitHub'a gönderin. Demo şu adreste yayına girer: https://simge-bit.github.io/emlak-demo/demo/kaya-emlak/

Zorunlu alanlar `ofis.ad`, `ofis.telefon` ve her ilan için `baslik`, `fiyat`, `oda`, `m2`, `il`, `ilce`, `mahalle`. Diğer alanlar boş bırakılırsa makul bir varsayılan kullanılır. Hizmetler ve blog yazıları verilmezse ana demodakiler kullanılır.

Demolar arama motorlarına kapalıdır (noindex). Ofisin adı başka bir sitede Google'da çıkmaz.
