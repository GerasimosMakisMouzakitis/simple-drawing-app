# Changelog

All notable changes to this project will be documented in this file.

## [Alpha 0.2.10] - 2025-04-08
### Added
- Updated version metadata in `index.html` and `config.js`.
- Improved metadata for SEO and social media sharing.

## [Alpha 0.2.9 Stable] - 2025-04-08
### Added
- Added version logging to reflect the stable release.
- Improved logging for start and end points of lines.
- Added a settings menu to customize default line properties (color, thickness, layer).
- Added a "Clear Canvas" button to remove all lines and reset the canvas.
- Added snapping features:
  - Snap to Grid
  - Snap to Midpoint
  - Snap to Endpoint
- Added dynamic line preview while drawing.

### Fixed
- Removed unnecessary logs for preview lines.
- Ensured consistent functionality for snapping, selection, and drawing.
- Fixed issues with canvas not redrawing correctly after clearing.

---

## [Alpha 0.0.7] - 2025-04-05
### Added
- Added functionality to delete a selected line by pressing the `Delete` key.
- Added a properties window to display the coordinates of the selected line.
- Properties window dynamically updates when a new line is selected.
- Properties window clears when no line is selected or the selected line is deleted.

### Fixed
- Ensured the canvas redraws correctly after deleting a line.

---

## [Alpha 0.0.4] - 2025-04-05
### Added
- Initial version of the Simple Drawing App.
- Functionality to draw a line between two points.
- Dynamic line preview while drawing.
- Ability to select a line and display grips at its endpoints.
- Cursor changes to a hand when hovering over a line.
