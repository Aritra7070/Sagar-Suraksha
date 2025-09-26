// Map logic like the alert page
var map = L.map('map').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
// Example markers
const markers = [
  { lat: 19.0760, lng: 72.8777, severity: 'High', location: 'Mumbai', details: 'Flood warning' },
  { lat: 28.7041, lng: 77.1025, severity: 'Medium', location: 'Delhi', details: 'Heatwave alert' },
];
const severityColors = { Low: '#3b82f6', Medium: '#f59e0b', High: '#ef4444' };
markers.forEach(({lat, lng, severity, location, details}) => {
  const marker = L.circleMarker([lat, lng], {
    radius: 10,
    color: severityColors[severity],
    fillColor: severityColors[severity],
    fillOpacity: 0.7,
  }).addTo(map);
  marker.bindPopup(`<b>${location}</b><br/>Severity: ${severity}<br/>${details}`);
});
// Track device
function trackLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords;
      map.setView([latitude, longitude], 13);
      L.marker([latitude, longitude]).addTo(map)
        .bindPopup('You are here').openPopup();
    }, () => {
      alert('Unable to retrieve your location');
    });
  } else {
    alert('Geolocation is not supported by your browser');
  }
}
