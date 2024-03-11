
// Environment
let osc;
let env;

let x = 100;
let y = 100;
let size = 100;
let r = 0;
let g = 0;
let b = 0;


// Basics
function setup() {
  createCanvas(800, 800, SVG);
  // colorMode(HSL)
}

function touchStarted() {
  console.log('Before touchStarted:', getAudioContext().state);
  if (getAudioContext().state === 'suspended') {
    getAudioContext().resume();
  }
  // console.log('After touchStarted:', getAudioContext().state);
}

function mousePressed() {
  console.log('Before mousePressed:', getAudioContext().state);
  if (getAudioContext().state === 'suspended') {
    getAudioContext().resume();
  }
  // console.log('After mousePressed:', getAudioContext().state);
}

function draw() {
  // if (getAudioContext().state !== 'running') {
  //   console.log('AudioContext is not running');
  // }
  // if (getAudioContext().state === 'running') {
  //   console.log('AudioContext is running correctly');
  // }
  
 background(220);
  
  if(channel == 74) {
  x = map(value, 0, 127, 0, width)   
  } else if(channel == 75) {
     y = map(value, 0, 127, 0, height)  
  } else if(channel == 76) {
     size = map(value, 0, 127, 20, 300);  
  } else if(channel == 70) {
    r = map(value, 0, 127, 0, 255)  
  } else if(channel == 71) {
     g = map(value, 0, 127, 0, 255)  
  } else if(channel == 72) {
     b = map(value, 0, 127, 0, 255)  
  }
  fill(r, g, b);
  ellipse(x, y, size)

}




// ---------------------
// Download SVG when clicked
function mousePressed(){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    save("MidiTest.svg"); // give file name
    print("saved svg");
  }
}
