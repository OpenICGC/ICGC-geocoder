// @flow
"use strict";


class Point {

	lat: number;
	lon: number;


	static createPoint(point: Point2d) {

		return {lat: point.y, lon:  point.x};

	}

}

module.exports = Point;
