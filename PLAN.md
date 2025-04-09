# Plan to Preserve All Functionality

## Objective
Ensure that all existing functionality is preserved while implementing any new features or updates.

---

## Existing Functionalities
1. **Draw a Line**:
   - Users can draw a line by clicking to set the start and end points.
   - Live preview of the line is shown while drawing.

2. **Select a Line**:
   - Users can select a line by clicking on it in **Click to Draw** mode.
   - Grips are displayed at the start and end points of the selected line.
   - The properties window updates with the selected line's details.

3. **Delete a Line**:
   - Users can delete a selected line by pressing the `Delete` key.

4. **Snap to Grid**:
   - Users can enable **Snap to Grid** to snap points to the nearest grid intersection.
   - **Fix**: Ensure the line starts and ends at the nearest grid intersection when **Snap to Grid** is enabled.

5. **Snap to Midpoint**:
   - Users can enable **Snap to Midpoint** to snap points to the nearest midpoint of a line.

6. **Snap to Line Endpoint**:
   - Users can enable **Snap to Line Endpoint** to snap points to the nearest endpoint of a line.

7. **Combined Snapping**:
   - All snapping features (**Grid**, **Midpoint**, **Endpoint**) can be enabled simultaneously and work together with priority:
     1. Snap to Endpoint
     2. Snap to Midpoint
     3. Snap to Grid

8. **Grips Stay Visible**:
   - Grips remain visible on the selected line until another line is selected or a new line is drawn.

9. **Draggable Properties Window**:
   - The properties window can be dragged and repositioned.

10. **Display Line Length**:
    - The length of the selected line is displayed in the properties window.

11. **Hand Cursor on Line Hover**:
    - The cursor changes to a hand when hovering over a line to indicate it can be selected.

12. **Settings Menu**:
    - Users can customize default line properties (color, thickness, layer).

13. **Clear Canvas**:
    - Users can clear all lines and reset the canvas using the "Clear Canvas" button.

14. **Version Logging**:
    - Logs the app version in the console during initialization.

---

## Plan to Preserve and Integrate Functionality

### 1. Review Existing Code
- Ensure all existing functionality is implemented and working as expected.
- Verify that no functionality is overwritten or removed during updates.

### 2. Modularize Code
- Use modular functions for each feature (e.g., `getClickedLine`, `drawGrips`, `updatePropertiesWindow`) to ensure features are independent and reusable.

### 3. Prioritize Snapping Logic
- Ensure snapping features work together with the correct priority:
  1. **Snap to Endpoint** (highest priority).
  2. **Snap to Midpoint**.
  3. **Snap to Grid** (lowest priority).

### 4. Fix Snap to Grid in Click to Draw Mode
- Ensure that when **Snap to Grid** is enabled:
  - The line starts at the nearest grid intersection instead of the pointer.
  - The line ends at the nearest grid intersection.
  - Snapping should apply to both the start and end points of the line.

### 5. Maintain Grips Visibility
- Ensure grips remain visible for the selected line until:
  - Another line is selected.
  - A new line is drawn.

### 6. Test All Features
- Test each feature individually and in combination to ensure compatibility:
  - Drawing lines.
  - Selecting lines.
  - Snapping features.
  - Deleting lines.
  - Properties window updates.

### 7. Update Documentation
- Update the **Functionality Log** and **Changelog** to reflect the current state of the app and ensure all features are listed as "Works."

### 8. Version Control
- Increment the version number for every update to track changes (e.g., **Alpha 0.2.9 Stable**).

---

## Testing Checklist

### Drawing and Selection
- [ ] Draw a line with live preview.
- [ ] Select a line and display grips.
- [ ] Grips remain visible until another line is selected or a new line is drawn.

### Snapping
- [ ] Snap to Grid works as expected (line starts and ends at grid intersections).
- [ ] Snap to Midpoint works as expected.
- [ ] Snap to Endpoint works as expected.
- [ ] All snapping features work together with the correct priority.

### Combined Snapping
- [ ] Enable **Snap to Grid**, **Snap to Midpoint**, and **Snap to Endpoint** simultaneously and verify that they work together with the correct priority:
  1. Snap to Endpoint
  2. Snap to Midpoint
  3. Snap to Grid

### Properties Window
- [ ] Properties window updates with the selected line's details.
- [ ] Line length is displayed correctly.
- [ ] Properties window is draggable.

### Cursor
- [ ] Cursor changes to a hand when hovering over a line.

### Deleting
- [ ] Selected line can be deleted using the `Delete` key.

### Settings Menu
- [ ] Default line properties (color, thickness, layer) can be customized via the settings menu.
- [ ] New lines reflect the updated default properties.

### Clear Canvas
- [ ] All lines are removed, and the canvas is reset when the "Clear Canvas" button is clicked.
- [ ] The grid is redrawn after clearing the canvas.

---

## Summary
This plan ensures that all existing functionality is preserved while fixing the **Snap to Grid** issue in **Click to Draw** mode. Each feature will be tested individually and in combination to ensure compatibility.

---

## Version
**Alpha 0.2.9 Stable**