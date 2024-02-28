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
  let linesPerSquare = 10;
  let lineSpacing = size / linesPerSquare;
  stroke(0); // Set the color of the lines
  strokeWeight(1); // Set the thickness of the lines
  let prevLine = null; // Keep track of the previous line's points
  for (let k = 0; k < linesPerSquare; k++) {
    let lineX = x + k * lineSpacing;
    line(lineX, y, lineX, y + size);
    if (prevLine) {
      // Draw an arc from the previous line's end point to the current line's start point
      let startAngle = k % 2 === 0 ? 0 : PI;
      let arcY = k % 2 === 0 ? y + size : y;
      arc((prevLine.x + lineX) / 2, arcY, abs(prevLine.x - lineX), size / 4, startAngle, startAngle + PI);
    }
    prevLine = {x: lineX, y: y + size}; // Update the previous line's points
  }
}

function pattern2(x, y, size) {
  // Draw horizontal lines
  let linesPerSquare = 5;
  let lineSpacing = size / linesPerSquare;
  stroke(0); // Set the color of the lines
  strokeWeight(1); // Set the thickness of the lines
  for (let k = 0; k < linesPerSquare; k++) {
    let lineY = y + k * lineSpacing;
    line(x, lineY, x + size, lineY);
  }
}

function createGrid() {
  background("antiquewhite");
  noFill();

  // Calculate the number of rows and columns based on the canvas size, grid size and inset
  rows = (height - 2 * inset) / gridSize;
  cols = (width - 2 * inset) / gridSize;

  stroke(0, 50, 50); // Set the color of the grid lines

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
  [pattern1, pattern2, blankPattern, pattern2, pattern1],
  [pattern2, pattern1, pattern2, pattern1, blankPattern],
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