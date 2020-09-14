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

});
