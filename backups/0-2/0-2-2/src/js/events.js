import { state, toggleDrawingMode, toggleSnapToGrid, clearLines } from './state.js';
import { drawCanvas } from './canvas.js';

export function setupEventListeners(canvas, ctx) {
    console.log('Event Listeners Setup:'); // Log before setting up event listeners
    console.log('Canvas is loading...'); // Log when the canvas starts loading

    // Handle Clear Canvas button
    const clearCanvasButton = document.getElementById('clearCanvasButton');
    clearCanvasButton.addEventListener('click', () => {
        console.log('Clear Canvas button clicked.');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        clearLines(); // Clear all drawn lines in the state
        drawCanvas(ctx); // Redraw the grid
        console.log('Canvas cleared and grid redrawn.');
    });

    // Handle Snap to Grid button
    const snapToGridButton = document.getElementById('snapToGridButton');
    snapToGridButton.addEventListener('click', () => {
        const isSnapToGridEnabled = toggleSnapToGrid(); // Toggle snap-to-grid in the state
        snapToGridButton.style.backgroundColor = isSnapToGridEnabled ? '#4CAF50' : '';
        console.log(`Snap to Grid toggled: ${isSnapToGridEnabled}`);
    });

    // Handle Draw Line button
    const drawLineButton = document.getElementById('drawLineButton');
    drawLineButton.addEventListener('click', () => {
        const isDrawingEnabled = toggleDrawingMode(); // Toggle drawing mode in the state
        drawLineButton.style.backgroundColor = isDrawingEnabled ? '#4CAF50' : '';
        console.log(`Drawing Mode toggled: ${isDrawingEnabled}`);
    });

    console.log('Canvas event listeners set up.'); // Log when event listeners are ready
}