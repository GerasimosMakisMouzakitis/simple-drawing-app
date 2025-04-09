# Simple Drawing App

**Version:** Alpha 0.2.9 Stable  
**Author:** Gerasimos Makis Mouzakitis  
**Last Update:** April 8, 2025  

This is a simple drawing application that allows users to draw lines on a canvas, select them, and view their properties.

## Features
- Draw a line between two points by clicking on the canvas.
- Dynamic line preview while drawing.
- Each line has the following properties:
  - **Type**: The type of the line (default: `line`).
  - **Color**: The color of the line (default: `black`).
  - **Layer**: The layer of the line (default: `default`).
  - **Start Point**: The coordinates of the starting point.
  - **End Point**: The coordinates of the ending point.
  - **Thickness**: The thickness of the line (default: `2`).
- Snap to Grid functionality to align lines to a grid.
- Clear Canvas button to remove all lines and reset the canvas.

## Changelog

### Version Alpha 0.2.9 Stable
- Updated version logging to reflect the stable release.
- Improved logging for start and end points of lines.
- Removed unnecessary logs for preview lines.
- Ensured consistent functionality for snapping to grid and clearing the canvas.

## Project Structure

```
simple-drawing-app
├── src
│   ├── index.html       # HTML structure of the application
│   ├── styles.css       # Styles for the application
│   ├── js
│   │   ├── app.js       # Main JavaScript file for initializing the app
│   │   ├── canvas.js    # Handles canvas rendering and drawing
│   │   ├── events.js    # Manages user interactions and event listeners
│   │   ├── state.js     # Manages application state
│   │   └── config.js    # Stores app configuration and default settings
├── CHANGELOG.md         # Log of changes made to the project
├── FUNCTIONALITY_LOG.md # Log of implemented functionalities
└── README.md            # Documentation for the project
```

## Getting Started

To get started with the Simple Drawing App, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd simple-drawing-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Open the application**:
   Open `src/index.html` in your web browser to view and use the application.

## Usage

- Click on the canvas to set point A.
- Move the mouse and click again to set point B.
- A line will be drawn between the two points.

## TODO

- [ ] Add functionality to undo/redo actions.
- [ ] Allow users to save the canvas as an image.
- [ ] Add support for multiple shapes (e.g., rectangles, circles).
- [ ] Implement a settings menu for customizing grid size and line properties.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the application.

## License

This project is licensed under the MIT License.