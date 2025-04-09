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
const snapToMidpointCheckbox = document.getElementById('snapToMidpointCheckbox');
const snapToEndpointCheckbox = document.getElementById('snapToEndpointCheckbox');

let lines = []; // Store all drawn lines
let isDrawing = false;
let startPoint = null;
let selectedLine = null; // Store the currently selected line
let currentMousePos = null; // Track the current mouse position for live preview
let snapToGridEnabled = false; // Track whether Snap to Grid is enabled
let highlightedGridPoint = null; // Store the currently highlighted grid point
let snapToMidpointEnabled = false; // Track whether Snap to Midpoint is enabled
let highlightedMidpoint = null; // Store the currently highlighted midpoint
let snapToEndpointEnabled = false; // Track whether Snap to Line Endpoint is enabled
let highlightedEndpoint = null; // Store the currently highlighted endpoint

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

// Toggle Snap to Midpoint functionality
snapToMidpointCheckbox.addEventListener('change', (event) => {
    snapToMidpointEnabled = event.target.checked;
    drawCanvas(); // Redraw the canvas to reflect changes
});

// Toggle Snap to Line Endpoint functionality
snapToEndpointCheckbox.addEventListener('change', (event) => {
    snapToEndpointEnabled = event.target.checked;
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

// Calculate the midpoint of a line
function getLineMidpoint(line) {
    return {
        x: (line.start.x + line.end.x) / 2,
        y: (line.start.y + line.end.y) / 2,
    };
}

// Find the nearest midpoint to the mouse position
function getNearestMidpoint(mouseX, mouseY) {
    let nearestMidpoint = null;
    let minDistance = Infinity;

    lines.forEach((line) => {
        const midpoint = getLineMidpoint(line);
        const distance = Math.sqrt(
            Math.pow(midpoint.x - mouseX, 2) + Math.pow(midpoint.y - mouseY, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearestMidpoint = midpoint;
        }
    });

    return nearestMidpoint;
}

// Highlight the nearest midpoint
function highlightMidpoint(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI); // Draw a small circle at the midpoint
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

// Find the nearest line endpoint to the mouse position
function getNearestEndpoint(mouseX, mouseY) {
    let nearestEndpoint = null;
    let minDistance = Infinity;

    lines.forEach((line) => {
        // Check both the start and end points of the line
        const endpoints = [line.start, line.end];
        endpoints.forEach((endpoint) => {
            const distance = Math.sqrt(
                Math.pow(endpoint.x - mouseX, 2) + Math.pow(endpoint.y - mouseY, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearestEndpoint = endpoint;
            }
        });
    });

    return nearestEndpoint;
}

// Highlight the nearest endpoint
function highlightEndpoint(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI); // Draw a small circle at the endpoint
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

// Handle mouse move event for live preview
canvas.addEventListener('mousemove', (event) => {
    const mousePos = { x: event.offsetX, y: event.offsetY };

    // Check if the mouse is near any line
    const hoveredLine = getClickedLine(mousePos);

    if (hoveredLine) {
        canvas.style.cursor = 'pointer'; // Change cursor to hand (pointer)
    } else {
        canvas.style.cursor = 'default'; // Reset cursor to default
    }

    let snappedPoint = null;

    // Prioritize snapping to endpoint
    if (snapToEndpointEnabled) {
        const nearestEndpoint = getNearestEndpoint(mousePos.x, mousePos.y);
        if (nearestEndpoint) {
            snappedPoint = nearestEndpoint;
            highlightedEndpoint = nearestEndpoint;
        } else {
            highlightedEndpoint = null;
        }
    }

    // If no endpoint is snapped, check for midpoint
    if (!snappedPoint && snapToMidpointEnabled) {
        const nearestMidpoint = getNearestMidpoint(mousePos.x, mousePos.y);
        if (nearestMidpoint) {
            snappedPoint = nearestMidpoint;
            highlightedMidpoint = nearestMidpoint;
        } else {
            highlightedMidpoint = null;
        }
    }

    // If no endpoint or midpoint is snapped, check for grid point
    if (!snappedPoint && snapToGridEnabled) {
        const nearestGridPoint = getNearestGridPoint(mousePos.x, mousePos.y);
        if (nearestGridPoint) {
            snappedPoint = nearestGridPoint;
            highlightedGridPoint = nearestGridPoint;
        } else {
            highlightedGridPoint = null;
        }
    }

    drawCanvas(); // Redraw the canvas

    // Highlight the snapped point
    if (highlightedEndpoint) {
        highlightEndpoint(highlightedEndpoint);
    } else if (highlightedMidpoint) {
        highlightMidpoint(highlightedMidpoint);
    } else if (highlightedGridPoint) {
        highlightGridPoint(highlightedGridPoint);
    }

    if (drawingModeMenu.value === 'click' && isDrawing) {
        // Clear the canvas and redraw everything
        drawCanvas();

        // Draw a temporary line from the start point to the current mouse position
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.strokeStyle = 'gray'; // Use a different color for the preview
        ctx.lineWidth = 1; // Make the preview line thinner
        ctx.stroke();
        ctx.closePath();
    }
});

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
        } else if (!isDrawing) {
            // Start drawing a new line
            startPoint = mousePos;
            isDrawing = true;
        } else {
            // Finish drawing the line
            const endPoint = mousePos;
            lines.push({ start: startPoint, end: endPoint });
            isDrawing = false;
            startPoint = null;
            drawCanvas(); // Redraw the canvas
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
    if (highlightedMidpoint) {
        highlightMidpoint(highlightedMidpoint); // Highlight the midpoint if Snap to Midpoint is enabled
    }
    if (highlightedEndpoint) {
        highlightEndpoint(highlightedEndpoint); // Highlight the endpoint if Snap to Line Endpoint is enabled
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

        // Calculate and display the length of the line
        const dx = selectedLine.end.x - selectedLine.start.x;
        const dy = selectedLine.end.y - selectedLine.start.y;
        const length = Math.sqrt(dx * dx + dy * dy).toFixed(2); // Round to 2 decimal places
        document.getElementById('lineLength').textContent = length;
    } else {
        startXElement.textContent = '-';
        startYElement.textContent = '-';
        endXElement.textContent = '-';
        endYElement.textContent = '-';
        document.getElementById('lineLength').textContent = '-';
    }
}

// Initial draw
drawCanvas();