const express = require('express');
const app = express();
const cors = require('cors');
const geocoding = {
  "Tombe 2, Pompeion, Kerameikos": { lat: 37.97824388117687, lng: 23.718648807908984 },
  "Tombe 3, Pompeion, Kerameikos": { lat: 37.97821996444386, lng: 23.71865999861794 },
  "Tombe 4, Pompeion, Kerameikos": { lat: 37.978240496693424, lng: 23.718688698474313 },
  "Tombe 5, Pompeion, Kerameikos": { lat: 37.97821732623209, lng: 23.71872850041234 },
  "Tombe 6, Pompeion, Kerameikos": { lat: 37.978204131822544, lng: 23.718751193952546 },
  "Tombe 7, Pompeion, Kerameikos": { lat: 37.97819673199066, lng: 23.718772651624665 },
  "Tombe 8, Pompeion, Kerameikos": { lat: 37.97819250351496, lng: 23.71879317735662 },
  "Tombe 9, Pompeion, Kerameikos": { lat: 37.978261047642185, lng: 23.718681612577445 },
  "Tombe 10, Pompeion, Kerameikos": { lat: 37.97825472162928, lng: 23.71872084517933 },
  "Tombe 11, Pompeion, Kerameikos": { lat: 37.97825049315692, lng: 23.718732915119897 },
  "Tombe 12, Pompeion, Kerameikos": { lat: 37.978281389709856, lng: 23.71870015217474 },
  "Tombe 13, Pompeion, Kerameikos": { lat: 37.97830253206032, lng: 23.71870015217474 },
  "Tombe 14, Pompeion, Kerameikos": { lat: 37.978307817647, lng: 23.71872697426489 },
  "Tombe 15, Pompeion, Kerameikos": { lat: 37.97829196088586, lng: 23.71873099757841 },
  "Tombe 16, Pompeion, Kerameikos": { lat: 37.978275047003535, lng: 23.718745749727994 },
  "Tombe 17, Pompeion, Kerameikos": { lat: 37.97826553294301, lng: 23.718756478564053 },
  "Tombe 18, Pompeion, Kerameikos": { lat: 37.97819250351496, lng: 23.71879317735662 },
  "Tombe 19, Pompeion, Kerameikos": { lat: 37.978261047642185, lng: 23.718681612577445 },
  "Tombe 20, Pompeion, Kerameikos": { lat: 37.97825472162928, lng: 23.71872084517933 },
  "Tombe 21, Pompeion, Kerameikos": { lat: 37.97825049315692, lng: 23.718732915119897 },
};

app.use(cors('http://localhost'));
app.get('/', function(req, res) {
  let location = geocoding[req.query.address];
  let results = (location) ? [{geometry: {location}}] : [];
  res.json({results});
});
app.listen(3000);
console.log('Test it on http://localhost:3000/?address=Tombe+2,+Pompeion,+Kerameikos');
