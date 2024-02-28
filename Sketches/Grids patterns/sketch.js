// Basics
function setup() {
  createCanvas(800, 800, SVG);
  noLoop()
  colorMode(HSL)
}

let gridSize = 100; // Define the size of the grid squares
let inset = 200; // Define the inset from the canvas
let rows, cols; // Declare rows and cols variables

function blankPattern(x, y, size) {
  // Do nothing
}

// Define pattern functions
function pattern1(x, y, size) {
  // Draw vertical lines
  let linesPerSquare = 20;
  let lineSpacing = size / linesPerSquare;
  let arcHeight = size / (2 * linesPerSquare); // Calculate the height of the arcs
  stroke("green"); // Set the color of the lines
  strokeWeight(1); // Set the thickness of the lines
  let prevLine = null; // Keep track of the previous line's points
  for (let k = 0; k < linesPerSquare; k++) {
    let lineX = x + k * lineSpacing;
    let lineLength = size - 2 * arcHeight; // Shorten the line length by twice the height of the arc
    if (k === 0 || k === linesPerSquare - 1) { // If this is the first or last line
      lineLength = size - arcHeight; // Shorten the line length by the height of the arc at the top only
    }
    line(lineX, y + arcHeight, lineX, y + arcHeight + lineLength);
    if (prevLine) {
      // Draw an arc from the previous line's end point to the current line's start point
      let startAngle = k % 2 === 0 ? 0 : PI;
      let arcY = k % 2 === 0 ? y + size - arcHeight : y + arcHeight;
      if (k === linesPerSquare - 1) { // If this is the last line
        arcY = y + size - lineLength; // Set the arcY to the end of the grid minus the arc height
        startAngle = PI; // Set the start angle to PI to draw the arc at the bottom
      }
      arc((prevLine.x + lineX) / 2, arcY, abs(prevLine.x - lineX), arcHeight * 2, startAngle, startAngle + PI);
    }
    prevLine = {x: lineX, y: y + arcHeight + lineLength}; // Update the previous line's points
  }
}

// Define pattern functions
function pattern2(x, y, size) {
  // Draw horizontal lines
  let linesPerSquare = 20;
  let lineSpacing = size / linesPerSquare;
  let arcWidth = size / (2 * linesPerSquare); // Calculate the width of the arcs
  stroke("blue"); // Set the color of the lines
  strokeWeight(1); // Set the thickness of the lines
  let prevLine = null; // Keep track of the previous line's points
  for (let k = 0; k < linesPerSquare; k++) {
    let lineY = y + k * lineSpacing;
    let lineLength = size - 2 * arcWidth; // Shorten the line length by twice the width of the arc
    if (k === 0 || k === linesPerSquare - 1) { // If this is the first or last line
      lineLength = size - arcWidth; // Shorten the line length by the width of the arc at the left only
    }
    line(x + arcWidth, lineY, x + arcWidth + lineLength, lineY);
    if (prevLine) {
      // Draw an arc from the previous line's end point to the current line's start point
      let startAngle = k % 2 === 0 ? -HALF_PI : HALF_PI;
      let arcX = k % 2 === 0 ? x + size - arcWidth : x + arcWidth;
      if (k === linesPerSquare - 1) { // If this is the last line
        arcX = x + size - lineLength; // Set the arcX to the end of the grid minus the line length
        startAngle = HALF_PI; // Set the start angle to HALF_PI to draw the arc at the right
      }
      arc(arcX, (prevLine.y + lineY) / 2, arcWidth * 2, abs(prevLine.y - lineY), startAngle, startAngle + PI);
    }
    prevLine = {x: x + arcWidth + lineLength, y: lineY}; // Update the previous line's points
  }
}


function createGrid() {
  background("antiquewhite");
  noFill();

  // Calculate the number of rows and columns based on the canvas size, grid size and inset
  rows = (height - 2 * inset) / gridSize;
  cols = (width - 2 * inset) / gridSize;

  stroke(0, 50, 100); // Set the color of the grid lines

  // Draw the grid lines
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = j * gridSize + inset;
      let y = i * gridSize + inset;
      line(x, inset, x, height - inset); // Draw vertical line
      line(inset, y, width - inset, y); // Draw horizontal line
    }
  }
}

// Define pattern array
let patterns = [
  [pattern1, pattern1, pattern2, pattern2, pattern1],
  [pattern1, pattern2, pattern2, pattern1, pattern1],
  // Add more rows as needed
];

function drawPatterns() {
  // Iterate over each grid square
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * gridSize + inset;
      let y = i * gridSize + inset;

      // Call the appropriate pattern function
      let patternFunction = patterns[i % patterns.length][j % patterns[i % patterns.length].length];
      patternFunction(x, y, gridSize);
    }
  }
}

// Download SVG when clicked
function mousePressed(){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    save("gridPattern.svg"); // give file name
    print("saved svg");
  }
}

// Puts it all together so it doesn't run every time
function draw() {
  createGrid();
  drawPatterns();
}