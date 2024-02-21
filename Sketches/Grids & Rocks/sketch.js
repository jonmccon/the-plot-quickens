
// Basics
function setup() {
  createCanvas(800, 800, SVG);
  noLoop()
  colorMode(HSL)
}

let gridSize = 2; // Define the size of the grid squares
let inset = 200; // Define the inset from the canvas

let centerPoints = [
  { x: 0, y: 0, numCircles: 10 },
  { x: 50, y: 50, numCircles: 15 },
  { x: -50, y: 50, numCircles: 20 },
  // Add more points as needed
];

// Generate the points where the circles will be
let circlePoints = [];
for (let centerPoint of centerPoints) {
  let circles = Array.from({ length: centerPoint.numCircles }, (_, i) => ({
    x: centerPoint.x,
    y: centerPoint.y,
    radius: gridSize * (i + 1), // each circle's radius is a multiple of gridSize
  }));
  circlePoints.push(...circles);
}

function createGrid() {
  background("antiquewhite");
  noFill();



  // Calculate the number of rows and columns based on the canvas size, grid size and inset
  let rows = (height - 2 * inset) / gridSize;
  let cols = (width - 2 * inset) / gridSize;

  push(); // Save the current transformation matrix
  translate(width / 2, height / 2); // Move the origin to the center of the canvas

  stroke(0, 0, 0); // Set the color as you want

  // Draw the grid lines
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = j * gridSize - width / 2 + inset;
      let y = i * gridSize - height / 2 + inset;

      // Initialize variables to store the start and end points of the line
      let startX = x, startY = y, endX = x + gridSize, endY = y;

      // Check if the line intersects with any of the circles
      let shouldDraw = true;
      for (let point of circlePoints) {
        let d1 = dist(startX, startY, point.x, point.y);
        let d2 = dist(endX, endY, point.x, point.y);
        if (d1 < point.radius || d2 < point.radius) {
          // If either end of the line is inside the circle, do not draw the line
          shouldDraw = false;
          break;
        }
      }

      // Draw the line if it is not inside any circle
      if (shouldDraw) {
        line(startX, startY, endX, endY);
      }
    }
  }

  // Draw the circles
  stroke(0, 0, 0); // Set the color as you want
  noFill();
  for (let point of circlePoints) {
    circle(point.x, point.y, point.radius * 2);
  }
  pop(); // Restore the transformation matrix
}

// Download SVG when clicked
function mousePressed(){
  save("mySVG.svg"); // give file name
  print("saved svg");
}

// Puts it all together so it doesn't run every time
var myFunctions = [createGrid, mousePressed];
var index = 0;
function draw(){
  if (index < myFunctions.length) {
    myFunctions[index]();
  }
}