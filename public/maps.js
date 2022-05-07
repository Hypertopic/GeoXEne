const settings = {
  key: 'AIzaSyAtl1YBvhlhE_jJp-Bl1kVYigPaJfiti10',
  coverage: {
    center: {lat:  37.977950, lng: 23.718200},
    zoom: 19,
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

let putAddressOnMap = (api, address, map) => fetch(`${api}json?address=${address}&key=${settings.key}`)
  .then(x => x.json())
  .then(x => {
    if (x.results[0]) {
      new google.maps.Marker({position: x.results[0].geometry.location, map})
    } else {
      console.warn(`"${address}" not found!`);
    }
  });

function testGeoding(api, map) {
  for (let i = 2; i < 22; i++) {
    putAddressOnMap(api, `Tombe ${i}, Nécropole au Nord de l'Eridanos, Kerameikos`, map);
  }
  putAddressOnMap(api, 'Mur de thémistocle, Kerameikos', map);
}

function initMap() {
  let map1 = createMap('map1');
  let map2 = createMap('map2');
  putOverlaysOnMap(map1);
  putOverlaysOnMap(map2);
  testGeoding('https://maps.googleapis.com/maps/api/geocode/', map1);
  testGeoding('http://localhost:3000/', map2);
}
