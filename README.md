# GeoXEne – Geocoding through transmission or emulation


## How to test the development version

### Requirements

- node and npm
- A [Google API key](https://console.cloud.google.com/) authorized for "Geocoding API".

### Installation

    npm install

### Start

    npm start

### Test

#### Geocode an address known by Google Maps

  Open http://localhost:3000/json?address=Kerameikos&key={KEY}

  The result is transmitted from https://maps.googleapis.com/maps/api/geocode/json?address=Kerameikos&key={KEY}


#### Geocode a custom address (unknown to Google Maps)

  Open http://localhost:3000/json?address=Tombe%202,%20N%C3%A9cropole%20au%20Nord%20de%20l%27Eridanos,%20Kerameikos&key={KEY}

  The result is different from the approximate result of https://maps.googleapis.com/maps/api/geocode/json?address=Tombe%202,%20N%C3%A9cropole%20au%20Nord%20de%20l%27Eridanos,%20Kerameikos&key={KEY}

  Please note that all the custom addresses can be seen on a map at <http://localhost:3000/>.

