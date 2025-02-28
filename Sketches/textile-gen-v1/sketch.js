// Environment
let osc;
let env;
let capture;


// Grid Starts
let gridSize = 100; // Define the size of the grid squares
let inset = 100; // Define the inset from the canvas
let rows, cols; // Declare rows and cols variables
let seed;

// Initialize an array to store mouse positions
let touchPositions = [];
let tempTouchPositions = [];

// Pattern weight values
let fillXweight = 1;
let sineWeight = 1;
let wigVertWeight = 1;
let wigHorzWeight = 1;
let squigglyLinesWeight = 0;

let linesNoiseWeight = 1;
let verticalLinesWeight = 1;


let borderWeights = {
    topLeft: 1,
    topRight: 1,
    bottomLeft: 1,
    bottomRight: 1,
    leftTop: 1,
    leftBottom: 1,
    rightTop: 1,
    rightBottom: 1
};

// Pattern weight functions
let frontPatternWeights = {
  get fillX() {
    return fillXweight;
  },
  get sine() {
    return sineWeight;
  },
  get wigVert() {
    return wigVertWeight;
  },
  get wigHorz() {
    return wigHorzWeight;
  },
  get squigglyLines() {
    return squigglyLinesWeight;
  }
};

let backPatternWeights = {
  get linesNoise() {
    return linesNoiseWeight;
  },
  get verticalLines() {
    return verticalLinesWeight;
  },
};

let borderPatternWeights = {
  get topLeft() {
    return borderWeights.topLeft;
  },
  get topRight() {
    return borderWeights.topRight;
  },
  get bottomLeft() {
    return borderWeights.bottomLeft;
  },
  get bottomRight() {
    return borderWeights.bottomRight;
  },
  get leftTop() {
    return borderWeights.leftTop;
  },
  get leftBottom() {
    return borderWeights.leftBottom;
  },
  get rightTop() {
    return borderWeights.rightTop;
  },
  get rightBottom() {
    return borderWeights.rightBottom;
  }
};

console.log(fillXweight, sineWeight, linesNoiseWeight, wigVertWeight, wigHorzWeight);
console.log(borderWeights);

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

let W1 = 8; // Density of Horz Wiggle
let W2 = 12; // Density of Vert Wiggle

let L1 = 20; // Number of Lines
let L2 = 0.01; // Amount of Noise
let L3 = 77; // Noise variation

let S1 = 6 // proportion of Cone Units
let S2 = 0 // number of concentric circles



