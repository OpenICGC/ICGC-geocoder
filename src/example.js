// @flow
"use strict";


//How to use @geostarters/common library (node version)
const { Utils } = require("@geostarters/common");
const Geocoder = require("./index");

//How to use flowtyped definition
const myPoint = Geocoder.createPoint({
	x: 1.5432,
	y: 42.0012
});

console.log(myPoint.lat, myPoint.lon);
console.log(Utils.invertColor("#FFFFFF"));

Geocoder.reverseGeocoding({lat: 42.0012, lng: 1.5432}).then((elemets) => {

	console.log(elemets);

});

