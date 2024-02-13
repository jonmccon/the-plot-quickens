function setup() {
  createCanvas(600, 600, SVG);
  background(255);
  colorMode(HSL);
  // stroke(0);
  // strokeWeight(1);
  noFill();
}

let scale = 50;
let resolution = 0.008;
let radius = 200;
// Tight ballpoint
// let numPoints = 100;
// let numRings = 100;
// loose mildliner
let numPoints = 30;
let numRings = 50;

function sine() {
  translate(width / 6, height / 6);
  var startAngle = random(TAU); // random start angle
  for (r = 0; r < radius; r += radius / numRings) {
    beginShape();
    for (a = startAngle; a < TAU + startAngle; a += TAU / numPoints) {
      var x = 200 + r * cos(a);
      var y = 200 + r * sin(a);

      var n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

      curveVertex(x + n, y + n);
      stroke('#EB220E')
    }
    endShape(CLOSE);
    beginShape();
    for (a = startAngle; a < TAU + startAngle; a += TAU / numPoints) {
      var x = 200 + r * cos(a);
      var y = 200 + r * sin(a);

      var n = map(noise(x * resolution, y * resolution), 1, 0, -scale, scale);

      curveVertex(x + n, y + n);
      stroke('#2578E6')
    }
    endShape(CLOSE);
  }
  noLoop();
}

//////////////////////////////////////////////////
// Download SVG when clicked
function mousePressed(){
  save("mySVG.svg"); // give file name
  print("saved svg");
}

// Puts it all together so it doesn't run every time
var myFunctions = [sine, mousePressed];
var index = 0;
function draw(){
  myFunctions[index]();
}