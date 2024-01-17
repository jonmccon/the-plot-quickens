
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
  let rotations = 10; // Number of rotations
  let rotationIncrement = 10; // Degrees to rotate each time
  for (let r = 0; r < rotations; r++) {
    push(); // Save the current transformation matrix
    translate(width / 2, height / 2); // Move the origin to the center of the canvas
    rotate(radians(r * rotationIncrement)); // Rotate by the current rotation

    stroke((r * 36) % 360, 50, 50); // Change this line to set the color as you want

    // Draw the grid lines
    for (let i = 0; i <= rows; i++) {
      beginShape();
      for (let j = 0; j <= cols; j++) {
        let x = j * gridSize - width / 2 + inset;
        let y = i * gridSize - height / 2 + inset;
        // let noiseValue = noise(x * 0.1, y * 0.1); // Generate noise based on the x and y coordinates
        // let noisyY = y + map(noiseValue, 0, 1, -gridSize, gridSize); // Map the noise value to a range that fits the grid size
        vertex(x, y);
      }
      endShape();
    }

    pop(); // Restore the transformation matrix
  }
    // Calculate the radius of the circle
    let circleRadius = dist(width / 2, height / 2, width - inset, height - inset);

    // Draw the circle
    noFill();
    stroke(0); // Set the color of the circle
    circle(width / 2, height / 2, circleRadius * 2);
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