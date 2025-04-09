export function initializePropertiesWindow() {
    const propertiesWindow = document.getElementById('propertiesWindow');
    const closeButton = document.getElementById('closePropertiesButton');

    closeButton.addEventListener('click', () => {
        propertiesWindow.style.display = 'none';
    });
}

export function updatePropertiesWindow(line) {
    if (line) {
        document.getElementById('startX').textContent = line.start.x;
        document.getElementById('startY').textContent = line.start.y;
        document.getElementById('endX').textContent = line.end.x;
        document.getElementById('endY').textContent = line.end.y;

        const dx = line.end.x - line.start.x;
        const dy = line.end.y - line.start.y;
        const length = Math.sqrt(dx * dx + dy * dy).toFixed(2);
        document.getElementById('lineLength').textContent = length;
    }
}