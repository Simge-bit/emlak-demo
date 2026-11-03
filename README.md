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
