
// Basics
function setup() {
  createCanvas(800, 800, SVG);
  noLoop()
  colorMode(HSL)
}

function createGrid() {
  background("antiquewhite");
  noFill();

  let gridSize = 10; // Define the size of the grid squares
  let inset = 200; // Define the inset from the canvas

  // Calculate the number of rows and columns based on the canvas size, grid size and inset
  let rows = (height - 2 * inset) / gridSize;
  let cols = (width - 2 * inset) / gridSize;

  // Draw the rotated grid lines
  let rotations = 1; // Number of rotations
  let rotationIncrement = 15; // Degrees to rotate each time
  for (let r = 0; r < rotations; r++) {
    push(); // Save the current transformation matrix
    translate(width / 2, height / 2); // Move the origin to the center of the canvas
    rotate(radians(r * rotationIncrement)); // Rotate by the current rotation

    // Draw the grid lines
    for (let i = 0; i <= rows; i++) {
      beginShape();
      for (let j = 0; j <= cols; j++) {
        let x = j * gridSize - width / 2 + inset;
        let y = i * gridSize - height / 2 + inset;
        let noiseValue = noise(x * 0.1, y * 0.1); // Generate noise based on the x and y coordinates
        let noisyY = y + map(noiseValue, 0, 1, -gridSize, gridSize); // Map the noise value to a range that fits the grid size
        vertex(x, noisyY);
      }
      endShape();
    }

    pop(); // Restore the transformation matrix
  }
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