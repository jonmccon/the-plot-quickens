
// Basics
function setup() {
  createCanvas(800, 800, SVG);
  noLoop()
  colorMode(HSL)
}

function createGrid() {
  background("antiquewhite");
  noFill();

  let gridSize = 200; // Define the size of the grid squares
  let inset = 200; // Define the inset from the canvas

  // Calculate the number of rows and columns based on the canvas size, grid size and inset
  let rows = (height - 2 * inset) / gridSize;
  let cols = (width - 2 * inset) / gridSize;

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

  // Calculate the radius of the circle
  let circleRadius = dist(width / 2, height / 2, width - inset, height - inset);

  // Draw the circle
  // noFill();
  // stroke(0); // Set the color of the circle
  // circle(width / 2, height / 2, circleRadius * 2);
}
// Download SVG when clicked
function mousePressed(){
  save("gridPattern.svg"); // give file name
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