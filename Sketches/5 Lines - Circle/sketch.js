// Basics
function setup() {
  createCanvas(400, 400, SVG);
  noLoop()
  colorMode(HSL)
}

// Generative lines
function randomLines() {
  background("antiquewhite");

  let loops = 5;
  while (loops--) {
    line(random(50,350),random(50,350),random(50,350),random(50,350));   
  }
  circle(random(50,350), random(50,350), random(20,60));
}


// Download SVG when clicked
function mousePressed(){
  save("mySVG.svg"); // give file name
  print("saved svg");
}

// Puts it all together so it doesn't run every time
var myFunctions = [randomLines, mousePressed];
var index = 0;
function draw(){
  myFunctions[index]();
}