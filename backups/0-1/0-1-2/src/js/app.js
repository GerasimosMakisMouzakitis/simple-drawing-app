import { initializeCanvas, drawPreviewLine, drawCanvas } from './canvas.js';

let isDrawingEnabled = false; // Track if the "Draw Line" button is toggled
let isDrawing = false; // Track if a line is being drawn
let startPoint = null;
let lines = [];

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const drawLineButton = document.getElementById('drawLineButton');
    const mouseCoordinates = document.getElementById('mouseCoordinates');

    initializeCanvas(ctx, lines);

    // Toggle "Draw Line" button
    drawLineButton.addEventListener('click', () => {
        isDrawingEnabled = !isDrawingEnabled;
        drawLineButton.style.backgroundColor = isDrawingEnabled ? '#4CAF50' : '';
        drawLineButton.textContent = isDrawingEnabled ? 'Drawing Enabled' : 'Draw Line';
    });

    // Handle mousemove to show coordinates and live preview
    canvas.addEventListener('mousemove', (event) => {
        const mousePos = { x: event.offsetX, y: event.offsetY };
        mouseCoordinates.textContent = `X: ${mousePos.x}, Y: ${mousePos.y}`;

        if (isDrawingEnabled && isDrawing) {
            drawCanvas(ctx, lines); // Redraw the canvas
            drawPreviewLine(ctx, startPoint, mousePos); // Draw live preview
        }
    });

    // Handle mousedown to start or finish drawing a line
    canvas.addEventListener('mousedown', (event) => {
        if (isDrawingEnabled) {
            const mousePos = { x: event.offsetX, y: event.offsetY };

            if (!isDrawing) {
                // Start drawing a new line
                startPoint = mousePos;
                isDrawing = true;
            } else {
                // Finish drawing the line
                const endPoint = mousePos;
                lines.push({ start: startPoint, end: endPoint });
                isDrawing = false;
                startPoint = null;
                drawCanvas(ctx, lines); // Redraw the canvas with the new line
            }
        }
    });
});