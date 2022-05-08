const settings = {
  key: document.currentScript.getAttribute('key'),
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
