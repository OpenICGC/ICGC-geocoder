// @flow
"use strict";

const Geocoder = require("./index");

describe("Geocoder library: ", () => {

	const myCoord: Coord = {
		lat: 42.0012, 
		lng: 1.5432
	};

	const balmesCoord: Coord = {
		lat: 41.402212, 
		lng: 2.145536
	};

	it("reverse geocoding {lat: 42.0012, lng: 1.5432}", async () => {
		const features = await Geocoder.reverseGeocoding(myCoord);
		expect(features.length).toBe(10);
	});

	it("reverse geocoding {lat: 42.0012, lng: 1.5432}", async () => {
		const features = await Geocoder.reverseGeocoding(myCoord, ["pk","topo"]);
		expect(features.length).toBe(10);
	});

	it("reverse geocoding layers error", async () => {
		try {
			
			await Geocoder.reverseGeocoding(myCoord, ["pk","boo"]);
		
		} catch (e) {
			
			expect(e.message).toBe("Layer Not supported!");
		
		}
	});

	it("reverse geocoding {lat: 42.0012, lng: 1.5432} limit 1", async () => {
		const features = await Geocoder.reverseGeocoding(myCoord, null, 1);
		expect(features.length).toBe(1);
	});

	it("reverse geocoding {lat: 42.0012, lng: 1.5432} layer pk limit 2", async () => {
		const features = await Geocoder.reverseGeocoding(myCoord, ["pk"], 2);
		expect(features.length).toBe(2);
	});

	it("reverse geocoding Carrer De Balmes 303 {lat: 41.402212, lng: 2.145536} layer address limit 1", async () => {
		const features = await Geocoder.reverseGeocoding(balmesCoord, ["address"], 1);
		expect(features.length).toBe(1);
		expect(features[0].properties.name).toBe("Carrer De Balmes 303")
	});

	it("batch reverse geocoding 2 coords layer pk limit 1", async () => {
		const features = await Geocoder.batchReverseGeocoding([myCoord, balmesCoord], ["pk","address"], 1);
		const isBalmes = features.some(feature => feature.properties.name === "Carrer De Balmes 303");
		expect(features.length).toBe(2);
		expect(isBalmes).toBeTruthy();
	});


	it("batch reverse geocoding 10 coords layer pk limit 1 maxblock 3", async () => {
		const coords = [
			myCoord, 
			balmesCoord,
			{lat: 41.5581497, lng: 2.25349325},
			{lat: 41.48289635, lng: 2.06976378},
			{lat: 41.5895268, lng: 2.58908344},
			{lat: 41.61346946, lng: 2.13609833},
			{lat: 41.40783443, lng: 2.17438582},
			{lat: 41.85043856, lng: 2.39620388},
			{lat: 41.26456869, lng: 1.93521235},
			{lat: 41.354611, lng: 2.01861054}
		];
		const features = await Geocoder.batchReverseGeocoding(coords, ["pk","address"], 1, 3);
		const isBalmes = features.some(feature => feature.properties.name === "Carrer De Balmes 303");
		expect(features.length).toBe(10);
		expect(isBalmes).toBeTruthy();
	});

	it("batch reverse geocoding 10 coords layer pk limit 1", async () => {
		const coords = [
			myCoord, 
			balmesCoord,
			{lat: 41.5581497, lng: 2.25349325},
			{lat: 41.48289635, lng: 2.06976378},
			{lat: 41.5895268, lng: 2.58908344},
			{lat: 41.61346946, lng: 2.13609833},
			{lat: 41.40783443, lng: 2.17438582},
			{lat: 41.85043856, lng: 2.39620388},
			{lat: 41.26456869, lng: 1.93521235},
			{lat: 41.354611, lng: 2.01861054}
		];
		const features = await Geocoder.batchReverseGeocoding(coords, ["pk","address"], 1);
		const isBalmes = features.some(feature => feature.properties.name === "Carrer De Balmes 303");
		expect(features.length).toBe(10);
		expect(isBalmes).toBeTruthy();
	});

});
