import { initializeCanvas } from './canvas.js'; // Handles canvas initialization and drawing
import { setupEventListeners } from './events.js'; // Handles user interactions
import { state } from './state.js'; // Import state to log initial button states
import { appConfig } from './config.js'; // Import app metadata

// Log app metadata
console.log('App Information:');
console.log(`- Title: ${appConfig.title}`);
console.log(`- Author: ${appConfig.author}`);
console.log(`- Version: ${appConfig.version}`);
console.log(`- Date Created: ${appConfig.dateCreated}`);
console.log(`- Last Update: ${appConfig.lastUpdate}`);

// Get the canvas element and its context
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// 1. Log the initial button states before anything else
console.log('Initial button states:');
console.log(`- Draw Line: ${state.isDrawingEnabled}`);
console.log(`- Snap to Grid: ${state.isSnapToGridEnabled}`);
console.log(`- Clear Canvas: Ready to clear the canvas.`);

// 2. Set up event listeners for buttons and canvas interactions
setupEventListeners(canvas, ctx); // This will now run and log "Canvas is loading..."

// 3. Initialize the canvas (draw grid and prepare for drawing)
initializeCanvas(ctx); // This will now run and log "Canvas initialized and grid drawn."