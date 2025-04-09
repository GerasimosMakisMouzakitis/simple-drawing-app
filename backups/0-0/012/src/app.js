/**
 * Simple Drawing App
 * Version: Alpha 0.0.10
 * Author: Gerasimos Makis Mouzakitis
 * Last Update: April 6, 2025
 */

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const drawingModeMenu = document.getElementById('drawingMode');
const coordinateForm = document.getElementById('coordinateForm');
const drawLineButton = document.getElementById('drawLineButton');
const startXInput = document.getElementById('startXInput');
const startYInput = document.getElementById('startYInput');
const endXInput = document.getElementById('endXInput');
const endYInput = document.getElementById('endYInput');
const propertiesWindow = document.getElementById('propertiesWindow');
const showPropertiesButton = document.getElementById('showPropertiesButton');
const closePropertiesButton = document.getElementById('closePropertiesButton');
const startXElement = document.getElementById('startX');
const startYElement = document.getElementById('startY');
const endXElement = document.getElementById('endX');
const endYElement = document.getElementById('endY');
const snapToGridCheckbox = document.getElementById('snapToGridCheckbox');

let lines = []; // Store all drawn lines
let isDrawing = false;
let startPoint = null;
let selectedLine = null; // Store the currently selected line
let currentMousePos = null; // Track the current mouse position for live preview
let snapToGridEnabled = false; // Track whether Snap to Grid is enabled
let highlightedGridPoint = null; // Store the currently highlighted grid point

// Draggable properties window
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Draw the grid on the canvas
function drawGrid() {
    const gridSize = 100; // Each grid square is 100x100 pixels
    const canvasSize = canvas.width; // Canvas is 1000x1000 pixels

    ctx.clearRect(0, 0, canvasSize, canvasSize); // Clear the canvas

    ctx.strokeStyle = '#e0e0e0'; // Light gray for grid lines
    ctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = 0; x <= canvasSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasSize);
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= canvasSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasSize, y);
        ctx.stroke();
    }
}

