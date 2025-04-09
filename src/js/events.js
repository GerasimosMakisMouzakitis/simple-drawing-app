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

import { state, addLine } from './state.js';
import { drawCanvas } from './canvas.js';
import { defaultLineConfig, appConfig } from './config.js';

export function setupEventListeners(canvas, ctx) {
    console.log(`${appConfig.title} - Version: ${appConfig.version}`); // Updated version log
    console.log('Event Listeners Setup:');
    console.log('Canvas is loading...');

    // Handle Clear Canvas button
    const clearCanvasButton = document.getElementById('clearCanvasButton');
    clearCanvasButton.addEventListener('click', () => {
        console.log('Clear Canvas button clicked.');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        state.lines = []; // Clear all drawn lines
        drawCanvas(ctx); // Redraw the grid
        console.log('Canvas cleared and grid redrawn.');
    });

    // Handle Snap to Grid button
    const snapToGridButton = document.getElementById('snapToGridButton');
    snapToGridButton.addEventListener('click', () => {
        state.isSnapToGridEnabled = !state.isSnapToGridEnabled;
        snapToGridButton.style.backgroundColor = state.isSnapToGridEnabled ? '#4CAF50' : '';
        console.log(`Snap to Grid toggled: ${state.isSnapToGridEnabled}`);
    });

    // Handle Draw Line button
    const drawLineButton = document.getElementById('drawLineButton');
    drawLineButton.addEventListener('click', () => {
        state.isDrawingEnabled = !state.isDrawingEnabled;
        drawLineButton.style.backgroundColor = state.isDrawingEnabled ? '#4CAF50' : '';
        console.log(`Drawing Mode toggled: ${state.isDrawingEnabled}`);
    });

    // Add event listeners for drawing lines
    let startPoint = null;

    canvas.addEventListener('mousedown', (event) => {
        if (!state.isDrawingEnabled) return; // Only allow drawing if enabled
        const rect = canvas.getBoundingClientRect();
        const currentPoint = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

        if (!startPoint) {
            // First click: Set the start point
            startPoint = currentPoint;
            console.log(`Start point set: (${startPoint.x}, ${startPoint.y})`); // Log the start point
        } else {
            // Second click: Set the end point and finalize the line
            const endPoint = currentPoint;
            console.log(`End point set: (${endPoint.x}, ${endPoint.y})`); // Log the end point

            // Add the line to the state
            addLine({
                start: startPoint,
                end: endPoint,
                color: defaultLineConfig.color, // Use the default color
                layer: defaultLineConfig.layer,
                thickness: defaultLineConfig.thickness,
            });

            state.currentMousePosition = null; // Clear the preview line
            drawCanvas(ctx); // Redraw the canvas
            startPoint = null; // Reset the start point
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        if (!state.isDrawingEnabled || !startPoint) return; // Only allow preview if drawing is enabled
        const rect = canvas.getBoundingClientRect();
        const endPoint = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        state.currentMousePosition = { start: startPoint, end: endPoint }; // Update the preview line
        drawCanvas(ctx); // Redraw the canvas with the preview line
    });

    console.log('Canvas event listeners set up.');
}