const debug = require('debug')('validation-wrapper:helpers')

// Thanks to https://stackoverflow.com/a/44586654/270511
export function isIterable(obj) {
    return (obj == null) ? false : typeof obj[Symbol.iterator] === 'function'
}

export function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component'
}

export function areShallowArraysEqual(ar1, ar2) {
    if (ar1.length !== ar2.length) {
        return false
    }
    for (let i=0 ; i < ar1.length ; ++i) {
        if (ar1[i] !== ar2[i]) {
            return false
        }
    }
    return true
}