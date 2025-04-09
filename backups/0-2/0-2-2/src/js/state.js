export const state = {
    lines: [], // Stores all drawn lines
    selectedLine: null, // Currently selected line
    isDrawingEnabled: false, // Whether drawing mode is enabled
    isSnapToGridEnabled: false, // Whether snap-to-grid is enabled
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

// Add a new line
export function addLine(line) {
    state.lines.push(line);
}

// Get all lines
export function getLines() {
    return state.lines;
}