idea:

let touchPositions = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize SVG element
  createCanvas(windowWidth, windowHeight, SVG);
  noLoop();
}

function draw() {
  // This function is intentionally left empty
}

function touchStarted() {
  if (getAudioContext().state === 'suspended') {
    getAudioContext().resume();
  }
  touchPositions = [];
}

function touchMoved() {
  touchPositions.push(createVector(mouseX, mouseY));
  drawTemporaryLine();
  return false; // Prevent default behavior
}

function touchEnded() {
  savePermanentLine();
  return false; // Prevent default behavior
}

function drawTemporaryLine() {
  clear();
  if (touchPositions.length > 1) {
    for (let i = 1; i < touchPositions.length; i++) {
      line(touchPositions[i-1].x, touchPositions[i-1].y, touchPositions[i].x, touchPositions[i].y);
    }
  }
}

function savePermanentLine() {
  beginShape();
  stroke("black");
  strokeWeight(2);
  for (let i = 0; i < touchPositions.length; i++) {
    vertex(touchPositions[i].x, touchPositions[i].y);
  }
  endShape();
  strokeWeight(1);
  touchPositions = [];
}

function redrawSketch() {
  // Update any variables or states as needed before redrawing
  patterns = initializePatterns(rows, cols); // Re-initialize patterns for new drawing
  clear(); // Clear the canvas
  redraw(); // Redraw the canvas
  console.log("Redrawn sketch");
}