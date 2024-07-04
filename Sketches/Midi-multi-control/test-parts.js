
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
  background(55);
  // colorMode(HSL)
}

// Mouse watcher
function touchStarted() {
  console.log('Before touchStarted:', getAudioContext().state);
  if (getAudioContext().state === 'suspended') {
    getAudioContext().resume();
  }
  // console.log('After touchStarted:', getAudioContext().state);
}

// Audio context watcher for midi testing
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

}