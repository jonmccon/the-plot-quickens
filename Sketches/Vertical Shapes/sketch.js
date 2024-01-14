// -----------------------------------
// Vertically aligned shapes
// -----------------------------------

function setup() {
  // createCanvas(55, 91, SVG);
  createCanvas(220, 364, SVG);
  noLoop();
  noFill();
  rectMode(CENTER);
  colorMode(HSL)
  background("antiquewhite");
}

function lineShapes() {
  let circles = 2;

  let rects = 1;
  let rectSize = random(10, 80);

  let triangles = 2;
  let triSize = random(10, 60);
  let tX2 = width/2;
  let tY2 = height*random(.2,.8);
  let tX1 = tX2-triSize;
  let tY1 = tY2+1.5*triSize;
  let tX3 = tX2+triSize;
  let tY3 = tY2+1.5*triSize;
  
  let cX1 = random(20, 70);
  let cY1 = random(20, 320);
  let cX2 = cX1+5;
  let cY2 = cY1+5;
  let cX3 = cX1
  let cY3 = cY2
  let cX4 = cX2
  let cY4 = cY1
  
  let cX5 = random(150, 200);
  let cY5 = random(20, 320);
  let cX6 = cX5+5;
  let cY6 = cY5+5;
  let cX7 = cX5
  let cY7 = cY6
  let cX8 = cX6
  let cY8 = cY5

// Centerline
  line(width/2, height*.85, width/2, height*.15);   
  

// Shapes on center
  while (circles--) {
  circle(width/2, height*random(.2,.8), random(5, 130));}
  
  while (rects--) {
  rect(width/2, height*random(.2,.8), rectSize, rectSize);}
  
  while (triangles--) {
  triangle(tX1, tY1, tX2, tY2, tX3, tY3);}

  
// // //
// //   Cross lines
  line(cX1, cY1, cX2, cY2);
  line(cX3, cY3, cX4, cY4);
  
  line(cX5, cY5, cX6, cY6);
  line(cX7, cY7, cX8, cY8);
  
  
  // line(tX1-5, tY1+5, tX1-10, tY1+10);
  // line(tX1-2.5, tY1-2.5, tX1-7.5, tY1-7.5)  
  // line(tX1-5, tY1-5, tX1-10, tY1-10)


}

// // // // // // // // // // // // // // 
// Download SVG when clicked
function mousePressed(){
  save("mySVG.svg"); // give file name
  print("saved svg");
}

// Puts it all together so it doesn't run every time
var myFunctions = [lineShapes, mousePressed];
var index = 0;
function draw(){
  myFunctions[index]();
}