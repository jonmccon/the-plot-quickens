
// Environment
let osc;
let env;

let x = 100;
let y = 100;
let h = 100;
let w = 100;
let aH = 1.5;
let aO = 0.2;
let mL = 0;

let size = 100;
let r = 0;
let g = 0;
let b = 0;

let gridSize = 100; // Define the size of the grid squares
let inset = 100; // Define the inset from the canvas
let rows, cols; // Declare rows and cols variables

let numLetters = 6;


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
  rows = (height - 2 * inset) / (gridSize * numLetters);
  cols = (width - 2 * inset) / (gridSize * numLetters);

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


function letterJ(x, y, height, width, aH) {
  stroke("red");
  strokeWeight(1);

  // Calculate the corner radius based on the width and height
  let cornerRadius = Math.min(width, height) * aO; // Adjust this value as needed

  // Draw the rectangle with an open edge at the top left
  beginShape();
  vertex(x, y); // Top left corner (straight)
  vertex(x + width, y); // Top right corner
  vertex(x + width, y + height - cornerRadius); // Bottom right corner
  endShape();

  // Draw the arc at the bottom right
  arc(x + width - cornerRadius, y + height - cornerRadius, cornerRadius * 2, cornerRadius * 2, 0, HALF_PI);

  beginShape();
  vertex(x + width - cornerRadius, y + height); // Bottom right corner (straight)
  vertex(x + cornerRadius, y + height); // Bottom left corner
  endShape();
  
  arc(x + cornerRadius, y + height - cornerRadius, cornerRadius * 2, cornerRadius * 2, HALF_PI, PI);

  beginShape();
  vertex(x, y + (2 * cornerRadius)); // Top left corner
  vertex(x, y + height - cornerRadius); // Bottom right corner
  endShape();

  
}

function letterO(x, y, height, width, aH) {
  stroke("red");
  strokeWeight(1);

  // Calculate the corner radius based on the width and height
  let cornerRadius = Math.min(width, height) * aO; // Adjust this value as needed

  // Draw the outer 'O'
  rect(x, y, width, height, cornerRadius);
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

function letterN2(x, y, height, width, aH, middleLineShift) {
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



// Define an array of functions representing each letter
let letters = [letterJ, letterO, letterN1, letterN2 ];


// Add a new function letter that takes a letter index and MIDI channel values as parameters
function letter(letterIndex, x, y, h, w, aH, mL) {
  // Calculate the x and y coordinates based on the letter index and grid size
  let gridX = (letterIndex % cols) * gridSize + inset;
  let gridY = Math.floor(letterIndex / cols) * gridSize + inset;
  
  // Determine the letter function based on the letter index
  let letterFunc = letters[letterIndex % letters.length];

  // Call the letter function
  letterFunc(gridX + x, gridY + y, h, w, aH, mL);
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
  createGrid(6);
  mousePressed();
    
  if(channel == 74) {
      x = map(value, 0, 127, 0, 200)   
    } else if(channel == 75) {
      y = map(value, 0, 127, 0, 200)  
    } else if(channel == 76) {
      h = map(value, 0, 127, 20, 300);  
    } else if(channel == 70) {
      w = map(value, 0, 127, 0, 255)  
    } else if(channel == 71) {
      aH = map(value, 0, 127, 0.5, 10)  
    } else if(channel == 72) {
      mL = map(value, 0, 127, -100, 100)  
    } else if (channel == 77) {
      rows = map(value, 0, 127, 1, 10)
    } else if (channel == 78) {
      cols = map(value, 0, 127, 1, 10)
    }

      // Draw 6 letters
  for (let i = 0; i < 6; i++) {
    letter(i, x, y, h, w, aH, mL);
  }
}