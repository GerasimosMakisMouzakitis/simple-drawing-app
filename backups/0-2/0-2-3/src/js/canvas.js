import { drawGrid } from './grid.js';
import { state } from './state.js';

export function initializeCanvas(ctx) {
    console.log('Initializing canvas...'); // Log when canvas initialization starts
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    drawCanvas(ctx); // Initial draw
    console.log('Canvas initialized and grid drawn.'); // Log when canvas initialization is complete
}

export function drawCanvas(ctx) {
    console.log('Refreshing canvas...'); // Log when canvas refresh starts
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    drawGrid(ctx, ctx.canvas.width, ctx.canvas.height); // Draw the grid
    console.log('Grid redrawn.'); // Log when the grid is redrawn

    // Draw all lines
    state.lines.forEach((line) => {
        drawLine(ctx, line.start, line.end);
    });
    console.log('All lines redrawn.'); // Log when all lines are redrawn

    // Draw grips for the selected line
    if (state.selectedLine) {
        drawGrips(ctx, state.selectedLine);
        console.log('Grips drawn for the selected line.'); // Log when grips are drawn
    }
}

export function drawLine(ctx, start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    console.log(`Line drawn from (${start.x}, ${start.y}) to (${end.x}, ${end.y}).`); // Log line details
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