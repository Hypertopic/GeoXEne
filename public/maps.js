let createMap = (id) => new google.maps.Map(document.getElementById(id), settings.coverage);

let showLocation = (x) => {
  document.getElementById('lat').value = x.latLng.lat();
  document.getElementById('long').value = x.latLng.lng();
}

let putOverlaysOnMap = (map) => settings.overlays.map(x => new google.maps.GroundOverlay(...x))
  .map(x => {
    x.setMap(map);
    x.addListener('click', showLocation);
  });

let getLocation = (address) => fetch(`/json?address=${address}&key=${settings.key}`)
  .then(x => x.json())
  .then(x => x.results[0].geometry.location)
  .catch(x => null);

function putAddressesOnMap(map) {
  fetch('/addresses')
    .then(x => x.json())
    .then(x => Promise.all(x.map(getLocation)))
    .then(x => x.forEach(position => {
      if (position) {
        new google.maps.Marker({position, map});
      }
    }));
}

function initMap() {
  let map = createMap('map');
  putOverlaysOnMap(map);
  putAddressesOnMap(map);
}
