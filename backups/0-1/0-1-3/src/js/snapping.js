import { getNearestGridPoint, getNearestMidpoint, getNearestEndpoint } from './utils.js';

let snapToGridEnabled = false, snapToMidpointEnabled = false, snapToEndpointEnabled = false;

export function initializeSnapping() {
    document.getElementById('snapToGridCheckbox').addEventListener('change', (event) => {
        snapToGridEnabled = event.target.checked;
    });

    document.getElementById('snapToMidpointCheckbox').addEventListener('change', (event) => {
        snapToMidpointEnabled = event.target.checked;
    });

    document.getElementById('snapToEndpointCheckbox').addEventListener('change', (event) => {
        snapToEndpointEnabled = event.target.checked;
    });
}

export function getSnappedPoint(mousePos) {
    if (snapToEndpointEnabled) {
        const endpoint = getNearestEndpoint(mousePos);
        if (endpoint) return endpoint;
    }
    if (snapToMidpointEnabled) {
        const midpoint = getNearestMidpoint(mousePos);
        if (midpoint) return midpoint;
    }
    if (snapToGridEnabled) {
        return getNearestGridPoint(mousePos);
    }
    return mousePos;
}