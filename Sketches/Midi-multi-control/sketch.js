// Environment
let osc;
let env;
let offscreen;
let capture;


// Grid Starts
let gridSize = 100; // Define the size of the grid squares
let inset = 150; // Define the inset from the canvas
let rows, cols; // Declare rows and cols variables
let seed;

// Initialize an array to store mouse positions
let mousePositions = [];

// Define pattern weights
const patternWeights = {
    fillX: 1,
    sine: 2,
    linesNoise: 2,
    wigVertA: 4,
    wigHorzA: 5
};

function selectPatternWithWeight(weights) {
    let totalWeight = Object.values(weights).reduce((acc, weight) => acc + weight, 0);
    let random = Math.random() * totalWeight;
    let sum = 0;

    for (let pattern in weights) {
        sum += weights[pattern];
        if (random <= sum) {
            return window[pattern];
        }
    }
}

function initializePatterns(rows, cols) {
    let patterns = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(selectPatternWithWeight(patternWeights));
        }
        patterns.push(row);
    }
    return patterns;
}

let patterns;


// ideally each var is going to need a min and max that's propotional to the grid size

// UPDATE- these variable defintions
let W1 = 4; // Number of grid units
let W2 = 8; // Proportion of grid distribution
let G1 = 3; // Equality of per square breakdown ---------------------

let A1 = 0; // Proportion of Wiggle Units
let A2 = 0; // Wiggle Frequency
let A3 = 0; // Wiggle Angle

let B1 = 0; // Proportion of Pattern Units
let B2 = 0; // Pattern Frequency / Density
let B3 = 0; // Pattern Size

let L1 = 20; // Number of Lines
let L2 = 0.01; // Amount of Noise
let L3 = 77; // Noise variation

let S1 = 6 // proportion of Cone Units
let S2 = 0 // number of concentric circles


// Basics
function setup() {
    createCanvas(600, 600, SVG);
    noLoop();
    offscreen = createGraphics(600, 600)
    patterns = initializePatterns(5, 5); // Max rows and columns

    let button = createButton('Gimme New Ones!');
    button.position(19, 19); // Adjust position as needed
    button.mousePressed(redrawSketch);


    // open video capture
    // createCapture(VIDEO);
}

// for a custom usb camera, use the location device1 etc
//  deviceId: {myPreferredCameraDeviceId}, 

  
  
function createGrid() {
    noFill();
    stroke("black"); // Set the color of the grid lines

    // Calculate the size of each grid cell to fill the canvas based on G1
    gridSize = Math.min((width - 2 * inset) / G1, (height - 2 * inset) / G1);

    // Calculate the number of rows and columns based on the gridSize
    rows = Math.floor((height - 2 * inset) / gridSize);
    cols = Math.floor((width - 2 * inset) / gridSize);

    // Draw vertical lines
    stroke("green"); // Set the color of the grid lines
    for (let j = 0; j <= cols; j++) {
        let x = j * gridSize + inset;
        line(x, inset, x, height - inset); // Draw vertical line
    }

    // Draw horizontal lines
    stroke("purple"); // Set the color of the grid lines
    for (let i = 0; i <= rows; i++) {
        let y = i * gridSize + inset;
        line(inset, y, width - inset, y); // Draw horizontal line
    }
}


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
    drawPatterns();
    drawMousePositions();
    mousePressed();
    mouseReleased();



    // MIDI Channel Mappings
    // we're using 102 - 117
    if(channel == 102) {
        W1 = Math.ceil(map(value, 0, 127, 1, 20)) * 2;    
    } else if(channel == 103) {
        W2 = Math.ceil(map(value, 0, 127, 1, 20)) * 2;  
    } else if(channel == 104) {
        G1 = Math.floor(map(value, 0, 127, 1, 5)); 
    } else if(channel == 105) {
        L1 = Math.ceil(map(value, 0, 127, 1, 30));
    } else if(channel == 106) {
        L2 = map(value, 0, 127, 0, 0.05)
    } else if(channel == 107) {
        L3 = map(value, 0, 127, 1, 200) 
    } else if(channel == 108) {
        S1 = map(value, 0, 127, 1, 15);
    } else if(channel == 109) {
        S2 = map(value, 0, 127, -100, 100)
    } 
}