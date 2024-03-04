// Basics
function setup() {
  createCanvas(800, 800, SVG);
  noLoop()
  colorMode(HSL)
}

let gridSize = 200; // Define the size of the grid squares
let inset = 200; // Define the inset from the canvas
let rows, cols; // Declare rows and cols variables

function blankPattern(x, y, size) {
  // Do nothing
}

// Squiggle, one line plus first and last
function pattern1(x, y, size) {
  let linesPerSquare = 20;
  let lineSpacing = size / linesPerSquare;
  let arcHeight = size / (1.5 * linesPerSquare);
  stroke("red");
  strokeWeight(1);

  // Draw the first line
  line(x, y + arcHeight, x, y + size);

  // Draw the Bezier curves
  beginShape();
  for (let k = 0; k < linesPerSquare - 1; k++) {
    let lineX = x + k * lineSpacing;
    let nextLineX = x + (k + 1) * lineSpacing;

    // Calculate the control points for the Bezier curve
    let cp1x = lineX;
    let cp1y = k % 2 === 0 ? y : y + size;
    let cp2x = nextLineX;
    let cp2y = k % 2 === 0 ? y : y + size;

    // Calculate the arcY based on the current line's y-coordinate and the arcHeight
    let arcY = k % 2 === 0 ? y + arcHeight : y + size - arcHeight;

    // Add a new vertex point at the start of each curve
    vertex(lineX, arcY);

    // Add the Bezier curve
    bezierVertex(cp1x, cp1y, cp2x, cp2y, nextLineX, arcY);
  }
  endShape();

  // Draw the second last line
  line(x + (linesPerSquare - 1) * lineSpacing, y + arcHeight, x + (linesPerSquare - 1) * lineSpacing, y + size);
}

// Squiggle, one line plus first and last
function pattern2(x, y, size) {
  let linesPerSquare = 10;
  let lineSpacing = size / linesPerSquare;
  let arcHeight = size / (1.5 * linesPerSquare);
  stroke("green");
  strokeWeight(1);

  // Draw the first line
  line(x + arcHeight, y, x + size, y);

  // Draw the Bezier curves
  beginShape();
  for (let k = 0; k < linesPerSquare - 1; k++) {
    let lineY = y + k * lineSpacing;
    let nextLineY = y + (k + 1) * lineSpacing;

    // Calculate the control points for the Bezier curve
    let cp1y = lineY;
    let cp1x = k % 2 === 0 ? x : x + size;
    let cp2y = nextLineY;
    let cp2x = k % 2 === 0 ? x : x + size;

    // Calculate the arcX based on the current line's x-coordinate and the arcHeight
    let arcX = k % 2 === 0 ? x + arcHeight : x + size - arcHeight;

    // Add a new vertex point at the start of each curve
    vertex(arcX, lineY);

    // Add the Bezier curve
    bezierVertex(cp1x, cp1y, cp2x, cp2y, arcX, nextLineY);
  }
  endShape();

  // Draw the second last line
  line(x + arcHeight, y + (linesPerSquare - 1) * lineSpacing, x + size, y + (linesPerSquare - 1) * lineSpacing);
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
  [pattern2, pattern2, pattern2, pattern1, pattern1],
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