// Konut kredisi hesaplama.
// Oranlar bankaların duyurduğu en düşük aylık konut kredisi faizleridir. Değiştiğinde yalnızca KREDI.bankalar ve KREDI.tarih güncellenir.
const KREDI = {
  tarih: "4 Kasım 2026",
  bankalar: [
    ["Kuveyt Türk", 2.87], ["Ziraat Bankası", 2.89], ["Ziraat Katılım", 2.89], ["Vakıf Katılım", 2.94],
    ["Halkbank", 2.99], ["QNB", 2.99], ["TEB", 3.09], ["Garanti BBVA", 3.13], ["Akbank", 3.15],
    ["Emlak Katılım", 3.39], ["ING", 3.54], ["Şekerbank", 3.58], ["ICBC Turkey", 3.83]
  ],
  // BDDK 30 Ocak 2026 kararı: konut değerine ve enerji sınıfına göre en yüksek kredi oranı (A-B, C, diğer)
  limit: [[5e6, [90, 80, 70]], [7e6, [80, 70, 60]], [10e6, [70, 60, 50]], [20e6, [50, 40, 30]], [Infinity, [40, 30, 20]]],
  tahsis: 0.005 // tahsis ücreti en fazla kredi tutarının binde 5'i
};

window.krediHesapla = function (fiyat, krediyeUygun) {
  const kok = document.getElementById("calc");
  if (!kok) return;
  const tl = (n) => Math.round(n).toLocaleString("tr-TR") + " TL";
  const yuzde = (n) => "%" + n.toLocaleString("tr-TR", { minimumFractionDigits: 2 });
  const taksit = (P, r, n) => P * r / (1 - Math.pow(1 + r, -n));
  const enFazla = (sinif) => KREDI.limit.find(([ust]) => fiyat < ust)[1][sinif] / 100;

  kok.innerHTML = `
    <div>
      <div class="label" data-reveal>Kredi hesaplama</div>
      <p data-reveal>Taksitler bankaların ${KREDI.tarih} tarihinde duyurduğu en düşük konut kredisi faiz ve kar payı oranlarıyla hesaplanır. Konut kredisinde KKDF ve BSMV alınmaz. Kesin oran ve kredi tutarı bankanın değerlendirmesine göre belirlenir.${krediyeUygun === false ? " Bu ev şu anda krediye uygun değildir." : ""}</p>
    </div>
    <div data-reveal>
      <div class="calc-box">
        <div class="calc-in">
          <label><span>Enerji sınıfı</span><select id="cSinif"><option value="0">A veya B</option><option value="1">C</option><option value="2" selected>D, E, F veya G</option></select></label>
          <label><span>Kredi tutarı</span><output id="cTutarO" class="num"></output><input type="range" id="cTutar" min="0" step="10000"></label>
          <label><span>Vade</span><select id="cVade">${[12, 24, 36, 48, 60, 84, 96, 120].map((v) => `<option value="${v}"${v === 120 ? " selected" : ""}>${v} ay</option>`).join("")}</select></label>
        </div>
        <div class="calc-out">
          <div><dt>Çekilebilecek en yüksek kredi</dt><dd class="num" id="cMax"></dd></div>
          <div><dt>Peşinat</dt><dd class="num" id="cPes"></dd></div>
          <div class="main"><dt>En düşük aylık taksit</dt><dd class="num" id="cTaksit"></dd></div>
          <div><dt>Tahsis ücreti (en fazla)</dt><dd class="num" id="cTahsis"></dd></div>
        </div>
      </div>
      <table class="calc-banks">
        <thead><tr><th>Banka</th><th>Aylık oran</th><th>Aylık taksit</th><th>Toplam geri ödeme</th></tr></thead>
        <tbody id="cBankalar"></tbody>
      </table>
      <p class="calc-note">En yüksek kredi tutarı BDDK'nın konut değerine ve enerji sınıfına göre belirlediği sınıra göre hesaplanır. Adınıza, eşinize veya 18 yaşından küçük çocuğunuza kayıtlı başka bir konut varsa bu sınır daha düşük uygulanır.</p>
    </div>`;

  const $ = (i) => document.getElementById(i), tutar = $("cTutar");
  const sinirla = () => {
    const max = Math.floor(fiyat * enFazla(+$("cSinif").value) / 10000) * 10000;
    tutar.max = max;
    if (+tutar.value > max || !tutar.dataset.dokunuldu) tutar.value = max;
  };
  const hesapla = () => {
    const P = +tutar.value, n = +$("cVade").value;
    const satirlar = KREDI.bankalar.map(([ad, oran]) => ({ ad, oran, m: P ? taksit(P, oran / 100, n) : 0 })).sort((a, b) => a.oran - b.oran);
    $("cMax").textContent = tl(+tutar.max);
    $("cTutarO").textContent = tl(P);
    $("cPes").textContent = tl(fiyat - P);
    $("cTaksit").textContent = P ? tl(satirlar[0].m) : "Kredi yok";
    $("cTahsis").textContent = tl(P * KREDI.tahsis);
    $("cBankalar").innerHTML = satirlar.map((s, i) => `<tr${i === 0 ? ' class="best"' : ""}><td>${s.ad}</td><td class="num">${yuzde(s.oran)}</td><td class="num">${tl(s.m)}</td><td class="num">${tl(s.m * n)}</td></tr>`).join("");
  };
  $("cSinif").addEventListener("input", () => { sinirla(); hesapla(); });
  tutar.addEventListener("input", () => { tutar.dataset.dokunuldu = 1; hesapla(); });
  $("cVade").addEventListener("input", hesapla);
  sinirla(); hesapla();
};