// Basics
function setup() {
    // Decide on a paper size and make a TPQ mark appropriately
    // 100 x 100 canvas is 1.4 inches square
    // 200 x 200 canvas is 2.8 inches square
    // 225 x 225 canvas is 3.1 inches square
    // 300 x 300 canvas is 4.2 inches square
    // 400 x 400 canvas is 5.5 inches square
    // 450 x 450 canvas is 6.2 inches square
    // 500 x 500 canvas is 6.9 inches square
    // 600 x 600 canvas is 8.3 inches square
    // 650 x 650 canvas is 9 inches square
    // 700 x 700 canvas is 9.7 inches square
    // 800 x 800 canvas is 11.1 inches square
    createCanvas(500, 500, SVG);
    background("lightblue");
    noLoop();



    // Front randomix
    // Wiggle count
        W1 = Math.ceil(random(1, 10)) * 2;    
        W2 = Math.ceil(random(1, 10)) * 2;  
    
    // Line noise
        L1 = Math.ceil(random(10, 30));
        L2 = random(0, 0.05);
        L3 = random(1, 100);
    
    // Sine Wave
        S1 = random(5, 15);
        S2 = random(-100, 100);

    // Fill X Primitives
        X1 = random(1, 10);

    // Squiggly Lines


    
    // Back randomix
    // Vertical lines

    // Define weights for interrupters
    let interrupterWeights = {
      top: { null: 4, circle: 1, asterisk: 1, perpendicular: 1 },
      bottom: { null: 2, circle: 1, asterisk: 1, perpendicular: 1 },
      left: { null: 2, circle: 1, asterisk: 1, perpendicular: 1 },
      right: { null: 2, circle: 1, asterisk: 1, perpendicular: 1 }
    };

    


    frontPattern = selectPatternWithWeight(frontPatternWeights);
    backPattern = selectPatternWithWeight(backPatternWeights);
    borderPattern = selectBorderWithWeight(borderWeights, interrupterWeights);

    let btnRefresh = createButton('Gimme New Ones!');
    btnRefresh.position(25, 25); // Adjust position as needed
    btnRefresh.style('font-size', '10px');
    btnRefresh.style('font-family', 'Google Sans');
    btnRefresh.style('font-weight', 'Bold');
    // btnRefresh.style('padding', '10px');
    btnRefresh.style('border-radius', '10px');
    btnRefresh.style('border', '2px solid black');
    btnRefresh.style('background-color', 'white');
    btnRefresh.mousePressed(redrawSketch);

    let btnDownload = createButton('Print This!');
    btnDownload.position(125, 25); // Adjust position as needed
    btnDownload.style('font-size', '10px');
    btnDownload.style('font-family', 'Google Sans');
    btnDownload.style('font-weight', 'Bold');
    // btnDownload.style('padding', '10px');
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
    // stroke("black"); // Set the color of the grid lines
    // for (let j = 0; j <= cols; j++) {
    //     let x = j * gridSize + inset;
    //     line(x, inset, x, height - inset); // Draw vertical line
    // }

    // // Draw horizontal lines
    // stroke("black"); // Set the color of the grid lines
    // for (let i = 0; i <= rows; i++) {
    //     let y = i * gridSize + inset;
    //     line(inset, y, width - inset, y); // Draw horizontal line
    // }
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

function drawValues() {
// Construct the display string 

let S1Display = Math.ceil(S1);
let S2Display = Math.ceil(S2);
let L2Display = Math.ceil(map(L2, 0, 0.05, 0, 100));
let L3Display = Math.ceil(map(L3, 0, 200, 0, 100));


let displayText = 
    `SEACREATES SUMMER 24 -- @THEPLOTQUICKENS \n` +
    `EDITION: ${G1}` + `${W1}` + `${W2}` + `${L1}` + `${L2Display}` + `${L3Display}` + `${S1Display}` + `${S2Display}`;
    

 textFont('SLF Engineer Hairline');
 text(displayText, 150, 500); // Adjust x, y positions as needed
}

function drawLines(x1, y1, x2, displayValues) {
    for (let i = 0; i < displayValues.length; i++) {
        line(x1 + i * 2.2, y1, x2 + i * 2.2, y1 + displayValues[i]);
    }
}

function drawValuesGraph() {
    let W1Display = map(W1, 0, 20, 0, 30);
    let W2Display = map(W2, 0, 20, 0, 30);
    let L1Display = map(L1, 0, 30, 0, 30);
    let L2Display = map(L2, 0, 0.05, 0, 30);
    let L3Display = map(L3, 0, 200, 0, 30);
    let S1Display = map(S1, 0, 15, 0, 30);
    let S2Display = map(S2, -100, 100, 0, 30);
    let G1Display = map(G1, 1, 5, 0, 30);

    let displayValues = [W1Display, W2Display, L1Display, L2Display, L3Display, S1Display, S2Display, G1Display];

    let x1 = width * .88 + 23;
    let y1 = height * .88;
    let x2 = width * .88 + 23;

    stroke("black");

    drawLines(x1, y1, x2, displayValues);
}

// Puts it all together so it doesn't run every time
function draw() {

        // Draw border pattern
        let borderSize = Math.min(width, height) * 0.75;
        let borderX = (width - borderSize) / 2;
        let borderY = (height - borderSize) / 2;
        borderPattern(borderX, borderY, borderSize);
    
        
        let patternSize = Math.min(width, height) / 2;
        let patternX = (width - patternSize) / 2;
        let patternY = (height - patternSize) / 2;
        
        // Draw back pattern
        backPattern(patternX * 0.8, patternY * 0.8, patternSize * 1.2);
    
        // Draw front pattern
        frontPattern(patternX, patternY, patternSize);



    // createGrid();
    // drawPatterns();
    // drawValuesGraph();
    // drawValues();
    // drawtouchPositions();
    // mousePressed();
    // mouseReleased();



    // MIDI Channel Mappings
    // we're using 102 - 117

    
}



