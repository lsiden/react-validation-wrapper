'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isIterable = isIterable;
exports.getDisplayName = getDisplayName;
exports.areShallowArraysEqual = areShallowArraysEqual;
var debug = require('debug')('validation-wrapper:helpers');

// Thanks to https://stackoverflow.com/a/44586654/270511
function isIterable(obj) {
	return obj == null ? false : typeof obj[Symbol.iterator] === 'function';
}

function getDisplayName(Component) {
	return Component.displayName || Component.name || 'Component';
}

function areShallowArraysEqual(ar1, ar2) {
	if (ar1.length !== ar2.length) {
		return false;
	}
	for (var i = 0; i < ar1.length; ++i) {
		if (ar1[i] !== ar2[i]) {
			return false;
		}
	}
	return true;
}