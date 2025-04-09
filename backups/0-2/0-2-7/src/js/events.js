import { state, addLine } from './state.js';
import { drawCanvas } from './canvas.js';

export function setupEventListeners(canvas, ctx) {
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
    let suppressPreviewLog = false; // Flag to suppress preview log

    canvas.addEventListener('mousedown', (event) => {
        if (!state.isDrawingEnabled) return; // Only allow drawing if enabled
        const rect = canvas.getBoundingClientRect();
        const currentPoint = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

        if (!startPoint) {
            // First click: Set the start point
            console.log('First Click (Set Start Point):');
            startPoint = currentPoint;
            console.log(`Line start point set: (${startPoint.x}, ${startPoint.y})`);
        } else {
            // Second click: Set the end point and finalize the line
            console.log('Second Click (Set End Point):');
            const endPoint = currentPoint;
            console.log(`Line end point set: (${endPoint.x}, ${endPoint.y})`);

            // Add the line to the state with default properties
            addLine({
                start: startPoint,
                end: endPoint,
                color: 'black', // Default color
                layer: 'default', // Default layer
                thickness: 2, // Default thickness
            });

            // Clear the preview line and redraw the canvas
            state.currentMousePosition = null; // Clear the preview line
            suppressPreviewLog = true; // Suppress the preview log for this click
            drawCanvas(ctx); // Redraw the canvas
            startPoint = null; // Reset the start point
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        if (!state.isDrawingEnabled || !startPoint) return; // Only allow preview if drawing is enabled
        if (suppressPreviewLog) {
            suppressPreviewLog = false; // Reset the flag after suppressing the log
            return;
        }
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