// Enable dragging for the properties window
propertiesWindow.addEventListener('mousedown', (event) => {
    isDragging = true;
    dragOffsetX = event.clientX - propertiesWindow.offsetLeft;
    dragOffsetY = event.clientY - propertiesWindow.offsetTop;
    propertiesWindow.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        propertiesWindow.style.left = `${event.clientX - dragOffsetX}px`;
        propertiesWindow.style.top = `${event.clientY - dragOffsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    propertiesWindow.style.cursor = 'move';
});

// Handle drawing mode change
drawingModeMenu.addEventListener('change', (event) => {
    const mode = event.target.value;
    if (mode === 'coordinates') {
        coordinateForm.style.display = 'block';
    } else {
        coordinateForm.style.display = 'none';
    }
});

// Handle drawing a line by coordinates
drawLineButton.addEventListener('click', () => {
    const startX = parseInt(startXInput.value, 10);
    const startY = parseInt(startYInput.value, 10);
    const endX = parseInt(endXInput.value, 10);
    const endY = parseInt(endYInput.value, 10);

    if (!isNaN(startX) && !isNaN(startY) && !isNaN(endX) && !isNaN(endY)) {
        const line = { start: { x: startX, y: startY }, end: { x: endX, y: endY } };
        lines.push(line);
        drawCanvas();
    } else {
        alert('Please enter valid coordinates.');
    }
});

// Toggle Snap to Grid functionality
snapToGridCheckbox.addEventListener('change', (event) => {
    snapToGridEnabled = event.target.checked;
    drawCanvas(); // Redraw the canvas to reflect changes
});

// Calculate the nearest grid point to the mouse position
function getNearestGridPoint(mouseX, mouseY) {
    const gridSize = 100; // Grid square size
    const nearestX = Math.round(mouseX / gridSize) * gridSize;
    const nearestY = Math.round(mouseY / gridSize) * gridSize;
    return { x: nearestX, y: nearestY };
}

// Highlight the nearest grid point
function highlightGridPoint(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI); // Draw a small circle at the grid point
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

// Handle mouse down event for "Click to Draw" mode
canvas.addEventListener('mousedown', (event) => {
    const mousePos = { x: event.offsetX, y: event.offsetY };

    if (drawingModeMenu.value === 'click') {
        // Check if a line is clicked
        selectedLine = getClickedLine(mousePos);
        if (selectedLine) {
            drawCanvas(); // Redraw the canvas
            drawGrips(selectedLine); // Draw grips on the selected line
            updatePropertiesWindow(); // Update the properties window

            // Trigger the "Show Properties" button programmatically
            showPropertiesButton.click();
        } else if (snapToGridEnabled && highlightedGridPoint) {
            // Use the highlighted grid point as the start or end point
            if (!isDrawing) {
                startPoint = highlightedGridPoint;
                isDrawing = true;
            } else {
                const endPoint = highlightedGridPoint;
                lines.push({ start: startPoint, end: endPoint });
                isDrawing = false;
                startPoint = null;
                drawCanvas(); // Redraw the canvas
            }
        } else {
            // Default behavior without Snap to Grid
            if (!isDrawing) {
                startPoint = mousePos;
                isDrawing = true;
            } else {
                const endPoint = mousePos;
                lines.push({ start: startPoint, end: endPoint });
                isDrawing = false;
                startPoint = null;
                currentMousePos = null; // Clear the live preview
                drawCanvas();
            }
        }
    } else {
        // Allow selecting a line in any mode
        selectedLine = getClickedLine(mousePos);
        if (selectedLine) {
            drawCanvas(); // Redraw the canvas
            drawGrips(selectedLine); // Draw grips on the selected line
            updatePropertiesWindow(); // Update the properties window

            // Trigger the "Show Properties" button programmatically
            showPropertiesButton.click();
        }
    }
});

// Show the properties window when the "Show Properties" button is clicked
showPropertiesButton.addEventListener('click', () => {
    propertiesWindow.style.display = 'block'; // Show the properties window
});

// Close the properties window when the "Close" button is clicked
closePropertiesButton.addEventListener('click', () => {
    propertiesWindow.style.display = 'none'; // Hide the properties window
    selectedLine = null; // Clear the selected line
    drawCanvas(); // Redraw the canvas to remove grips
});

// Handle mouse move event for live preview
canvas.addEventListener('mousemove', (event) => {
    const mousePos = { x: event.offsetX, y: event.offsetY };

    if (snapToGridEnabled) {
        // Calculate and highlight the nearest grid point
        highlightedGridPoint = getNearestGridPoint(mousePos.x, mousePos.y);
        drawCanvas(); // Redraw the canvas
        highlightGridPoint(highlightedGridPoint); // Highlight the grid point
    } else {
        highlightedGridPoint = null; // Clear the highlighted point
        drawCanvas(); // Redraw the canvas
    }

    if (isDrawing && startPoint) {
        // Update the current mouse position for live preview
        currentMousePos = mousePos;
        drawCanvas(); // Redraw the canvas
        drawLine(startPoint, currentMousePos, true); // Draw the temporary line
    } else {
        // Reset the cursor style if not drawing
        const hoveredLine = getClickedLine(mousePos);
        if (hoveredLine) {
            canvas.style.cursor = 'pointer'; // Change cursor to hand
        } else {
            canvas.style.cursor = 'default'; // Reset cursor
        }
    }
});

// Handle keydown event for deleting the selected line
document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' && selectedLine) {
        // Remove the selected line from the array
        lines = lines.filter((line) => line !== selectedLine);
        selectedLine = null; // Clear the selection
        drawCanvas(); // Redraw the canvas
        updatePropertiesWindow(); // Clear the properties window
    }
});

// Function to draw a line
function drawLine(start, end, isTemporary = false) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = isTemporary ? 'gray' : 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Function to redraw the entire canvas
function drawCanvas() {
    drawGrid(); // Draw the grid first
    lines.forEach((line) => drawLine(line.start, line.end)); // Draw all lines
    if (highlightedGridPoint) {
        highlightGridPoint(highlightedGridPoint); // Highlight the grid point if Snap to Grid is enabled
    }
}

// Function to check if a line is clicked
function getClickedLine(mousePos) {
    const tolerance = 5; // Tolerance for clicking near a line
    for (const line of lines) {
        const distance = pointToLineDistance(mousePos, line.start, line.end);
        if (distance <= tolerance) {
            return line;
        }
    }
    return null;
}

// Function to calculate the distance from a point to a line segment
function pointToLineDistance(point, lineStart, lineEnd) {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    const param = lenSq !== 0 ? dot / lenSq : -1;

    let nearestX, nearestY;

    if (param < 0) {
        nearestX = lineStart.x;
        nearestY = lineStart.y;
    } else if (param > 1) {
        nearestX = lineEnd.x;
        nearestY = lineEnd.y;
    } else {
        nearestX = lineStart.x + param * C;
        nearestY = lineStart.y + param * D;
    }

    const dx = point.x - nearestX;
    const dy = point.y - nearestY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Function to draw grips on the selected line
function drawGrips(line) {
    const gripSize = 6;
    ctx.fillStyle = 'red';

    // Draw grip at the start point
    ctx.fillRect(line.start.x - gripSize / 2, line.start.y - gripSize / 2, gripSize, gripSize);

    // Draw grip at the end point
    ctx.fillRect(line.end.x - gripSize / 2, line.end.y - gripSize / 2, gripSize, gripSize);
}

// Function to update the properties window
function updatePropertiesWindow() {
    if (selectedLine) {
        startXElement.textContent = selectedLine.start.x;
        startYElement.textContent = selectedLine.start.y;
        endXElement.textContent = selectedLine.end.x;
        endYElement.textContent = selectedLine.end.y;
    } else {
        startXElement.textContent = '-';
        startYElement.textContent = '-';
        endXElement.textContent = '-';
        endYElement.textContent = '-';
    }
}

// Initial draw
drawCanvas();