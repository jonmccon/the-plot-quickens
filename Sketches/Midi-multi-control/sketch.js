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

let fillXweight = 1;
let sineWeight = 2;
let linesNoiseWeight = 2;
let wigVertWeight = 4;
let wigHorzWeight = 5;



let patternWeights = {
  get fillX() {
    return fillXweight;
  },
  get sine() {
    return sineWeight;
  },
  get linesNoise() {
    return linesNoiseWeight;
  },
  get wigVert() {
    return wigVertWeight;
  },
  get wigHorz() {
    return wigHorzWeight;
  }
};

console.log(fillXweight, sineWeight, linesNoiseWeight, wigVertWeight, wigHorzWeight);

// Function to get a weight for a specific pattern
function getPatternWeight(patternName) {
  if (patternWeights.hasOwnProperty(patternName)) {
    return patternWeights[patternName];
  } else {
    throw new Error("Pattern not found");
  }
}



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

let G1 = 3; // Number of grid units visible

let W1 = 4; // Density of Horz Wiggle
let W2 = 8; // Density of Vert Wiggle

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

    let btnRefresh = createButton('Gimme New Ones!');
    btnRefresh.position(25, 25); // Adjust position as needed
    btnRefresh.style('font-size', '18px');
    btnRefresh.style('font-family', 'Google Sans');
    btnRefresh.style('font-weight', 'Bold');
    btnRefresh.style('padding', '10px');
    btnRefresh.style('border-radius', '10px');
    btnRefresh.style('border', '2px solid black');
    btnRefresh.style('background-color', 'white');
    btnRefresh.mousePressed(redrawSketch);

    let btnDownload = createButton('Print This!');
    btnDownload.position(225, 25); // Adjust position as needed
    btnDownload.style('font-size', '18px');
    btnDownload.style('font-family', 'Google Sans');
    btnDownload.style('font-weight', 'Bold');
    btnDownload.style('padding', '10px');
    btnDownload.style('border-radius', '10px');
    btnDownload.style('border', '2px solid black');
    btnDownload.style('background-color', 'white');
    btnDownload.mousePressed(saveSvg);


    // open video capture
    // createCapture(VIDEO);
}

// for a custom usb camera, use the location device1 etc
//  deviceId: {myPreferredCameraDeviceId}, 

  
  
function createGrid() {
    noFill();

    // Calculate the size of each grid cell to fill the canvas based on G1
    gridSize = Math.min((width - 2 * inset) / G1, (height - 2 * inset) / G1);

    // Calculate the number of rows and columns based on the gridSize
    rows = Math.floor((height - 2 * inset) / gridSize);
    cols = Math.floor((width - 2 * inset) / gridSize);

    // Draw vertical lines
    stroke("none"); // Set the color of the grid lines
    for (let j = 0; j <= cols; j++) {
        let x = j * gridSize + inset;
        line(x, inset, x, height - inset); // Draw vertical line
    }

    // Draw horizontal lines
    stroke("none"); // Set the color of the grid lines
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
        L2 = map(value, 0, 127, 0, 0.05);
    } else if(channel == 107) {
        L3 = map(value, 0, 127, 1, 200);
    } else if(channel == 108) {
        S1 = map(value, 0, 127, 1, 15);
    } else if(channel == 109) {
        S2 = map(value, 0, 127, -100, 100);
    }
}






// weighted midi bits
    // } else if(channel == 111) {
    //     fillXweight = Math.ceil(map(value, 0, 127, 1, 10));
    // } else if(channel == 112) {
    //     sineWeight = map(value, 0, 127, 1, 10);
    // } else if(channel == 113) {
    //     linesNoiseWeight = map(value, 0, 127, 1, 10);
    // } else if(channel == 114) {
    //     wigVertWeight = map(value, 0, 127, 1, 10);
    // } else if(channel == 115) {
    //     wigHorzWeight = map(value, 0, 127, 1, 10);
    // } 
