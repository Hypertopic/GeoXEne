const settings = {
  key: 'AIzaSyAtl1YBvhlhE_jJp-Bl1kVYigPaJfiti10',
  coverage: {
    center: {lat:  37.977950, lng: 23.718200},
    zoom: 18,
    mapTypeId : 'satellite'
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

let showLocation = (x) => console.log(x.latLng.toJSON());

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
