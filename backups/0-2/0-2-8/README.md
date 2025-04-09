# Simple Drawing App

**Version:** Alpha 0.2.6  
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
- Select a line by clicking on it; grips appear at the start and end points.
- Delete a selected line by pressing the `Delete` key.
- Cursor changes to a hand when hovering over a line.
- View the properties (start and end coordinates) of the selected line in a properties window.
- Properties window dynamically updates when a new line is selected.
- Properties window clears when no line is selected or the selected line is deleted.

## Project Structure

```
simple-drawing-app
├── src
│   ├── [index.html](http://_vscodecontentref_/0)      # HTML structure of the application
│   ├── styles.css      # Styles for the application
│   └── app.js          # JavaScript code for drawing lines and managing interactions
├── CHANGELOG.md        # Log of changes made to the project
├── FUNCTIONALITY_LOG.md # Log of implemented functionalities
└── README.md           # Documentation for the project
```

## Getting Started

To get started with the Simple Drawing App, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd simple-drawing-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Open the application**:
   Open `src/index.html` in your web browser to view and use the application.

## Usage

- Click on the canvas to set point A.
- Move the mouse and click again to set point B.
- A line will be drawn between the two points.

## TODO

- [ ] Add functionality to clear the canvas.
- [ ] Allow users to change the line color.
- [ ] Add support for drawing multiple lines.
- [ ] Implement undo/redo functionality.
- [ ] Add a save option to export the canvas as an image.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the application.

## License

This project is licensed under the MIT License.