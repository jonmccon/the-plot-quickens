// Environment



// Grid Starts
// let seed;



// Pattern weight values
let fillXweight = 1;
let sineWeight = 1;
let wigVertWeight = 1;
let wigHorzWeight = 1;
let squigglyLinesWeight = 0;

let linesNoiseWeight = 1;
let verticalLinesWeight = 1;



let borderWeights = {};


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




// ideally each var is going to need a min and max that's propotional to the grid size

let G1 = 3; // Number of grid units visible

let W1 = 8; // Density of Horz Wiggle
let W2 = 12; // Density of Vert Wiggle

let L1 = 20; // Number of Lines
let L2 = 0.01; // Amount of Noise
let L3 = 77; // Noise variation

let S1 = 6 // proportion of Cone Units
let S2 = 0 // number of concentric circles


let iterationCount = 0;
const maxIterations = 10; // Set the desired number of iterations

// Basics
function setup() {
    // Decide on a paper size and make a TPQ mark appropriately
    // 100 x 100 canvas is 1.4 inches square
    // 200 x 200 canvas is 2.8 inches square
    // 215 x 215 canvas is 3 inches square
    // 225 x 225 canvas is 3.1 inches square
    // 300 x 300 canvas is 4.2 inches square
    // 400 x 400 canvas is 5.5 inches square
    // 450 x 450 canvas is 6.2 inches square
    // 500 x 500 canvas is 6.9 inches square
    // 600 x 600 canvas is 8.3 inches square
    // 650 x 650 canvas is 9 inches square
    // 700 x 700 canvas is 9.7 inches square
    // 800 x 800 canvas is 11.1 inches square
    createCanvas(215, 215, SVG);
    // noLoop();

}

function draw() {
// figure how to componentizwe this a bit more to allow for setting up multiple patterns on page
// confirm color use for mockups
background("lightblue");

let interrupterWeights = {
  top: { null: 4, circle: 1, asterisk: 1, perpendicular: 1 },
  bottom: { null: 2, circle: 1, asterisk: 1, perpendicular: 1 },
  left: { null: 2, circle: 1, asterisk: 1, perpendicular: 1 },
  right: { null: 2, circle: 1, asterisk: 1, perpendicular: 1 }
};

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

    X1 = random(1, 10);



// Back randomix
// Vertical lines

// random border weights
function getRandomBorderWeights() {
  return {
      topLeft: Math.round(Math.random()),
      topRight: Math.round(Math.random()),
      bottomLeft: Math.round(Math.random()),
      bottomRight: Math.round(Math.random()),
      leftTop: Math.round(Math.random()),
      leftBottom: Math.round(Math.random()),
      rightTop: Math.round(Math.random()),
      rightBottom: Math.round(Math.random())
  };
}
borderWeights = getRandomBorderWeights();

frontPattern = selectPatternWithWeight(frontPatternWeights);
backPattern = selectPatternWithWeight(backPatternWeights);
borderPattern = selectBorderWithWeight(borderWeights, interrupterWeights);


if (iterationCount >= maxIterations) {
  noLoop(); // Stop the loop after the desired number of iterations
  return;
}

        // Draw border pattern
        stroke("green");
        let borderSize = Math.min(width, height) * 0.9;
        let borderX = (width - borderSize) / 2;
        let borderY = (height - borderSize) / 2;
        borderPattern(borderX, borderY, borderSize, borderWeights);
    
        
        let patternSize = Math.min(width, height) / 2;
        let patternX = (width - patternSize) / 2;
        let patternY = (height - patternSize) / 2;
        
        // Draw back pattern
        stroke("blue");
        backPattern(patternX * 0.5, patternY * 0.5, patternSize * 1.5);
    
        // Draw front pattern
        stroke("red");
        frontPattern(patternX * 0.8, patternY * 0.8, patternSize * 1.2);

        // saveSvg();
        clear();
        iterationCount++;

}



