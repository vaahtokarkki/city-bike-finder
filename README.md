# HSL City bikes finder

[![Build Status](https://travis-ci.org/vaahtokarkki/city-bike-finder.svg?branch=master)](https://travis-ci.org/vaahtokarkki/city-bike-finder) [![codecov](https://codecov.io/gh/vaahtokarkki/city-bike-finder/branch/master/graph/badge.svg)](https://codecov.io/gh/vaahtokarkki/city-bike-finder) [![DeepScan grade](https://deepscan.io/api/projects/2723/branches/19266/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2723&bid=19266)

Simple React app to find the closest city bike station having given number of free bikes.

[Live demo](https://city-bikes-finder.herokuapp.com) of app.

Note: In the live demo, during the wintertime there's no city bikes available, but you can find the nearest empty station.

---

## Requirements

- NodeJS

## Installation

Install all dependencies:

    npm install

Start app:

    npm start

Now you should have running app on https://localhost:3000

---

## Examples

Screenshot of app:

![Landing page](./screenshots/landingpage.png) ![Results page](./screenshots/resultspage.png)
---

### Todo:
* Implement tests
* Add user geolocation to Flux store

---

### Built with

- [Material-UI](https://github.com/mui-org/material-ui/) - Material UI components
- [Leaflet](https://github.com/Leaflet/Leaflet) - JS Map library, used with
- [react-leaflet](https://github.com/PaulLeCam/react-leaflet)
- [React Apollo](https://github.com/apollographql/react-apollo) - GraphQL client for React
- [geodist](https://github.com/cmoncrief/geodist) - Coordinates distance calculation

### Used APIs

- [Digitransit API](https://digitransit.fi/en/developers/)
