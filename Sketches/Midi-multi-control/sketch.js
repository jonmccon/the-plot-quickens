// Environment
let osc;
let env;
let capture;


// Grid Starts
  
let gridSize = 100; // Define the size of the grid squares
let inset = 100; // Define the inset from the canvas
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

let C1 = 0; // Proportion of Line Units
let C2 = 0; // Line Frequency / Density
let C3 = 0; // Line Noise
let C4 = 0; // Line Angle

let D1 = 0 // proportion of Cone Units
let D2 = 0 // number of concentric circles


// Basics
function setup() {
    createCanvas(800, 800, SVG);
    noLoop();
    // colorMode(HSL)

    // open video capture
    // createCapture(VIDEO);
}

// for a custom usb camera, use the location device1 etc
//  deviceId: {myPreferredCameraDeviceId}, 




  
function blankPattern(x, y, size) {
// Do nothing
}

  
// Squiggle, one line plus first and last
// This one is fixed!
function wigVertA(x, y, size) {
    let linesPerSquare = G2; 
    let lineSpacing = size / linesPerSquare;
    let arcHeight = size / (1.5 * linesPerSquare);
    stroke("red");
    strokeWeight(1);

    beginShape();
    // Draw the first line as part of the shape
    vertex(x, y + arcHeight);
    
    for (let k = 0; k <= linesPerSquare; k++) {
        let lineX = x + k * lineSpacing;
        let nextLineX = x + (k + 1) * lineSpacing;
    
        if (k < linesPerSquare) {
            // Calculate the control points for the Bezier curve for all but the last iteration
            let cp1x = lineX;
            let cp1y = k % 2 === 0 ? y : y + size;
            let cp2x = nextLineX;
            let cp2y = k % 2 === 0 ? y : y + size;
    
            // Calculate the arcY based on the current line's y-coordinate and the arcHeight
            let arcY = k % 2 === 0 ? y + arcHeight : y + size - arcHeight;
    
            // Add a new vertex point at the start of each curve
            vertex(lineX, arcY);
    
            // Add the Bezier curve
            bezierVertex(cp1x, cp1y, cp2x, cp2y, nextLineX, arcY);
        } 
    }
    vertex(x + linesPerSquare * lineSpacing, y + arcHeight);
    
    // Complete the shape
    endShape();
}

function wigHorzA(x, y, size) {
    let linesPerSquare = G1;
    let lineSpacing = size / linesPerSquare;
    let arcHeight = size / (1.5 * linesPerSquare);
    stroke("blue");
    strokeWeight(1);

    beginShape();
    // Draw the first line as part of the shape, rotated by swapping x and y
    vertex(x + arcHeight, y);
    
    for (let k = 0; k <= linesPerSquare; k++) {
        let lineY = y + k * lineSpacing;
        let nextLineY = y + (k + 1) * lineSpacing;
    
        if (k < linesPerSquare) {
            // Calculate the control points for the Bezier curve for all but the last iteration, with swapped and adjusted coordinates
            let cp1y = lineY;
            let cp1x = k % 2 === 0 ? x : x + size;
            let cp2y = nextLineY;
            let cp2x = k % 2 === 0 ? x : x + size;
    
            // Calculate the arcX based on the current line's x-coordinate and the arcHeight, adjusted for rotation
            let arcX = k % 2 === 0 ? x + arcHeight : x + size - arcHeight;
    
            // Add a new vertex point at the start of each curve, with swapped coordinates
            vertex(arcX, lineY);
    
            // Add the Bezier curve with adjusted control points
            bezierVertex(cp1x, cp1y, cp2x, cp2y, arcX, nextLineY);
        } 
    }
    vertex(x + arcHeight, y + linesPerSquare * lineSpacing);
    
    // Complete the shape
    endShape();
}

// X's by grid, random
function fillX(x, y, size) {
let numShapes = 20;
let shapeSize = size / numShapes;

// Set stroke properties
stroke("red");
strokeWeight(1);

// Loop over the grid
for (let i = 0; i < numShapes; i++) {
    for (let j = 0; j < numShapes; j++) {
    // Calculate the top left corner of the current grid square
    let topLeftX = x + i * shapeSize;
    let topLeftY = y + j * shapeSize;

    // Randomly decide whether to draw an 'X' in the current grid square
    if (random() < 0.5) {
        // Draw an 'X'
        line(topLeftX, topLeftY, topLeftX + shapeSize, topLeftY + shapeSize);
        line(topLeftX, topLeftY + shapeSize, topLeftX + shapeSize, topLeftY);
    }
    }
}
}

// Circles by grid, random
function fillCircles(x, y, size) {
let numShapes = 10;
let shapeSize = size / numShapes;

// Set stroke properties
stroke("red");
strokeWeight(1);

// Loop over the grid
for (let i = 0; i < numShapes; i++) {
    for (let j = 0; j < numShapes; j++) {
    // Calculate the top left corner of the current grid square
    let topLeftX = x + i * shapeSize;
    let topLeftY = y + j * shapeSize;

    // Randomly decide whether to draw a circle in the current grid square
    if (random() < 0.5) {
        // Draw a circle
        ellipse(topLeftX + shapeSize / 2, topLeftY + shapeSize / 2, shapeSize, shapeSize);
    }
    }
}
}

  
  
function createGrid() {
noFill();
stroke("none"); // Set the color of the grid lines

// Calculate the size of each grid cell to fill the canvas based on G3
gridSize = Math.min((width - 2 * inset) / G3, (height - 2 * inset) / G3);

// Calculate the number of rows and columns based on the gridSize
rows = Math.floor((height - 2 * inset) / gridSize);
cols = Math.floor((width - 2 * inset) / gridSize);
// console.log(G3, gridSize)

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

// Define pattern array
let patterns = [
    [fillX, fillCircles, wigVertA, wigVertA, wigVertA, wigHorzA],
    [wigVertA, wigHorzA, wigHorzA, wigVertA, wigVertA, wigHorzA],
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
    }
    // } else if(channel == 70) {
    //     w = map(value, 0, 127, 0, 255)  
    // } else if(channel == 71) {
    //     aH = map(value, 0, 127, 0.5, 10)  
    // } else if(channel == 72) {
    //     mL = map(value, 0, 127, -100, 100)  
    // } else if (channel == 77) {
    //     rows = map(value, 0, 127, 1, 10)
    // } else if (channel == 78) {
    //     cols = map(value, 0, 127, 1, 10)
    // }
}