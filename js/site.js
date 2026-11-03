// Ortak parçalar ve animasyonlar
(function () {
  const D = window.DATA;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const page = document.body.dataset.page || "";
  document.documentElement.classList.add("js");
  // Fotoğraflar ofisin kendi fotoğrafı değilse her görselin köşesinde "Temsili görsel" yazar
  if (D.ofis.temsili) document.documentElement.classList.add("temsili");
  const tel = (t) => t ? "tel:+90" + String(t).replace(/\D/g, "").replace(/^0/, "") : "#";

  // Marka rengi ve WhatsApp bağlantısı ofis ayarından gelir
  if (D.ofis.renk) document.documentElement.style.setProperty("--accent", D.ofis.renk);
  window.waLink = (text) => `https://wa.me/${D.ofis.whatsapp || ""}?text=${encodeURIComponent(text)}`;

  // ---------- Favoriler ----------
  const FKEY = "ihlamur-favoriler";
  window.fav = {
    list: () => { try { return JSON.parse(localStorage.getItem(FKEY)) || []; } catch (e) { return []; } },
    has: (id) => fav.list().includes(id),
    toggle: (id) => {
      const l = fav.list(), i = l.indexOf(id);
      i < 0 ? l.push(id) : l.splice(i, 1);
      localStorage.setItem(FKEY, JSON.stringify(l));
      document.querySelectorAll(`[data-fav="${id}"]`).forEach((b) => b.setAttribute("aria-pressed", i < 0));
      updateFavCount();
      dispatchEvent(new CustomEvent("favchange"));
    }
  };
  window.favBtn = (id, cls) => `<button type="button" class="fav ${cls || ""}" data-fav="${id}" aria-pressed="${fav.has(id)}" aria-label="Favorilere ekle">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5 4.2 12.9a4.9 4.9 0 0 1 6.9-6.9l.9.9.9-.9a4.9 4.9 0 0 1 6.9 6.9Z"/></svg></button>`;
  const updateFavCount = () => document.querySelectorAll(".fav-count").forEach((el) => {
    const n = fav.list().length;
    el.textContent = n; el.parentElement.classList.toggle("has", n > 0);
  });

  // ---------- Menü ----------
  // Sayfa adresleri. Statik demoda .html dosyalarıdır, Laravel sürümünde DATA.routes ile değişir.
  const R = window.ROUTES = Object.assign({
    home: "index.html", ilanlar: "ilanlar.html", hizmetler: "hizmetler.html", danismanlar: "danismanlar.html",
    hakkimizda: "hakkimizda.html", blog: "blog.html", iletisim: "iletisim.html", degerleme: "degerleme.html", kvkk: "kvkk.html",
    ilan: (x) => "ilan.html?id=" + x.id, danisman: (p) => "danisman.html?id=" + p.id, yazi: (y) => "yazi.html?id=" + y.id
  }, D.routes || {});
  ["ilan", "danisman", "yazi"].forEach((k) => { if (typeof R[k] === "string") { const base = R[k]; R[k] = (o) => base.replace("{id}", o.id); } });
  const links = [
    [R.ilanlar, "İlanlar", "ilanlar"],
    [R.hizmetler, "Hizmetler", "hizmetler"],
    ...(D.danismanlar && !D.danismanlar.length ? [] : [[R.danismanlar, "Danışmanlar", "danismanlar"]]),
    [R.hakkimizda, "Hakkımızda", "hakkimizda"],
    [R.blog, "Blog", "blog"],
    [R.iletisim, "İletişim", "iletisim"]
  ];
  const skip = document.createElement("a");
  skip.className = "skip"; skip.href = "#icerik"; skip.textContent = "İçeriğe geç";
  document.body.prepend(skip);

  const nav = document.createElement("header");
  nav.className = "nav";
  nav.innerHTML = `
    <a class="logo${D.ofis.logo ? " has-img" : ""}" href="${R.home}" aria-label="${D.ofis.ad} ana sayfa">${D.ofis.logo ? `<img src="${D.ofis.logo}" alt="${D.ofis.ad}">` : D.ofis.kisa}</a>
    <nav class="links" aria-label="Ana menü">${links.map(([h, t, k]) => `<a href="${h}" class="${k === page ? "on" : ""}" ${k === page ? 'aria-current="page"' : ""}>${t}</a>`).join("")}</nav>
    <div class="right">
      <a class="favlink" href="${R.ilanlar}?fav=1" aria-label="Favori ilanlar">Favoriler <span class="fav-count num">0</span></a>
      ${D.ofis.telefon ? `<a class="ulink hide-m" href="${tel(D.ofis.telefon)}">${D.ofis.telefon}</a>` : ""}
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mmenu"><span>Menü</span></button>
    </div>`;
  skip.after(nav);

  // Telefon menüsü
  const mm = document.createElement("div");
  mm.className = "mmenu"; mm.id = "mmenu"; mm.setAttribute("aria-hidden", "true");
  mm.innerHTML = `
    <nav aria-label="Telefon menüsü">${[[R.home, "Ana sayfa", "home"], ...links].map(([h, t, k], i) =>
      `<a href="${h}" style="--i:${i}" class="${k === page ? "on" : ""}"><span>${t}</span></a>`).join("")}</nav>
    <div class="mm-foot">${D.ofis.telefon ? `<a href="${tel(D.ofis.telefon)}">${D.ofis.telefon}</a>` : ""}${D.ofis.eposta ? `<a href="mailto:${D.ofis.eposta}">${D.ofis.eposta}</a>` : ""}</div>`;
  document.body.appendChild(mm);
  const btn = nav.querySelector(".menu-btn");
  const setMenu = (open) => {
    document.documentElement.classList.toggle("menu-open", open);
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
    btn.firstChild.textContent = open ? "Kapat" : "Menü";
    mm.setAttribute("aria-hidden", !open);
    onScroll();
  };
  btn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("open")) setMenu(false); });

  // ---------- Alt bilgi ----------
  const injectFooter = () => {
    const foot = document.querySelector("[data-footer]");
    if (!foot || foot.innerHTML) return;
    foot.innerHTML = `
      <div class="foot">
        <div><div class="h">Merkez ofis</div>${[D.ofis.adres, D.ofis.telefon && `<a href="${tel(D.ofis.telefon)}" style="display:inline">${D.ofis.telefon}</a>`, D.ofis.eposta && `<a class="ulink" style="display:inline" href="mailto:${D.ofis.eposta}">${D.ofis.eposta}</a>`].filter(Boolean).join("<br>")}</div>
        <div><div class="h">Sayfalar</div>${links.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</div>
        <div><div class="h">İlanlar</div><a href="${R.ilanlar}?tip=Satılık">Satılık</a><a href="${R.ilanlar}?tip=Kiralık">Kiralık</a><a href="${R.ilanlar}?kategori=Villa">Villalar</a><a href="${R.ilanlar}?kategori=Daire">Daireler</a><a href="${R.ilanlar}?fav=1">Favorilerim</a><a href="${R.degerleme}">Evinizin değeri</a></div>
        <div><div class="h">Ofisler</div>${(D.ofisler || []).map((o) => o.tel ? `<a href="${tel(o.tel)}">${o.sehir}, ${o.tel}</a>` : `<span style="display:block;margin:3px 0">${o.sehir}</span>`).join("")}</div>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} ${D.ofis.ad}.${D.ofis.yetki ? ` Taşınmaz ticareti yetki belgesi no ${D.ofis.yetki}.` : ""}</span>
        <span><a class="ulink" href="${R.kvkk}">KVKK aydınlatma metni</a></span>
        <span>${D.ofis.demoNot ?? "Bu site bir tasarım demosudur. Ofis ve ilanlar hayalidir."}</span>
        ${D.platform ? `<span><a class="ulink" href="${D.platform.url}" target="_blank" rel="noopener">${D.platform.ad} ile hazırlandı</a></span>` : ""}
      </div>
      <div class="wordmark" aria-hidden="true">${[...D.ofis.kisa].map((c, i) => `<span style="--i:${i}">${c}</span>`).join("")}</div>`;
  };

  // WhatsApp düğmesi (demo olduğu için numara yok, kişi seçtirir)
  const wa = document.createElement("a");
  wa.className = "wa";
  wa.href = waLink("Merhaba, ilanlarınız hakkında bilgi almak istiyorum.");
  wa.target = "_blank"; wa.rel = "noopener"; wa.setAttribute("aria-label", "WhatsApp ile yazın");
  wa.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>`;
  document.body.appendChild(wa);

  // Küçük bildirim
  window.toast = function (msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("on");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 2600);
  };

  // ---------- Kelimelere bölme ----------
  window.splitWords = function (root) {
    root.querySelectorAll(".hero .split, h1.split").forEach((el) => {
      if (el.dataset.done) return;
      el.dataset.done = 1;
      el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
      let i = 0;
      const walk = (node) => {
        [...node.childNodes].forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
              const w = document.createElement("span"); w.className = "w"; w.setAttribute("aria-hidden", "true");
              const s = document.createElement("span"); s.textContent = part; s.style.setProperty("--i", i++);
              w.appendChild(s); frag.appendChild(w);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
        });
      };
      walk(el);
    });
  };

  // ---------- Görünce açılan öğeler ----------
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  // Rakamlar ekrana gelince 1,2 saniyede sayar
  const countIO = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now(), dur = reduce ? 1 : 1200;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .4 });
  window.observeReveals = function (root) {
    splitWords(root);
    root.querySelectorAll("h1.split:not(.hero .split), [data-reveal], .img-reveal").forEach((el) => io.observe(el));
    root.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));
  };


  // ---------- Kaydırmaya bağlı efektler ----------
  // Ölçümler yalnızca açılışta ve boyut değişince yapılır. Kaydırırken sadece transform yazılır.
  const fx = { exp: [], heroH: 0 };
  let ticking = false, lastY = scrollY;

  function measure() {
    const y = scrollY, vh = innerHeight;
    fx.exp = [...document.querySelectorAll(".expand")].map((sec) => ({
      sec, frame: sec.querySelector(".frame"), img: sec.querySelector(".frame img"), sides: sec.querySelectorAll(".side-l, .side-r"),
      top: sec.getBoundingClientRect().top + y, len: Math.max(1, sec.offsetHeight - vh)
    }));
    const hero = document.querySelector(".hero, .dhero");
    fx.heroH = hero ? hero.offsetHeight : 0;
    update();
  }

  function update() {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    fx.exp.forEach((o) => {
      if (o.top - y > vh || o.top + o.len + vh - y < 0) return;
      const p = Math.min(1, Math.max(0, (y - o.top) / o.len));
      const k = reduce ? 1 : Math.min(1, p / 0.7), e = 1 - Math.pow(1 - k, 3);
      if (e === o.e) return;
      o.e = e;
      const mobile = innerWidth < 900;
      // Çerçeve küçültülür, içindeki fotoğraf ters yönde büyütülür. Görüntü bozulmaz ve her şey ekran kartında çizilir.
      const sx = 1 - 2 * (mobile ? .12 : .34) * (1 - e), sy = 1 - 2 * (mobile ? .25 : .22) * (1 - e), z = 1.3 - .3 * e;
      o.frame.style.transform = `scale(${sx.toFixed(4)},${sy.toFixed(4)})`;
      o.img.style.transform = `scale(${(z / sx).toFixed(4)},${(z / sy).toFixed(4)})`;
      o.frame.style.setProperty("--o", e.toFixed(3));
      o.sides.forEach((el) => { el.style.opacity = Math.max(0, 1 - e * 2.2).toFixed(3); });
      o.sec.classList.toggle("full", k >= 1);
    });
  }

  function onScroll() {
    const y = scrollY, open = nav.classList.contains("open");
    if (Math.abs(y - lastY) > 2 || y < 200) nav.classList.toggle("hide", y > lastY && y > 200 && !open);
    nav.classList.toggle("over", fx.heroH > 0 && y < fx.heroH - 80 && !open);
    lastY = y;
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  addEventListener("scroll", onScroll, { passive: true });
  let rt;
  const remeasure = () => { clearTimeout(rt); rt = setTimeout(measure, 120); };
  addEventListener("resize", remeasure);
  addEventListener("load", remeasure);
  if (document.fonts) document.fonts.ready.then(remeasure);
  // Sayfa yüksekliği değişirse (filtre, görsel yüklenmesi) ölçümleri yenile
  if (window.ResizeObserver) new ResizeObserver(remeasure).observe(document.body);
  window.remeasure = remeasure;

  // ---------- Fareyi takip eden öğe ----------
  // Döngü sadece fare hareket ederken çalışır, durunca kendini kapatır.
  const follower = (el, ease, ox, oy) => {
    let x = 0, y = 0, cx = 0, cy = 0, run = false, first = true;
    const step = () => {
      cx += (x - cx) * ease; cy += (y - cy) * ease;
      el.style.transform = `translate3d(${(cx + ox).toFixed(1)}px,${(cy + oy).toFixed(1)}px,0)`;
      if (Math.abs(x - cx) + Math.abs(y - cy) > .3) requestAnimationFrame(step); else run = false;
    };
    return (nx, ny) => {
      x = nx; y = ny;
      if (first) { cx = x; cy = y; first = false; }
      if (!run) { run = true; requestAnimationFrame(step); }
    };
  };
  // İmleci takip eden fotoğraf
  window.floatImages = function (list, sel) {
    if (!finePointer || reduce) return;
    const box = document.createElement("div");
    box.className = "float-img";
    document.body.appendChild(box);
    const move = follower(box, .14, 30, -180);
    list.addEventListener("mousemove", (e) => move(e.clientX, e.clientY), { passive: true });
    list.querySelectorAll(sel || "li").forEach((li) => {
      li.addEventListener("mouseenter", () => {
        const img = document.createElement("img"); img.src = li.dataset.img; img.alt = ""; img.decoding = "async";
        img.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 700, easing: "cubic-bezier(.76,0,.24,1)" });
        box.appendChild(img);
        while (box.children.length > 2) box.firstChild.remove();
        box.classList.add("on");
      });
    });
    list.addEventListener("mouseleave", () => box.classList.remove("on"));
  };

  // ---------- Açılış ----------
  const start = () => {
    document.body.classList.add("ready");
    splitWords(document);
    setTimeout(() => document.querySelectorAll(".hero .split").forEach((el) => el.classList.add("on")), 150);
    observeReveals(document);
  };

  const boot = () => {
    injectFooter();
    // Sayfadaki ofis bilgisi alanlarını doldur (örneğin <span data-ofis="adres">)
    document.querySelectorAll("[data-ofis]").forEach((el) => { el.textContent = D.ofis[el.dataset.ofis] || ""; });
    updateFavCount();
    document.querySelectorAll("[data-fav]").forEach((b) => b.setAttribute("aria-pressed", fav.has(b.dataset.fav)));
    const main = document.querySelector("main") || document.querySelector("section");
    if (main && !main.id) main.id = "icerik";
    measure();
    onScroll();
    start();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();

  document.addEventListener("click", (e) => {
    const f = e.target.closest("[data-fav]");
    if (f) {
      e.preventDefault(); e.stopPropagation();
      const was = fav.has(f.dataset.fav);
      fav.toggle(f.dataset.fav);
      toast(was ? "İlan favorilerden çıkarıldı." : "İlan favorilere eklendi.");
      return;
    }
  });
  addEventListener("pageshow", (e) => { if (e.persisted) { setMenu(false); updateFavCount(); } });

  // Küçük fotoğraf sürümü (kartlar için)
  window.sm = (src) => src.replace(/([^/]+)$/, "sm/$1");

  // Ortak kart şablonu
  window.cardHTML = function (x, i, extra) {
    const no = i == null ? "" : `<div class="no num"><span>${String(i + 1).padStart(2, "0")}</span><span>${x.kategori}</span></div>`;
    return `<a class="card ${extra || ""}" href="${R.ilan(x)}">${no}
      <div class="ph"><img src="${sm(x.gorseller[0])}" alt="${x.baslik}, ${x.mahalle}" loading="lazy" decoding="async"><img class="alt" src="${sm(x.gorseller[1] || x.gorseller[0])}" alt="" loading="lazy" decoding="async"><span class="tag">${x.tip}</span>${favBtn(x.id)}</div>
      <div class="row"><span class="t">${x.baslik}</span><span class="num">${x.oda}</span></div>
      <div class="row"><span>${[x.mahalle !== x.ilce && x.mahalle, x.ilce].filter(Boolean).join(", ")}</span><span class="num">${fmtFiyat(x)}</span></div>
    </a>`;
  };
})();
