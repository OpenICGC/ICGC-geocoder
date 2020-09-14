// @flow
"use strict";

const Geocoder = require("./index");

Geocoder.reverseGeocoding({lat: 42.0012, lng: 1.5432}).then((elemets) => {

	console.log(elemets);

});


Geocoder.batchReverseGeocoding([{
	lat: 42.0012,
	lng: 1.5432
}, {
	lat: 41.402212,
	lng: 2.145536
}], ["pk", "address"], 1).then((elemets) => {

	console.log(elemets);

});
