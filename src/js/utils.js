/*
 * Copyright (c) 2025 Gerasimos Makis Mouzakitis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function drawGrid(ctx, width, height) {
    console.log('Drawing grid...');
    const gridSize = 100;
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    console.log('Grid drawn successfully.');
}

export function drawLine(ctx, start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

export function getNearestGridPoint(point, gridSize) {
    const snappedX = Math.round(point.x / gridSize) * gridSize;
    const snappedY = Math.round(point.y / gridSize) * gridSize;
    return { x: snappedX, y: snappedY };
}

export function getClickedLine(mousePos, lines) {
    const tolerance = 5; // Tolerance for detecting a click near a line

    for (const line of lines) {
        const { start, end } = line;
        const distance = pointToLineDistance(mousePos, start, end);

        if (distance <= tolerance) {
            return line; // Return the clicked line
        }
    }

    return null; // No line was clicked
}

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