
// Global variables
let size;
let numPoints;
let curveFactor;
let xOffset;
let ctrlPoints = [];

// Basics
function setup() {
  createCanvas(800, 800, SVG);
  noLoop()
  colorMode(HSL)
  background("antiquewhite");

  // Control points for the cactus curve
  numPoints = Math.floor(random(2, 8));
  pointDistance = random(30, 60);
  curveFactor = Math.floor(random(20, 20)); // The factor by which the curve bends to the left
  xOffset = random(5, 25); // Distance from center

  console.log(numPoints, pointDistance, curveFactor);
}

function drawBasePoints() {
  stroke('red'); // Change the color to red
  strokeWeight(5); // Change the stroke weight to 5
  for (let i = 0; i < numPoints; i++) {
    let y = height / 2 - i * pointDistance;
    let currentXOffset = xOffset - i * (xOffset / (numPoints - 1)); // Decrease xOffset for each curve
    let x1 = width / 2 - currentXOffset; // Subtract currentXOffset instead of xOffset
    let x2 = width / 2 + currentXOffset; // Add currentXOffset instead of xOffset

    stroke('red'); // Change the color to red
    point(x1, y); // Draw a point with a negative offset on the x-axis
    stroke('blue'); // Change the color to blue
    point(x2, y); // Draw a point with a positive offset on the x-axis
    
    ctrlPoints.push({x1: x1, x2: x2});
    console.log(`Point ${i+1}: (${x1}, ${y}) and (${x2}, ${y})`);
  }
}

function drawCurvedLine() {
  strokeWeight(1); // Change the stroke weight to 1
  noFill(); // Ensure the shape is not filled

  let numRepeats = 7; // Number of times the line is drawn
  let curveDecreaseFactor = 0.95; // Amount to decrease curveFactor each time

  let currentCurveFactor = curveFactor;

  for (let repeat = 0; repeat < numRepeats; repeat++) {
    // Change the stroke color for the first line
    if (repeat === 0) {
      stroke('red'); // Change the color to red for the first line
    } else {
      stroke('black'); // Change the color to black for the other lines
    }

    // LEFT SIDE
    beginShape();

    // First point
    let x0 = width / 2;
    let y0 = height / 2;
    vertex(x0, y0); // Use the center point as the first 

    // Second point
    let y1 = height / 2 + pointDistance;
    let ctrlX1 = width / 2 - xOffset - curveFactor * 0.5; // Calculate a separate control point for the second point
    let ctrlX2 = width / 2 - xOffset - curveFactor * 0.5; // Calculate a separate control point for the second point
    bezierVertex(ctrlX1, y0, ctrlX2, y1, ctrlX1, y1); // Use bezierVertex instead of vertex

    // Curves 
    for (let i = 2; i < numPoints; i++) {
      let y = height / 2 + i * pointDistance;
      let yPrev = height / 2 + (i - 1) * pointDistance;
      let ctrlY = (y + yPrev) / 2; // Calculate the y-coordinate of the control point as the average of the y-coordinates of the two anchor points
      let currentXOffset = xOffset - repeat * (xOffset / (numRepeats - 1)); // Decrease xOffset for each repeat
      let ctrlX = width / 2 - currentXOffset - Math.max(currentCurveFactor, 10) / Math.pow(i, 1 + 0.2 * repeat) * (i - 0.5); // Use the maximum of currentCurveFactor and 10
      let endX = width / 2 - currentXOffset; // Use the point with a negative offset on the x-axis as the end point
      bezierVertex(ctrlX, ctrlY, ctrlX, ctrlY, endX, y); // Use the same control point for the second control point, and use the next point as the anchor point
    }

    endShape();
    currentCurveFactor = Math.max(currentCurveFactor * curveDecreaseFactor, 10); // Decrease currentCurveFactor for the next line, but ensure it doesn't go below 10

  }

  // Draw a vertical line from the top point to the bottom point
  stroke('black'); // Change the color to black for the vertical line
  line(width / 2, height / 2, width / 2, height / 2 + (numPoints - 1) * pointDistance);

  // Mirror the lines across the y-axis
  push(); // Save the current transformation matrix
  translate(width, 0); // Move the origin to the right edge of the canvas
  scale(-1, 1); // Flip the x-axis

  currentCurveFactor = curveFactor; // Reset currentCurveFactor

  for (let repeat = 0; repeat < numRepeats; repeat++) {
    // Change the stroke color for the first line
    if (repeat === 0) {
      stroke('blue'); // Change the color to red for the first line
    } else {
      stroke('black'); // Change the color to black for the other lines
    }

    // RIGHT SIDE
    beginShape();

    // First point
    let x0 = width / 2;
    let y0 = height / 2;
    vertex(x0, y0); // Use the center point as the first 
    
    // Second point
    y1 = height / 2 + pointDistance;
    ctrlX1 = width / 2 - xOffset - curveFactor * 0.5; // Subtract the offset and curveFactor from the center x-coordinate
    ctrlX2 = width / 2 - xOffset - curveFactor * 0.5; // Subtract the offset and curveFactor from the center x-coordinate
    bezierVertex(ctrlX1, y0, ctrlX2, y1, ctrlX1, y1); // Use bezierVertex instead of vertex
    
    for (let i = 2; i < numPoints; i++) {
      let y = height / 2 + i * pointDistance;
      let yPrev = height / 2 + (i - 1) * pointDistance;
      let ctrlY = (y + yPrev) / 2;
      let currentXOffset = xOffset - repeat * (xOffset / (numRepeats - 1)); // Decrease xOffset for each repeat
      let ctrlX = width - (width / 2 + currentXOffset + Math.max(currentCurveFactor, 10) / Math.pow(i, 1 + 0.2 * repeat) * (i - 0.5));
      let endX = width - (width / 2 + currentXOffset);
      bezierVertex(ctrlX, ctrlY, ctrlX, ctrlY, endX, y);
    }

    endShape();
    console.log('curveFactor:', currentCurveFactor); // Print the value of currentCurveFactor
    currentCurveFactor = Math.max(currentCurveFactor * curveDecreaseFactor, 10); // Decrease currentCurveFactor for the next line, but ensure it doesn't go below 10
  }

  pop(); // Restore the transformation matrix
}



// Download SVG when clicked
function mousePressed(){
  save("cactus.svg"); // give file name
  print("saved svg");
}

// all the functions
function draw() {
  drawBasePoints();
  drawCurvedLine();
}