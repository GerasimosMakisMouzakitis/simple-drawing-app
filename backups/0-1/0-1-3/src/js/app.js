import { initializeCanvas, drawPreviewLine, drawCanvas } from './canvas.js';
import { getNearestGridPoint } from './utils.js';

let isDrawingEnabled = false; // Track if the "Draw Line" button is toggled
let isSnapToGridEnabled = false; // Track if the "Snap to Grid" button is toggled
let isDrawing = false; // Track if a line is being drawn
let startPoint = null;
let lines = [];

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const drawLineButton = document.getElementById('drawLineButton');
    const snapToGridButton = document.getElementById('snapToGridButton');
    const mouseCoordinates = document.getElementById('mouseCoordinates');

    initializeCanvas(ctx, lines);

    // Toggle "Draw Line" button
    drawLineButton.addEventListener('click', () => {
        isDrawingEnabled = !isDrawingEnabled;
        drawLineButton.style.backgroundColor = isDrawingEnabled ? '#4CAF50' : '';
        drawLineButton.textContent = isDrawingEnabled ? 'Drawing Enabled' : 'Draw Line';
    });

    // Toggle "Snap to Grid" button
    snapToGridButton.addEventListener('click', () => {
        isSnapToGridEnabled = !isSnapToGridEnabled;
        snapToGridButton.style.backgroundColor = isSnapToGridEnabled ? '#4CAF50' : '';
        snapToGridButton.textContent = isSnapToGridEnabled ? 'Snap Enabled' : 'Snap to Grid';
    });

    // Handle mousemove to show coordinates and live preview
    canvas.addEventListener('mousemove', (event) => {
        const mousePos = { x: event.offsetX, y: event.offsetY };
        mouseCoordinates.textContent = `X: ${mousePos.x}, Y: ${mousePos.y}`;

        if (isDrawingEnabled && isDrawing) {
            const snappedMousePos = isSnapToGridEnabled
                ? getNearestGridPoint(mousePos, 100) // Snap to nearest grid point
                : mousePos;
            drawCanvas(ctx, lines); // Redraw the canvas
            drawPreviewLine(ctx, startPoint, snappedMousePos); // Draw live preview
        }
    });

    // Handle mousedown to start or finish drawing a line
    canvas.addEventListener('mousedown', (event) => {
        if (isDrawingEnabled) {
            const mousePos = { x: event.offsetX, y: event.offsetY };
            const snappedMousePos = isSnapToGridEnabled
                ? getNearestGridPoint(mousePos, 100) // Snap to nearest grid point
                : mousePos;

            if (!isDrawing) {
                // Start drawing a new line
                startPoint = snappedMousePos;
                isDrawing = true;
            } else {
                // Finish drawing the line
                const endPoint = snappedMousePos;
                lines.push({ start: startPoint, end: endPoint });
                isDrawing = false;
                startPoint = null;
                drawCanvas(ctx, lines); // Redraw the canvas with the new line
            }
        }
    });
});