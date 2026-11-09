// Klasik emlak ofisi şablonu. Statik örneklerde veriyi js/data.js ve js/ofis.js'ten alır.
// Konutra panelinde window.DATA sunucudan gelir, adresler D.routes'tan okunur ve formlar panele kaydedilir.
// Bu dosya emlak-demo/js ve emlak-panel/public/js içinde aynı tutulur.
(function () {
  const D = window.DATA, O = D.ofis, $ = (s, k = document) => k.querySelector(s);
  const sayfa = document.body.dataset.sayfa;
  const R = D.routes || null;
  const U = R
    ? { ana: R.home, ilanlar: R.ilanlar, iletisim: R.iletisim, kvkk: R.kvkk, blog: R.blog, ilan: (id) => R.ilan.replace("{id}", encodeURIComponent(id)) }
    : { ana: "index.html", ilanlar: "ilanlar.html", iletisim: "iletisim.html", kvkk: null, blog: null, ilan: (id) => "ilan.html?id=" + encodeURIComponent(id) };
  const ilanlar = D.ilanlar || [];
  const merkez = (D.ofisler || [])[0] || {};
  document.documentElement.style.setProperty("--ana", O.renk || "#1F2D5C");
  // Statik önizlemelerde ziyaretleri Konutra sayacına yaz (panel sitelerinde çalışmaz).
  if (!R && (location.hostname === "onizleme.konutra.com.tr" || location.hostname.endsWith("github.io"))) {
    const gc = document.createElement("script");
    gc.async = true; gc.src = "//gc.zgo.at/count.js";
    gc.dataset.goatcounter = "https://konutra.goatcounter.com/count";
    document.head.appendChild(gc);
  }

  const tl = (n) => Math.round(n).toLocaleString("tr-TR") + " TL";
  const fiyat = (x) => tl(x.fiyat) + (x.tip === "Kiralık" ? " / ay" : "");
  const yer = (x) => [x.mahalle, x.ilce].filter(Boolean).join(", ");
  const tel = (t) => "tel:" + String(t || "").replace(/\D/g, "").replace(/^0?/, "0");
  const wa = (m) => `https://wa.me/${O.whatsapp}?text=${encodeURIComponent(m)}`;
  // Bulunma eki: Gaziosmanpaşa'da, Şişli'de, Kadıköy'de, Ataşehir'de, Bakırköy'de, Esenyurt'ta
  const de = (ad) => {
    const kucuk = ad.toLocaleLowerCase("tr"), unlu = (kucuk.match(/[aeıioöuü]/g) || []).pop() || "e";
    return `${ad}'${/[fstkçşhp]$/.test(kucuk) ? "t" : "d"}${"aıou".includes(unlu) ? "a" : "e"}`;
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const waIkon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>`;
  // Kurumsal hizmet metinleri. Ofis kendi metnini verirse onlar kullanılır.
  const HIZMETLER = O.hizmetler || (R && (D.hizmetler || []).length ? D.hizmetler : null) || [
    { baslik: "Satış danışmanlığı", metin: "Gayrimenkulünüzün piyasa değerinin belirlenmesi, pazarlanması ve tapu devrine kadar satış sürecinin yürütülmesi." },
    { baslik: "Kiralama", metin: "Kiracı adaylarının değerlendirilmesi, kira sözleşmesinin hazırlanması ve teslim sürecinin takibi." },
    { baslik: "Değerleme", metin: "Bölgedeki emsal satışlar esas alınarak gayrimenkulünüzün güncel piyasa değerinin belirlenmesi." },
    { baslik: "Alım danışmanlığı", metin: "İhtiyacınıza ve bütçenize uygun portföyün sunulması, kredi ve tapu süreçlerinde destek." }
  ];
  const marka = O.logo ? `<img src="${O.logo}" alt="${esc(O.ad)}">` : `<span>${esc(O.ad)}<small>Gayrimenkul danışmanlığı</small></span>`;

  // Üst bilgi, menü ve alt bilgi
  const menuler = [[U.ana, "Ana sayfa", "ana"], [U.ilanlar, "İlanlar", "ilanlar"], [U.ana + "#hakkimizda", "Hakkımızda", "hak"],
    ...(U.blog && (D.yazilar || []).length ? [[U.blog, "Blog", "blog"]] : []), [U.iletisim, "İletişim", "iletisim"]];
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="ust"><div class="kap"><div><span class="adr">${esc(O.adres)}</span></div><div>${O.telefon ? `<span><a href="${tel(O.telefon)}">${esc(O.telefon)}</a></span>` : ""}${O.eposta ? `<span>${esc(O.eposta)}</span>` : ""}</div></div></div>
    <header class="menu" id="menu"><div class="kap">
      <a class="marka" href="${U.ana}">${marka}</a>
      <nav>${menuler.map(([h, a, k]) => `<a href="${h}"${k === sayfa ? ' class="on"' : ""}>${a}</a>`).join("")}</nav>
      ${O.telefon ? `<a class="tel" href="${tel(O.telefon)}">${esc(O.telefon)}</a>` : "<span></span>"}
      <button class="mbtn" type="button" aria-label="Menü">Menü</button>
    </div></header>`);
  $(".mbtn").addEventListener("click", () => $("#menu").classList.toggle("acik"));

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="alt"><div class="kap">
      <div class="sut">
        <div><div class="marka">${esc(O.ad)}</div><p style="margin:12px 0 0;max-width:40ch">${esc(O.aciklama || "")}</p></div>
        <div><h3>Sayfalar</h3>${menuler.map(([h, a]) => `<a href="${h}">${a}</a>`).join("")}</div>
        <div><h3>İletişim</h3><div>${esc(O.adres)}</div>${O.telefon ? `<a href="${tel(O.telefon)}">${esc(O.telefon)}</a>` : ""}${O.whatsapp ? `<a href="${wa("Merhaba, ilanlarınız hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">WhatsApp</a>` : ""}${O.instagram ? `<a href="${esc(O.instagram)}" target="_blank" rel="noopener">Instagram</a>` : ""}${U.kvkk ? `<a href="${U.kvkk}">KVKK aydınlatma metni</a>` : ""}</div>
      </div>
      <div class="dip"><span>© ${new Date().getFullYear()} ${esc(O.ad)}${O.yetki ? `. Yetki belgesi no ${esc(O.yetki)}` : ""}</span><span>${esc(O.demoNot || "")}</span></div>
    </div></footer>
    ${O.whatsapp ? `<a class="wa-yuzen" href="${wa("Merhaba, ilanlarınız hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${waIkon}</a>` : ""}`);

  const kart = (x) => `
    <a class="kart" href="${U.ilan(x.id)}">
      <div class="gor"><img src="${x.gorseller[0]}" alt="${esc(x.baslik)}" loading="lazy"><span class="rozet${x.tip === "Kiralık" ? " kira" : ""}">${x.tip}</span></div>
      <div class="ic"><div class="fiyat">${fiyat(x)}</div><h3>${esc(x.baslik)}</h3><div class="yer">${esc(yer(x))}</div>
        <div class="oz">${x.oda ? `<span><b>${x.oda}</b> oda</span>` : `<span><b>${x.kategori}</b></span>`}${x.m2 ? `<span><b>${x.m2}</b> m²</span>` : ""}${x.kat ? `<span>${esc(x.kat)}</span>` : ""}</div></div>
    </a>`;

  const harita = (el, noktalar, zoom) => {
    if (!window.L || !el || !noktalar.length) { if (el) el.remove(); return; }
    const m = L.map(el, { scrollWheelZoom: false }).setView(noktalar[0], zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(m);
    noktalar.forEach((p) => L.circleMarker(p, { radius: 9, color: "#fff", weight: 2, fillColor: getComputedStyle(document.documentElement).getPropertyValue("--ana"), fillOpacity: 1 }).addTo(m));
  };
  // Formlar: panelde talep olarak kaydedilir, statik örnekte WhatsApp mesajı açılır
  const onay = R ? `<label class="onay tam"><input type="checkbox" name="kvkk" value="1" required> <span><a href="${U.kvkk}" target="_blank">Aydınlatma metnini</a> okudum ve kabul ediyorum.</span></label><input class="tuzak" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">` : "";
  const gonder = async (form, veri, waMesaj) => {
    if (!R || !R.talep) { window.open(wa(waMesaj), "_blank", "noopener"); return; }
    const btn = form.querySelector("button[type=submit]"), eski = btn.textContent;
    btn.disabled = true; btn.textContent = "Gönderiliyor";
    form.querySelector(".hata")?.remove();
    try {
      const r = await fetch(R.talep, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.content || "" },
        body: JSON.stringify({ ...veri, kvkk: form.kvkk?.checked ? 1 : 0, website: form.website?.value || "" }) });
      if (r.ok) { form.innerHTML = `<div class="tamam tam"><b>Talebiniz alındı.</b> En kısa sürede sizinle iletişime geçilecektir.</div>`; return; }
      const j = await r.json().catch(() => ({}));
      const msj = r.status === 429 ? "Kısa sürede çok fazla gönderim yapıldı. Lütfen biraz sonra tekrar deneyin." : Object.values(j.errors || {}).flat()[0] || "Talep gönderilemedi. Lütfen telefonla ulaşın.";
      btn.insertAdjacentHTML("beforebegin", `<div class="hata tam">${esc(msj)}</div>`);
    } catch (_) {
      btn.insertAdjacentHTML("beforebegin", `<div class="hata tam">Bağlantı kurulamadı. Lütfen tekrar deneyin.</div>`);
    }
    btn.disabled = false; btn.textContent = eski;
  };

  const ofisNokta = merkez.lat ? [[merkez.lat, merkez.lng]] : [];
  const iletisimKutusu = () => `
    <div class="bilgi"><dl>
      <dt>Adres</dt><dd>${esc(O.adres)}</dd>
      ${O.telefon ? `<dt>Telefon</dt><dd><a href="${tel(O.telefon)}">${esc(O.telefon)}</a></dd>` : ""}
      ${O.eposta ? `<dt>E-posta</dt><dd>${esc(O.eposta)}</dd>` : ""}
      <dt>Çalışma saatleri</dt><dd>${esc(O.saatler || "Pazartesi - Cumartesi, 09.00 - 19.00")}</dd>
    </dl><div class="btns">${O.telefon ? `<a class="btn" href="${tel(O.telefon)}">Arayın</a>` : ""}${O.whatsapp ? `<a class="btn wa" href="${wa("Merhaba, bilgi almak istiyorum.")}" target="_blank" rel="noopener">WhatsApp</a>` : ""}</div></div>`;

  // Ana sayfa
  if (sayfa === "ana") {
    const vitrin = (D.vitrin || []).map((id) => ilanlar.find((x) => x.id === id)).filter(Boolean);
    const sirali = [...vitrin, ...ilanlar.filter((x) => !vitrin.includes(x))];
    const kapak = O.kapak || (sirali[0] || {}).gorseller?.[0] || "";
    const mahalleler = [...new Set(ilanlar.map((x) => x.mahalle).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr"));
    const odalar = [...new Set(ilanlar.map((x) => x.oda).filter(Boolean))].sort();
    const bolge = merkez.sehir || O.adres.split(",").slice(-2, -1)[0]?.trim() || "";
    $("#giris").style.backgroundImage = `url("${kapak}")`;
    $("#giris").innerHTML = `<div class="kap">
      <h1>${esc(de(bolge))} satılık ve kiralık gayrimenkul</h1>
      <p>Konut, işyeri ve arsa alım satım ve kiralama süreçlerinde profesyonel danışmanlık.</p>
      <form class="ara" action="${U.ilanlar}">
        <div><label for="tip">İlan tipi</label><select id="tip" name="tip"><option value="">Tümü</option><option>Satılık</option><option>Kiralık</option></select></div>
        <div><label for="mah">Mahalle</label><select id="mah" name="mahalle"><option value="">Tümü</option>${mahalleler.map((m) => `<option>${esc(m)}</option>`).join("")}</select></div>
        <div><label for="oda">Oda sayısı</label><select id="oda" name="oda"><option value="">Tümü</option>${odalar.map((o) => `<option>${o}</option>`).join("")}</select></div>
        <button class="btn" type="submit">İlan ara</button>
      </form></div>`;
    $("#son").innerHTML = sirali.slice(0, 6).map(kart).join("");
    $("#hiz").innerHTML = HIZMETLER.map((h) => `<div><h3>${esc(h.baslik)}</h3><p>${esc(h.metin)}</p></div>`).join("");
    $("#bant").innerHTML = `<div><h2>Gayrimenkulünüzün değerini öğrenin</h2><p>Satmayı ya da kiraya vermeyi düşündüğünüz gayrimenkul için ücretsiz değerleme yapılmaktadır.</p></div>
      <a class="btn acik" href="${U.iletisim}?konu=degerleme">Değerleme talebi</a>`;
    // Danışmanlar
    const ekip = D.danismanlar || [];
    if (ekip.length) $("#ekip").innerHTML = ekip.map((a) => `<div class="kisi">${a.foto ? `<img src="${a.foto}" alt="${esc(a.ad)}" loading="lazy">` : ""}<div class="ic"><h3>${esc(a.ad)}</h3><div class="unvan">${esc([a.unvan, a.bolge].filter(Boolean).join(", "))}</div>${a.bio ? `<p>${esc(a.bio)}</p>` : ""}${a.tel ? `<a href="${tel(a.tel)}">${esc(a.tel)}</a>` : ""}</div></div>`).join("");
    else $("#ekipBolum").remove();
    $("#hakkimizda .metin").innerHTML = `<div class="etiket">Kurumsal</div><h2>Hakkımızda</h2><p>${esc(O.tanitim || "")}</p><p>${esc(O.hakkinda || "")}</p>`;
    $("#hakkimizda .kutu2").innerHTML = iletisimKutusu() + `<div class="harita" id="harita"></div>`;
    harita($("#harita"), ofisNokta, 15);
  }

  // İlanlar
  if (sayfa === "ilanlar") {
    const q = new URLSearchParams(location.search);
    const mahalleler = [...new Set(ilanlar.map((x) => x.mahalle).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr"));
    const odalar = [...new Set(ilanlar.map((x) => x.oda).filter(Boolean))].sort();
    const kategoriler = [...new Set(ilanlar.map((x) => x.kategori).filter(Boolean))];
    const sec = (ad, ops) => `<select name="${ad}"><option value="">Tümü</option>${ops.map((o) => `<option${q.get(ad) === o ? " selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
    $("#filtre").innerHTML = `
      <label>İlan tipi</label>${sec("tip", ["Satılık", "Kiralık"])}
      <label>Kategori</label>${sec("kategori", kategoriler)}
      <label>Mahalle</label>${sec("mahalle", mahalleler)}
      <label>Oda sayısı</label>${sec("oda", odalar)}
      <label>Fiyat (TL)</label><div class="iki"><input name="min" inputmode="numeric" placeholder="En az" value="${esc(q.get("min") || "")}"><input name="max" inputmode="numeric" placeholder="En çok" value="${esc(q.get("max") || "")}"></div>
      <button class="btn" type="submit">Filtrele</button>`;
    let lm = null, katman = null;
    if (window.L && $("#listeHarita")) {
      lm = L.map($("#listeHarita"), { scrollWheelZoom: false }).setView([merkez.lat || 41, merkez.lng || 29], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(lm);
      katman = L.layerGroup().addTo(lm);
    } else $("#listeHarita")?.remove();
    const kisa = (x) => x.tip === "Kiralık" ? Math.round(x.fiyat / 1000) + " B TL" : (x.fiyat >= 1e6 ? (x.fiyat / 1e6).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " M TL" : Math.round(x.fiyat / 1000) + " B TL");
    const ciz = () => {
      const f = Object.fromEntries(new FormData($("#filtre")));
      const sayi = (v) => +String(v || "").replace(/\D/g, "") || 0;
      let l = ilanlar.filter((x) => (!f.tip || x.tip === f.tip) && (!f.kategori || x.kategori === f.kategori) && (!f.mahalle || x.mahalle === f.mahalle) && (!f.oda || x.oda === f.oda)
        && (!sayi(f.min) || x.fiyat >= sayi(f.min)) && (!sayi(f.max) || x.fiyat <= sayi(f.max)));
      const s = $("#sira").value;
      if (s === "artan") l = [...l].sort((a, b) => a.fiyat - b.fiyat);
      if (s === "azalan") l = [...l].sort((a, b) => b.fiyat - a.fiyat);
      $("#adet").textContent = `${l.length} ilan`;
      $("#sonuc").innerHTML = l.length ? l.map(kart).join("") : `<div class="bos" style="grid-column:1/-1">Bu ölçütlere uygun ilan bulunamadı.</div>`;
      if (katman) {
        katman.clearLayers();
        const n = l.filter((x) => x.lat).map((x) => { L.marker([x.lat, x.lng], { icon: L.divIcon({ className: "fiyat-isaret", html: `<a href="${U.ilan(x.id)}">${kisa(x)}</a>`, iconSize: null }) }).addTo(katman); return [x.lat, x.lng]; });
        if (n.length) lm.fitBounds(n, { padding: [40, 40], maxZoom: 15 });
      }
    };
    $("#filtre").addEventListener("submit", (e) => { e.preventDefault(); ciz(); });
    $("#filtre").addEventListener("change", ciz);
    $("#sira").addEventListener("change", ciz);
    ciz();
  }

  // İlan detayı
  if (sayfa === "ilan") {
    const x = ilanlar.find((i) => i.id === (document.body.dataset.id || new URLSearchParams(location.search).get("id"))) || ilanlar[0];
    if (!x) return;
    document.title = `${x.baslik} | ${O.ad}`;
    $("#yol").innerHTML = `<a href="${U.ana}">Ana sayfa</a> / <a href="${U.ilanlar}">İlanlar</a> / ${esc(x.baslik)}`;
    const g = x.gorseller || [];
    $("#galeri").innerHTML = `<div class="ana"><img id="buyuk" src="${g[0]}" alt="${esc(x.baslik)}"></div>
      ${g.length > 1 ? `<div class="kucuk">${g.map((s, i) => `<button type="button"${i ? "" : ' class="on"'} data-s="${s}"><img src="${s}" alt=""></button>`).join("")}</div>` : ""}
      ${O.temsili ? `<div class="not">Fotoğraflar temsilidir.</div>` : ""}`;
    $("#galeri").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; $("#buyuk").src = b.dataset.s; $("#galeri").querySelectorAll("button").forEach((k) => k.classList.toggle("on", k === b)); });
    const satir = [["İlan no", x.ilanNo], ["İlan tarihi", x.tarih], ["Kategori", x.kategori], ["Oda sayısı", x.oda], ["Brüt alan", x.m2 && x.m2 + " m²"], ["Banyo", x.banyo], ["Bulunduğu kat", x.kat], ["Bina yaşı", x.yas != null && x.yas + " yıl"],
      ["Isıtma", x.isitma], ["Aidat", x.aidat ? tl(x.aidat) : null], ["Tapu durumu", x.tapu], ["Krediye uygun", x.kredi == null ? null : x.kredi ? "Evet" : "Hayır"]].filter(([, v]) => v);
    $("#ozellik").innerHTML = `<h2>İlan bilgileri</h2><table class="ozt">${satir.map(([k, v]) => `<tr><td>${k}</td><td>${esc(v)}</td></tr>`).join("")}</table>`;
    $("#acik").innerHTML = x.aciklama ? `<h2>Açıklama</h2><p style="margin:0">${esc(x.aciklama)}</p>` : "";
    if (!x.aciklama) $("#acik").remove();
    const mesaj = `Merhaba, ${x.ilanNo ? x.ilanNo + " numaralı " : ""}"${x.baslik}" ilanı hakkında bilgi almak istiyorum.`;
    $("#yan").innerHTML = `<span class="tip${x.tip === "Kiralık" ? " kira" : ""}">${x.tip} ${x.kategori.toLocaleLowerCase("tr")}</span><div class="fiyat">${fiyat(x)}</div><h1>${esc(x.baslik)}</h1><div class="yer">${esc([x.mahalle, x.ilce, x.il].filter(Boolean).join(", "))}</div>
      <div class="btns">${O.telefon ? `<a class="btn" href="${tel(O.telefon)}">Arayın</a>` : ""}${O.whatsapp ? `<a class="btn wa" href="${wa(mesaj)}" target="_blank" rel="noopener">WhatsApp ile bilgi alın</a>` : ""}</div>
      <form class="randevu" id="randevu"><h2>Gezme randevusu</h2>
        <input name="ad" placeholder="Adınız soyadınız" required><input name="tel" placeholder="Telefon" inputmode="tel" required>
        <input name="gun" type="date" required aria-label="Tarih">${onay}<button class="btn acik" type="submit">Randevu talebi gönder</button></form>
      <div class="ofis"><b>${esc(O.ad)}</b>${esc(O.adres)}</div>`;
    $("#randevu").gun.min = new Date().toISOString().slice(0, 10);
    $("#randevu").addEventListener("submit", (e) => {
      e.preventDefault(); const d = Object.fromEntries(new FormData(e.target));
      const gun = d.gun.split("-").reverse().join(".");
      gonder(e.target, { kind: "randevu", ad: d.ad, tel: d.tel, ilan: x.id, details: { "Tercih edilen gün": gun } },
        `Merhaba, "${x.baslik}" ilanı için gezme randevusu talep ediyorum. Tarih: ${gun}. Ad soyad: ${d.ad}. Telefon: ${d.tel}.`);
    });
    if (x.tip === "Satılık" && window.krediHesapla && $("#calc")) krediHesapla(x.fiyat, x.kredi); else $("#calc")?.closest(".kutu").remove();
    if (x.lat) harita($("#ilanHarita"), [[x.lat, x.lng]], 14); else $("#ilanHarita").closest(".kutu").remove();
    const benzer = ilanlar.filter((i) => i.id !== x.id && i.tip === x.tip).slice(0, 3);
    $("#benzer").innerHTML = benzer.map(kart).join("");
    if (!benzer.length) $("#benzerBolum").remove();
  }

  // İletişim
  if (sayfa === "iletisim") {
    $("#ilet").innerHTML = iletisimKutusu() + `<div class="harita" id="harita"></div>`;
    harita($("#harita"), ofisNokta, 15);
    if (new URLSearchParams(location.search).get("konu") === "degerleme") $("#form").konu.value = "Değerleme istiyorum";
    $("#form").addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      gonder(e.target, { kind: /değerleme/i.test(d.konu) ? "degerleme" : "iletisim", ad: d.ad, tel: d.tel, konu: d.konu, mesaj: d.mesaj },
        `Merhaba, ben ${d.ad}. ${d.konu}. ${d.mesaj}${d.tel ? " Telefon: " + d.tel : ""}`);
    });
  }
})();
