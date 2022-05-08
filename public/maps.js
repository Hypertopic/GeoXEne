const settings = {
  coverage: {
    draggableCursor: 'pointer',
    center: {lat: 37.977950, lng: 23.718200},
    zoom: 18,
    mapTypeId: 'satellite'
  },
  overlays: [
    [
      'https://steatite.utt.fr/picture/405e66c63060b595c02e6590a8f6abbda104cb03',
      {south: 37.977910, west: 23.718200, north: 37.978780, east: 23.719010}
    ],
    [
      'https://steatite.utt.fr/picture/78e81db6ee77decd3e40cf3124c04a6aaaaa2fc4',
      {south: 37.97862453543905, west: 23.716649743986387, north: 37.978755, east: 23.716789}
    ]
  ]
};

let createMap = (id) => new google.maps.Map(document.getElementById(id), settings.coverage);

let fillForm = (latitude, longitude, title = '') => {
  document.getElementById('lat').value = latitude;
  document.getElementById('long').value = longitude;
  document.getElementById('title').value = title;
}

let showLocation = (x) => {
  fillForm(x.latLng.lat(), x.latLng.lng());
}

let putOverlaysOnMap = (map) => settings.overlays.map(x => new google.maps.GroundOverlay(...x))
  .map(x => {
    x.setMap(map);
    x.addListener('click', showLocation);
  });

let getLocation = (address) => fetch(`/json?address=${address}`)
  .then(x => x.json())
  .then(x => ({
    title: address,
    position: x.results[0].geometry.location
  }));

function putAddressesOnMap(map) {
  fetch('/addresses')
    .then(x => x.json())
    .then(x => Promise.all(x.map(getLocation)))
    .then(x => x.forEach(({title, position}) => {
      if (position) {
        new google.maps.Marker({position, title, map})
          .addListener('click', x => fillForm(position.lat, position.lng, title));
      }
    }));
}

function initMap() {
  let map = createMap('map');
  map.addListener('click', showLocation);
  putOverlaysOnMap(map);
  putAddressesOnMap(map);
}
