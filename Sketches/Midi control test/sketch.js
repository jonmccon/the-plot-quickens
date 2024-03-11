
// Environment
let osc;
let env;

let x = 100;
let y = 100;
let h = 100;
let w = 100;
let aH = 1.5;
let mL = 0;

let size = 100;
let r = 0;
let g = 0;
let b = 0;

let gridSize = 100; // Define the size of the grid squares
let inset = 100; // Define the inset from the canvas
let rows, cols; // Declare rows and cols variables



// Basics
function setup() {
  createCanvas(800, 800, SVG);
  // colorMode(HSL)
}

function touchStarted() {
  console.log('Before touchStarted:', getAudioContext().state);
  if (getAudioContext().state === 'suspended') {
    getAudioContext().resume();
  }
  // console.log('After touchStarted:', getAudioContext().state);
}

function mousePressed() {
  console.log('Before mousePressed:', getAudioContext().state);
  if (getAudioContext().state === 'suspended') {
    getAudioContext().resume();
  }
  // console.log('After mousePressed:', getAudioContext().state);
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



function letterN1(x, y, height, width, aH, middleLineShift) {
  let linesPerSquare = 3;
  let lineSpacing = width / linesPerSquare;
  let arcHeight = height / (aH * linesPerSquare);
  stroke("red");
  strokeWeight(1);

  // Draw the first line
  line(x, y + arcHeight, x, y + height);

  // Draw the Bezier curves
  beginShape();
  for (let k = 0; k < linesPerSquare - 1; k++) {
    let lineX = x + k * lineSpacing + (k == 1 ? middleLineShift : 0);
    let nextLineX = x + (k + 1) * lineSpacing + (k == 0 ? middleLineShift : 0);

    // Calculate the control points for the Bezier curve
    let cp1x = lineX;
    let cp1y = k % 2 === 0 ? y : y + height;
    let cp2x = nextLineX;
    let cp2y = k % 2 === 0 ? y : y + height;

    // Calculate the arcY based on the current line's y-coordinate and the arcHeight
    let arcY = k % 2 === 0 ? y + arcHeight : y + height - arcHeight;

    // Add a new vertex point at the start of each curve
    vertex(lineX, arcY);

    // Add the Bezier curve
    bezierVertex(cp1x, cp1y, cp2x, cp2y, nextLineX, arcY);
  }
  endShape();

  // Draw the second last line
  line(x + (linesPerSquare - 1) * lineSpacing, y, x + (linesPerSquare - 1) * lineSpacing, y + height - arcHeight);
}





// ---------------------
// Download SVG when clicked
var spacebarWasPressed = false;

function keyPressed() {
  if (key === ' ' && !spacebarWasPressed) {
    saveSvg();
    spacebarWasPressed = true;
  }
}

function keyReleased() {
  if (key === ' ') {
    spacebarWasPressed = false;
  }
}

function saveSvg(){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    save("midiTest.svg"); // give file name
    print("saved svg");
  }
}

// Puts it all together so it doesn't run every time
function draw() {
  createGrid();
  mousePressed();

  letterN1(x, y, h, w, aH, mL);
    
  if(channel == 74) {
      x = map(value, 0, 127, 0, 200)   
    } else if(channel == 75) {
      y = map(value, 0, 127, 0, 200)  
    } else if(channel == 76) {
      h = map(value, 0, 127, 20, 300);  
    } else if(channel == 70) {
      w = map(value, 0, 127, 0, 255)  
    } else if(channel == 71) {
      aH = map(value, 0, 127, 0, 2)  
    } else if(channel == 72) {
      mL = map(value, 0, 127, -100, 100)  
    }
}