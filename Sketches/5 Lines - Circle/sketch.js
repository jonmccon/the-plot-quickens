// Basics
function setup() {
  createCanvas(400, 400, SVG);
  noLoop()
  colorMode(HSL)
}

// Generative lines
function randomLines() {
  background("antiquewhite");

  // let loops = 5;
  for (let i = 0; i < 5; i++) {
    let y1 = random(50, 350);
    let y2 = random(50, 350);
    for (let j = 0; j < 10; j++) {
      let x1 = 150 + j * 2
      let x2 = 200 + j * 2
      line(x1, y1, x2, y2);
    }
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