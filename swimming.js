const spots = [
  {
    id: "lago-paranoa",
    name: "Lago Paranoá",
    location: "Brasília, Brazil",
    lat: -15.8076,
    lng: -47.8672,
    measurements: [
      { timestamp: "2026-05-23T08:00:00-03:00", water_temp_c: 26.5, air_temp_c: 28.2, humidity_pct: 72 },
      { timestamp: "2026-05-22T08:00:00-03:00", water_temp_c: 26.8, air_temp_c: 30.1, humidity_pct: 68 },
      { timestamp: "2026-05-21T08:00:00-03:00", water_temp_c: 27.0, air_temp_c: 29.5, humidity_pct: 70 }
    ]
  },
  {
    id: "lake-sassamat",
    name: "Lake Sassamat",
    location: "Port Moody, BC, Canada",
    lat: 49.3584,
    lng: -122.5853,
    measurements: [
      { timestamp: "2026-05-23T09:00:00-07:00", water_temp_c: 14.2, air_temp_c: 17.8, humidity_pct: 65 },
      { timestamp: "2026-05-22T09:00:00-07:00", water_temp_c: 13.9, air_temp_c: 16.5, humidity_pct: 70 },
      { timestamp: "2026-05-21T09:00:00-07:00", water_temp_c: 13.5, air_temp_c: 15.2, humidity_pct: 75 }
    ]
  },
  {
    id: "rainbow-lake",
    name: "Rainbow Lake",
    location: "Whistler, BC, Canada",
    lat: 50.0662,
    lng: -122.9290,
    measurements: [
      { timestamp: "2026-05-23T10:00:00-07:00", water_temp_c: 8.3, air_temp_c: 12.1, humidity_pct: 58 },
      { timestamp: "2026-05-22T10:00:00-07:00", water_temp_c: 8.0, air_temp_c: 11.4, humidity_pct: 62 },
      { timestamp: "2026-05-21T10:00:00-07:00", water_temp_c: 7.8, air_temp_c: 10.8, humidity_pct: 65 }
    ]
  }
];

function latestMeasurement(measurements) {
  return measurements.reduce((a, b) =>
    new Date(a.timestamp) > new Date(b.timestamp) ? a : b
  );
}

function formatTimestamp(iso) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function buildPopup(spot, m) {
  return `
    <div class="popup-name">${spot.name}</div>
    <div class="popup-location">${spot.location}</div>
    <div class="popup-stats">
      <span class="popup-stat-label">Water</span>
      <span class="popup-stat-value">${m.water_temp_c.toFixed(1)} °C</span>
      <span class="popup-stat-label">Air</span>
      <span class="popup-stat-value">${m.air_temp_c.toFixed(1)} °C</span>
      <span class="popup-stat-label">Humidity</span>
      <span class="popup-stat-value">${m.humidity_pct}%</span>
    </div>
    <div class="popup-timestamp">Updated ${formatTimestamp(m.timestamp)}</div>
  `;
}

const map = L.map("map");

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors ' +
    '&copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 20
}).addTo(map);

const bounds = [];

spots.forEach(spot => {
  const m = latestMeasurement(spot.measurements);

  const icon = L.divIcon({
    html: `<div class="swim-marker">${m.water_temp_c.toFixed(1)} °C</div>`,
    className: "swim-marker-wrap",
    iconSize: [84, 30],
    iconAnchor: [42, 15],
    popupAnchor: [0, -20]
  });

  L.marker([spot.lat, spot.lng], { icon })
    .addTo(map)
    .bindPopup(buildPopup(spot, m), { maxWidth: 240 });

  bounds.push([spot.lat, spot.lng]);
});

if (bounds.length > 0) {
  map.fitBounds(bounds, { padding: [60, 60] });
}
