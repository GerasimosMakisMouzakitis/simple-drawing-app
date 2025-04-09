import { drawGrips } from './utils.js';

export function initializeLineSelection() {
    canvas.addEventListener('mousedown', (event) => {
        const mousePos = { x: event.offsetX, y: event.offsetY };
        const clickedLine = getClickedLine(mousePos);

        if (clickedLine) {
            selectedLine = clickedLine;
            drawCanvas();
        }
    });
}