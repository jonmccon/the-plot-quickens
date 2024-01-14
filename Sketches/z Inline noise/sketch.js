// -----------------------------------
// INLINE NOISE
// -----------------------------------

// Basics
function setup() {
  createCanvas(400, 400, SVG);
  noLoop()
  colorMode(HSL)
}

// Generative lines
function randomLines() {
  background("antiquewhite");

  let loops = 1;
  while (loops--) {
    // line(random(50,350),random(50,350),random(50,350),random(50,350));  
    // a vertical line with noise
    line(width/2, 350, width/2, 50);  
    arc(width/2, 350, 100, 100, random([HALF_PI, PI, 3*HALF_PI]), random([HALF_PI, PI, 3*HALF_PI]));

  }

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