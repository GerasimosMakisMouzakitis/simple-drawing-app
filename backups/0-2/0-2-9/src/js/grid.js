export function drawGrid(ctx, width, height) {
    const gridSize = 100; // Size of each grid square
    ctx.strokeStyle = '#e0e0e0'; // Light gray color for the grid lines
    ctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}