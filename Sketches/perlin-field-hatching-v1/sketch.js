let res = 1;
let lineThickness = 2; // Fixed line thickness
let noiseScaleR = 0.001; 
let noiseScaleG = 0.005; 
let noiseScaleB = 0.005; 

function setup() {
  createCanvas(200, 200, SVG); // Set canvas size
  noFill();
  strokeWeight(lineThickness);

  // Create a button to save the SVG
  let saveButton = createButton("Save SVG");
  saveButton.position(10, height + 10); // Position the button below the canvas
  saveButton.mousePressed(() => save("crosshatch_art.svg")); // Save on click

  // Create continuous lines for each color channel
  for (let j = 0; j < height; j += res) {
    // Red lines
    stroke(255, 0, 0, 50); // Red with transparency
    beginShape();
    for (let i = 0; i < width; i += res) {
      let r = noise(i * noiseScaleR, j * noiseScaleR) * 255; // Red channel
      let rDensity = map(r, 0, 255, 2, 10); // More brightness = less density
      vertex(i, j + rDensity); // Add vertex for red line
    }
    endShape();

    // Green lines
    stroke(0, 255, 0, 50); // Green with transparency
    beginShape();
    for (let i = 0; i < width; i += res) {
      let g = noise(i * noiseScaleG + 100, j * noiseScaleG + 100) * 255; // Green channel
      let gDensity = map(g, 0, 255, 2, 10);
      vertex(i, j + gDensity); // Add vertex for green line
    }
    endShape();

    // Blue lines
    stroke(0, 0, 255, 50); // Blue with transparency
    beginShape();
    for (let i = 0; i < width; i += res) {
      let b = noise(i * noiseScaleB + 200, j * noiseScaleB + 200) * 255; // Blue channel
      let bDensity = map(b, 0, 255, 2, 10);
      vertex(i, j + bDensity); // Add vertex for blue line
    }
    endShape();
  }
}