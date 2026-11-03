// OpenStreetMap haritası (ücretsiz, anahtar istemez)
window.makeMap = function (el, center, zoom) {
  el.setAttribute("data-lenis-prevent", "");
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false, attributionControl: true });
  // Merkez verilmezse çağıran taraf fitBounds ile konumlar, böylece gereksiz harita parçası yüklenmez
  if (center) map.setView(center, zoom || 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  // Tekerlekle yakınlaştırma sadece haritaya tıklanınca açılır, sayfa kaydırması bozulmaz
  map.on("click", () => map.scrollWheelZoom.enable());
  map.on("mouseout", () => map.scrollWheelZoom.disable());
  return map;
};

window.pinIcon = function (label, cls) {
  return L.divIcon({ className: "pin-wrap", html: `<div class="pin ${cls || ""}">${label || ""}</div>`, iconSize: [0, 0] });
};
