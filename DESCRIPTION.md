# Simple Drawing App - Description

## Overview
The **Simple Drawing App** is a lightweight, browser-based application designed for drawing and managing lines on a canvas. It provides intuitive tools for snapping, selection, and customization, making it ideal for quick sketches, prototyping, or educational purposes.

---

## Features
1. **Line Drawing**:
   - Draw lines by clicking to set the start and end points.
   - Live preview of the line while drawing.

2. **Snapping**:
   - Snap to Grid: Align points to the nearest grid intersection.
   - Snap to Midpoint: Snap points to the midpoint of existing lines.
   - Snap to Endpoint: Snap points to the endpoints of existing lines.
   - Combined snapping with priority:
     1. Snap to Endpoint
     2. Snap to Midpoint
     3. Snap to Grid

3. **Line Selection**:
   - Select lines by clicking on them.
   - Display grips at the start and end points of the selected line.
   - Highlight the selected line for better visibility.

4. **Properties Window**:
   - View and edit line properties:
     - Start Point
     - End Point
     - Color
     - Thickness
     - Layer
   - Dynamically updates when a new line is selected.
   - Draggable for better usability.

5. **Settings Menu**:
   - Customize default line properties:
     - Default Color
     - Default Thickness
     - Default Layer

6. **Clear Canvas**:
   - Remove all lines and reset the canvas with a single click.
   - Automatically redraws the grid.

7. **Version Logging**:
   - Logs the app version in the console during initialization.

---

## Technical Details
- **Canvas-Based Drawing**:
  - Uses the HTML5 `<canvas>` element for rendering lines and grid.
- **Snapping Logic**:
  - Implements snapping features using custom algorithms for grid, midpoint, and endpoint snapping.
- **State Management**:
  - Manages lines, snapping states, and default settings using a centralized state object.
- **Modular Design**:
  - Organized into reusable modules:
    - `canvas.js`: Handles canvas rendering and drawing.
    - `events.js`: Manages user interactions and event listeners.
    - `state.js`: Manages application state.
    - `config.js`: Stores default settings and configurations.

---

## Future Enhancements
- Add undo/redo functionality.
- Support for additional shapes (e.g., rectangles, circles).
- Save and export the canvas as an image.
- Add grid size customization in the settings menu.

---

## License
This project is licensed under the Apache License 2.0. See the LICENSE file for details.

### Copyright Notice
Copyright (c) 2025 Gerasimos Makis Mouzakitis

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.