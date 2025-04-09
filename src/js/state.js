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

import { defaultLineConfig } from './config.js';

export const state = {
    lines: [], // Stores all drawn lines
    selectedLine: null, // Currently selected line
    isDrawingEnabled: false, // Whether drawing mode is enabled
    isSnapToGridEnabled: false, // Whether snap-to-grid is enabled
    currentMousePosition: null, // Temporary end point for line preview
};

// Toggle drawing mode
export function toggleDrawingMode() {
    state.isDrawingEnabled = !state.isDrawingEnabled;
    return state.isDrawingEnabled;
}

// Toggle snap-to-grid mode
export function toggleSnapToGrid() {
    state.isSnapToGridEnabled = !state.isSnapToGridEnabled;
    return state.isSnapToGridEnabled;
}

// Clear all lines
export function clearLines() {
    state.lines = [];
}

// Add a new line to the state
export function addLine(line) {
    state.lines.push(line);
}

// Get all lines
export function getLines() {
    return state.lines;
}

// Function to update the default line color
export function updateDefaultLineColor(color) {
    defaultLineConfig.color = color;
    console.log(`Default line color updated to: ${color}`);
}