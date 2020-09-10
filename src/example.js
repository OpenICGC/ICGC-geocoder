// @flow
"use strict";


//How to use @geostarters/common library (node version)
const { Utils } = require("@geostarters/common");
const Point = require("./index");

//How to use flowtyped definition
const myPoint = Point.createPoint({
	x: 1.5432,
	y: 42.0012
});

console.log(myPoint.lat, myPoint.lon);
console.log(Utils.invertColor("#FFFFFF"));
