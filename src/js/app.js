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

import { initializeCanvas } from './canvas.js'; // Handles canvas initialization and drawing
import { setupEventListeners } from './events.js'; // Handles user interactions
import { state, updateDefaultLineColor } from './state.js'; // Import state to log initial button states and update line color
import { appConfig } from './config.js'; // Import app metadata

function initializeApp() {
    console.log(`${appConfig.title} - Version: ${appConfig.version}`);
    console.log(`Author: ${appConfig.author}`);
    console.log(`License: ${appConfig.license.name}`);
    console.log(`License URL: ${appConfig.license.url}`);
    console.log(`Last Updated: ${appConfig.lastUpdate}`);
    console.log('App initialized successfully.');
}

// Call the initialization function
initializeApp();

// Get the canvas element and its context
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// 1. Log the initial button states before anything else
console.log('Initial button states:');
console.log(`- Draw Line: ${state.isDrawingEnabled}`);
console.log(`- Snap to Grid: ${state.isSnapToGridEnabled}`);
console.log(`- Clear Canvas: Ready to clear the canvas.`);

// 2. Set up event listeners for buttons and canvas interactions
setupEventListeners(canvas, ctx); // This will now run and log "Canvas is loading..."

// 3. Initialize the canvas (draw grid and prepare for drawing)
initializeCanvas(ctx); // This will now run and log "Canvas initialized and grid drawn."

// 4. Set up event listener for line color input
document.getElementById('lineColor').addEventListener('input', (event) => {
    const newColor = event.target.value;
    updateDefaultLineColor(newColor);
});