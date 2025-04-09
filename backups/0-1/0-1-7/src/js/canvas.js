import { drawGrid, drawLine } from './utils.js';

export function initializeCanvas(ctx, lines) {
    console.log('Initializing canvas...');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    drawCanvas(ctx, lines, null); // Initial draw
    console.log('Canvas initialized.');
}

export function drawCanvas(ctx, lines, selectedLine) {
    console.log('Redrawing canvas...');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    drawGrid(ctx, ctx.canvas.width, ctx.canvas.height); // Draw the grid
    console.log('Grid drawn.');
    lines.forEach((line) => drawLine(ctx, line.start, line.end)); // Draw all lines

    if (selectedLine) {
        drawGrips(ctx, selectedLine); // Draw grips for the selected line
        console.log('Grips drawn for selected line.');
    }
}

export function drawPreviewLine(ctx, start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = 'gray'; // Use a different color for the preview
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}

export function drawGrips(ctx, line) {
    const gripSize = 6; // Size of the square grips
    const points = [line.start, line.end];

    points.forEach((point) => {
        ctx.beginPath();
        ctx.rect(point.x - gripSize / 2, point.y - gripSize / 2, gripSize, gripSize);
        ctx.fillStyle = 'red'; // Red color for the grips
        ctx.fill();
        ctx.closePath();
    });
}

export function drawSnapPoint(ctx, point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI); // Draw a small circle (radius = 5)
    ctx.fillStyle = 'red'; // Red color for the snap point
    ctx.fill();
    ctx.closePath();
}