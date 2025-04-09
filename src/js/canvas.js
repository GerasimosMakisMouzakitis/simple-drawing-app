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

import { drawGrid } from './grid.js';
import { state } from './state.js';

export function initializeCanvas(ctx) {
    console.log('Canvas Initialization:'); // Log before initializing the canvas
    console.log('Initializing canvas...'); // Log when canvas initialization starts
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    drawCanvas(ctx); // Initial draw
    console.log('Canvas initialized and grid drawn.'); // Log when canvas initialization is complete
}

export function drawCanvas(ctx) {
    console.log('Canvas Rendering:');
    console.log('Refreshing canvas...');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    drawGrid(ctx, ctx.canvas.width, ctx.canvas.height); // Draw the grid
    console.log('Grid redrawn.');

    // Draw all lines
    state.lines.forEach((line) => {
        drawLine(ctx, line.start, line.end, line.color, line.thickness); // Final lines
    });
    console.log('All lines redrawn.');

    // Draw the preview line if a currentMousePosition exists
    if (state.currentMousePosition && state.isDrawingEnabled) {
        drawLine(ctx, state.currentMousePosition.start, state.currentMousePosition.end, 'gray', 1); // Preview line in gray
    }

    // Draw grips for the selected line
    if (state.selectedLine) {
        drawGrips(ctx, state.selectedLine);
        console.log('Grips drawn for the selected line.');
    }
}

export function drawLine(ctx, start, end, color = 'black', thickness = 2) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.stroke();
    ctx.closePath();

    // Log only for final lines, not for preview lines
    if (color !== 'gray') {
        console.log(`Line drawn from (${start.x}, ${start.y}) to (${end.x}, ${end.y}) with color ${color} and thickness ${thickness}.`);
    }
}

export function drawGrips(ctx, line) {
    const gripSize = 6;
    ctx.fillStyle = 'red';

    // Draw grip at the start point
    ctx.fillRect(line.start.x - gripSize / 2, line.start.y - gripSize / 2, gripSize, gripSize);

    // Draw grip at the end point
    ctx.fillRect(line.end.x - gripSize / 2, line.end.y - gripSize / 2, gripSize, gripSize);

    console.log(`Grips drawn at (${line.start.x}, ${line.start.y}) and (${line.end.x}, ${line.end.y}).`); // Log grip details
}