// @flow
"use strict";

const Geocoder = require("./index");

describe("InstamapsService library: ", () => {

	const myCoord: Coord = {
		lat: 42.0012, 
		lng: 1.5432
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

});
