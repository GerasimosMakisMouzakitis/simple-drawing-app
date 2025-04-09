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

### 4. Maintain Grips Visibility
- Ensure grips remain visible for the selected line until:
  - Another line is selected.
  - A new line is drawn.

### 5. Test All Features
- Test each feature individually and in combination to ensure compatibility:
  - Drawing lines.
  - Selecting lines.
  - Snapping features.
  - Deleting lines.
  - Properties window updates.

### 6. Update Documentation
- Update the **Functionality Log** to reflect the current state of the app and ensure all features are listed as "Works."

### 7. Version Control
- Increment the version number for every update to track changes (e.g., **Alpha 0.0.16**).

---

## Testing Checklist

### Drawing and Selection
- [ ] Draw a line with live preview.
- [ ] Select a line and display grips.
- [ ] Grips remain visible until another line is selected or a new line is drawn.

### Snapping
- [ ] Snap to Grid works as expected.
- [ ] Snap to Midpoint works as expected.
- [ ] Snap to Endpoint works as expected.
- [ ] All snapping features work together with the correct priority.

### Properties Window
- [ ] Properties window updates with the selected line's details.
- [ ] Line length is displayed correctly.
- [ ] Properties window is draggable.

### Cursor
- [ ] Cursor changes to a hand when hovering over a line.

### Deleting
- [ ] Selected line can be deleted using the `Delete` key.

---

## Summary
This plan ensures that all existing functionality is preserved while allowing for future updates. Each feature will be tested individually and in combination to ensure compatibility.