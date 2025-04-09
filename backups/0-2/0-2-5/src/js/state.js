export const state = {
    lines: [], // Stores all drawn lines
    selectedLine: null, // Currently selected line
    isDrawingEnabled: false, // Whether drawing mode is enabled
    isSnapToGridEnabled: false, // Whether snap-to-grid is enabled
    currentMousePosition: null, // Temporary end point for line preview
};

// Toggle drawing mode
export function toggleDrawingMode() {
    state.isDrawingEnabled = !state.isDrawingEnabled;
    return state.isDrawingEnabled;
}

// Toggle snap-to-grid mode
export function toggleSnapToGrid() {
    state.isSnapToGridEnabled = !state.isSnapToGridEnabled;
    return state.isSnapToGridEnabled;
}

// Clear all lines
export function clearLines() {
    state.lines = [];
}

// Add a new line to the state
export function addLine(line) {
    state.lines.push(line);
    console.log(`Line added: Start (${line.start.x}, ${line.start.y}), End (${line.end.x}, ${line.end.y})`);
}

// Get all lines
export function getLines() {
    return state.lines;
}