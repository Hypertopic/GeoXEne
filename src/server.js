const express = require('express');
const app = express();
const cors = require('cors');
const proxy = require('express-http-proxy');
const cache = require('apicache').middleware;
const md5 = require('crypto-js/md5');
const base64 = require ('crypto-js/enc-base64');
const db = require('better-sqlite3')('database.db');
const bodyParser = require('body-parser');

app.use(cors('http://localhost'));

let hash = (x) => base64.stringify(md5(x));

let emulate = (req, res, next) => {
  let location = db.prepare(`SELECT * FROM localization WHERE address=? `).get(req.query.address);
  if (location || !req.query.address) {
    let place_id = hash(req.query.address);
    let results = (location) ? [{geometry: {location}, place_id}] : [];
    res.json({results});
  } else {
    next();
  }
}

let transmit = proxy('https://maps.googleapis.com', {
  proxyReqPathResolver: (x) => `/maps/api/geocode${x.url}`
});

const getAllLocalizations = () => {
  let geocoding = [];
  let allLocalization = db.prepare(`SELECT address FROM localization`).all();
  allLocalization.forEach(element => {
    geocoding.push(element.address);
  });
  return geocoding;
}


const t = () => {}

let sendAddresses = (_, res) => res.json(getAllLocalizations());

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(bodyParser.json());       // to support JSON-encoded bodies

app.route('/addresses')
    .get(sendAddresses)
    .post((req, res, next) => {
    const {title, lat, long} = req.body;
    db.prepare(`INSERT INTO localization (address, lat, lng) VALUES(?, ?, ?)`).run(title, lat, long);
    //res.sendStatus(201);
    res.redirect('/');
});
app.get('/json', cache('15 minutes'), emulate, transmit);
app.use(express.static('public'));

app.listen(3000);
console.log("Test it on http://localhost:3000/");