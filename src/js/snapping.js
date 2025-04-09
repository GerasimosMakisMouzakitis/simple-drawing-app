/*
 * Copyright (c) 2025 Gerasimos Makis Mouzakitis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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