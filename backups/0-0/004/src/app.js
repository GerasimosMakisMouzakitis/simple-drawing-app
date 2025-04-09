/**
 * Simple Drawing App
 * Version: Alpha 0.0.4
 * Author: Gerasimos Makis Mouzakitis
 * Last Update: April 5, 2025
 * Copyright (c) 2025 Gerasimos Makis Mouzakitis. All rights reserved.
 */

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let lines = []; // Store all drawn lines
let isDrawing = false;
let startPoint = null;
let selectedLine = null; // Store the currently selected line

// Handle mouse down event
canvas.addEventListener('mousedown', (event) => {
    const mousePos = { x: event.offsetX, y: event.offsetY };

    if (!isDrawing) {
        // Check if a line is clicked
        selectedLine = getClickedLine(mousePos);
        if (selectedLine) {
            drawCanvas(); // Redraw the canvas
            drawGrips(selectedLine); // Draw grips on the selected line
        } else {
            // Start drawing a new line
            startPoint = mousePos;
            isDrawing = true;
        }
    } else {
        // Finish drawing the line
        const endPoint = mousePos;
        lines.push({ start: startPoint, end: endPoint });
        isDrawing = false;
        startPoint = null;
        drawCanvas();
    }
});

// Handle mouse move event
canvas.addEventListener('mousemove', (event) => {
    const mousePos = { x: event.offsetX, y: event.offsetY };

    if (isDrawing && startPoint) {
        const currentPoint = { x: event.offsetX, y: event.offsetY };
        drawCanvas(); // Redraw the canvas
        drawLine(startPoint, currentPoint, true); // Draw the temporary line
    } else {
        // Check if the mouse is near any line
        const hoveredLine = getHoveredLine(mousePos);
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
        selectedLine = null;
        drawCanvas(); // Redraw the canvas
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach((line) => drawLine(line.start, line.end));
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

// Function to check if the mouse is near a line
function getHoveredLine(mousePos) {
    const tolerance = 5; // Tolerance for detecting hover near a line
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