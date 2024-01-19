
// Global variables
let size;
let numPoints;

// Basics
function setup() {
  createCanvas(600, 600, SVG);
  noLoop()
  colorMode(HSL)
  background("antiquewhite");

  size = height / 3;
  numPoints = Math.floor(random(2, 7));

}



function drawBasePoints() {
  stroke('red'); // Change the color to red
  strokeWeight(5); // Change the stroke weight to 5
  for (let i = 0; i < numPoints; i++) {
    let y = height / 2 - size * (i / (numPoints - 1));
    point(width / 2, y);
  }
  strokeWeight(1); // Change the stroke weight back to 1
  stroke('black'); // Change the color back to black
}


// Download SVG when clicked
function mousePressed(){
  save("mySVG.svg"); // give file name
  print("saved svg");
}

// Puts it all together so it doesn't run every time
var myFunctions = [drawBasePoints, mousePressed];
var index = 0;
function draw(){
  myFunctions[index]();
}