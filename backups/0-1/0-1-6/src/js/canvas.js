import { drawGrid, drawLine } from './utils.js';

export function initializeCanvas(ctx, lines) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    drawCanvas(ctx, lines); // Initial draw
}

export function drawCanvas(ctx, lines) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    drawGrid(ctx, ctx.canvas.width, ctx.canvas.height); // Draw the grid
    lines.forEach((line) => drawLine(ctx, line.start, line.end)); // Draw all lines
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

export function drawSnapPoint(ctx, point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI); // Draw a small circle (radius = 5)
    ctx.fillStyle = 'red'; // Red color for the snap point
    ctx.fill();
    ctx.closePath();
}