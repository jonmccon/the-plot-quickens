// -----------------------------------
// lines artound a center point
// -----------------------------------


// Basics
function setup() {
  createCanvas(1000, 1000, SVG);
  noLoop()
  noFill();
  colorMode(HSL)
}

// Straight lines
// function randomLines() {
//   background("antiquewhite");

//   let cx = width / 2;
//   let cy = height / 2;
//   let length = 150; // make the lines shorter
//   let angle = random(TWO_PI); // generate a random angle
//   let angleDivergence = random(1, 12); // make the angle diverge more
//   let noiseOffset = 0;

//   for (let i = 0; i < 3; i++) {
//     let noiseValue = noise(noiseOffset);
//     let x1 = cx - length * cos(angle) + noiseValue * 10;
//     let y1 = cy - length * sin(angle) + noiseValue * 10;
//     let x2 = cx + length * cos(angle) + noiseValue * 10;
//     let y2 = cy + length * sin(angle) + noiseValue * 10;
//     line(x1, y1, x2, y2);
//     angle += TWO_PI / angleDivergence;
//     noiseOffset += 50;
//   }
// }

// Curved lines
function randomLines() {

  let cx = width / 2;
  let cy = height / 2;
  let length = 60; // make the lines shorter
  let angle = random(TWO_PI); // generate a random angle
  let angleDivergence = random(1, 12); // make the angle diverge more
  let noiseOffset = 0;

  let colors = ['red', 'green', 'blue']; // Define the colors for the lines

  for (let i = 0; i < 3; i++) {
    let noiseValue = noise(noiseOffset);
    let x1 = cx - length * cos(angle) + noiseValue * 10;
    let y1 = cy - length * sin(angle) + noiseValue * 10;
    let x2 = cx + length * cos(angle) + noiseValue * 10;
    let y2 = cy + length * sin(angle) + noiseValue * 10;

    // Generate random control points for the bezier curve
    let cp1x = x1 + random(-60, 60);
    let cp1y = y1 + random(-60, 60);
    let cp2x = x2 + random(-80, 20);
    let cp2y = y2 + random(-80, 20);

    stroke(colors[i]); // Set the color for the current line

    // Draw the bezier curve
    bezier(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2);

    angle += TWO_PI / angleDivergence;
    noiseOffset += 20;
  }
}


// Download SVG when clicked
function mousePressed(){
  save("mySVG.svg"); // give file name
  print("saved svg");
}


function draw(){
  background("antiquewhite");

  let gridSize = 4;
  let cellSize = width / gridSize;

  // Scale to fit the grid
  scale(0.8); // Adjust this value to fit the grid on the canvas

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Translate to the current grid cell relative to the center of the canvas
      translate((i - gridSize / 2 + 0.5) * cellSize, (j - gridSize / 2 + 0.5) * cellSize);
      randomLines();
      // Reset the transformation matrix to undo the translation for the next iteration
      resetMatrix();
    }
  }
}