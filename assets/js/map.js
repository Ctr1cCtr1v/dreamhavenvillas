// Explore page map: villa pin + attraction pins from data/attractions.yaml.
(() => {
  const el = document.getElementById('map');
  const dataEl = document.getElementById('map-data');
  if (!el || !dataEl || !window.L) return;
  const { home, places } = JSON.parse(dataEl.textContent);

  const map = L.map(el, {
    scrollWheelZoom: false,          // don't hijack page scrolling
    dragging: !L.Browser.mobile,     // one-finger swipes scroll the page on phones; pinch still zooms
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const homeIcon = L.divIcon({
    className: 'pin-home',
    html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c.6 5.6 2.4 8.4 12 12-9.6 3.6-11.4 6.4-12 12-.6-5.6-2.4-8.4-12-12C9.6 8.4 11.4 5.6 12 0z"/></svg>',
    iconSize: [44, 44], iconAnchor: [22, 22], popupAnchor: [0, -20],
  });
  const homeMarker = L.marker([home.lat, home.lng], { icon: homeIcon, zIndexOffset: 1000, title: home.name })
    .bindPopup(`<strong>${esc(home.name)}</strong><br>${esc(home.address)}`)
    .addTo(map);

  const markers = places.map((p) => {
    const icon = L.divIcon({
      className: 'pin',
      html: `<span style="background:${esc(p.color)}"></span>`,
      iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -10],
    });
    const links = [p.url && `<a href="${esc(p.url)}" target="_blank" rel="noopener">Website</a>`,
                   `<a href="${esc(p.dir)}" target="_blank" rel="noopener">Directions</a>`].filter(Boolean).join(' · ');
    const m = L.marker([p.lat, p.lng], { icon, title: p.name })
      .bindPopup(`<strong>${esc(p.name)}</strong><br>${esc(p.drive)} · ${esc(p.miles)} mi from the villa<br>${links}`);
    m.cat = p.cat;
    m.miles = Number(p.miles) || 0;
    return m;
  });

  const fit = (list) => {
    const pts = [homeMarker.getLatLng(), ...list.map((m) => m.getLatLng())];
    map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 13 });
  };

  const showCat = (cat) => {
    const shown = [];
    markers.forEach((m) => {
      const on = !cat || m.cat === cat;
      if (on) { m.addTo(map); shown.push(m); } else { m.remove(); }
    });
    // "All" starts zoomed on the local area (within ~35 miles), not the whole state
    fit(cat ? shown : shown.filter((m) => m.miles <= 35));
  };
  showCat('');

  const bar = document.querySelector('.map-filters');
  if (bar) {
    bar.hidden = false;
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter');
      if (!btn) return;
      bar.querySelectorAll('.filter').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      map.closePopup();
      showCat(btn.dataset.cat);
    });
  }
})();
