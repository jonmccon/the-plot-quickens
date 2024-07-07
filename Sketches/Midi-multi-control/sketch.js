// Environment
let osc;
let env;
let capture;


// Grid Starts
  
let gridSize = 100; // Define the size of the grid squares
let inset = 150; // Define the inset from the canvas
let rows, cols; // Declare rows and cols variables


// each var is going to need a min and max that's propotional to the grid size
// each var may need to increment by a certain amount, like 3 


let G1 = 4; // Number of grid units
let G2 = 4; // Proportion of grid distribution
let G3 = 4; // Equality of per square breakdown ---------------------

let S1 = 0; // Seed A - random input for pattern gen
let S2 = 0; // Seed B - 

let A1 = 0; // Proportion of Wiggle Units
let A2 = 0; // Wiggle Frequency
let A3 = 0; // Wiggle Angle

let B1 = 0; // Proportion of Pattern Units
let B2 = 0; // Pattern Frequency / Density
let B3 = 0; // Pattern Size

let C1 = 2; // Proportion of Line Units
let C2 = 0; // Line Frequency / Density
let C3 = 0; // Line Noise
let C4 = 0; // Line Angle

let D1 = 0 // proportion of Cone Units
let D2 = 0 // number of concentric circles


// Basics
function setup() {
    createCanvas(600, 600, SVG);
    noLoop();
    // colorMode(HSL)

    // open video capture
    // createCapture(VIDEO);
}

// for a custom usb camera, use the location device1 etc
//  deviceId: {myPreferredCameraDeviceId}, 

  
  
function createGrid() {
noFill();
stroke("black"); // Set the color of the grid lines

// Calculate the size of each grid cell to fill the canvas based on G3
gridSize = Math.min((width - 2 * inset) / G3, (height - 2 * inset) / G3);

// Calculate the number of rows and columns based on the gridSize
rows = Math.floor((height - 2 * inset) / gridSize);
cols = Math.floor((width - 2 * inset) / gridSize);
// console.log(G3, gridSize)

// Draw the grid lines
// Draw vertical lines
stroke("none"); // Set the color of the grid lines

for (let j = 0; j <= cols; j++) {
    let x = j * gridSize + inset;
    line(x, inset, x, height - inset); // Draw vertical line
}

stroke("purple"); // Set the color of the grid lines

// Draw horizontal lines
for (let i = 0; i <= rows; i++) {
    let y = i * gridSize + inset;
    line(inset, y, width - inset, y); // Draw horizontal line
}
}

// Define pattern array
let patterns = [
    [fillX, fillCircles, linesNoise, wigVertA, wigVertA, wigHorzA],
    [linesNoise, wigHorzA, wigHorzA, wigVertA, wigVertA, wigHorzA],
    [wigHorzA, wigVertA, wigVertA, wigVertA , wigVertA, wigHorzA],
    [wigHorzA, wigHorzA, wigVertA, wigHorzA, fillX, wigVertA],
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


// Puts it all together so it doesn't run every time
function draw() {
    createGrid();
    // this needs to be rethought thru to update based on midi values not the loop
    drawPatterns();
    mousePressed();


    // MIDI Channel Mappings
    if(channel == 74) {
        G1 = Math.ceil(map(value, 0, 127, 1, 20)) * 2;    
    } else if(channel == 75) {
        G2 = Math.ceil(map(value, 0, 127, 1, 20)) * 2;  
    } else if(channel == 76) {
        G3 = map(value, 0, 127, 1, 4)  
    } else if(channel == 77) {
        C1 = Math.ceil(map(value, 0, 127, 1, 30));
    } else if(channel == 73) {
        C2 = map(value, 0, 127, 0, 0.05)
    } else if(channel == 72) {
        C3 = map(value, 0, 127, 1, 50) 
    }
}