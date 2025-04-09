export function initializeCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Canvas context is not initialized.');
        return;
    }

    console.log('Canvas initialized successfully.');

    // Clear the canvas and set up the initial state
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('Canvas cleared.');

    // Draw a test line from (100, 100) to (200, 200)
    console.log('Drawing test line...');
    drawTestLine(ctx, { x: 100, y: 100 }, { x: 200, y: 200 });
}

function drawTestLine(ctx, start, end) {
    console.log(`Drawing line from (${start.x}, ${start.y}) to (${end.x}, ${end.y})`);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    console.log('Test line drawn successfully.');
}