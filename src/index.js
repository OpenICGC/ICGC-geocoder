// @flow
"use strict";

const Axios = require("axios");

const url = "https://betaserver2.icgc.cat/cerca_pelias/reverse?";

const  layersTypes = ["address", "topo", "pk", "pois", "llogaret", "mun", "com"];

class Geocoder {

	static async reverseGeocoding(coord: Coord, layers?: Array<Layers>, limit?: number) {

		const queryUrl = [`lat=${coord.lat}&lon=${coord.lng}`];
		if (layers) {

			const result = layers.every(val => layersTypes.includes(val));
			if (result) {

				queryUrl.push(`layers=${layers.join(",")}`);

			} else {

				throw new Error("Layer Not supported!");

			}

		}
		if (limit) {

			queryUrl.push(`size=${limit}`);

		}

		const addr = await Axios.get(`${url}${queryUrl.join("&")}`);
		return addr.data.features || null;

	}

	static createPoint(point: Point2d) {

		return {lat: point.y, lon:  point.x};

	}

}

module.exports = Geocoder;
