


//
// Midi watcher
//
function touchStarted() {
    console.log('Before touchStarted:', getAudioContext().state);
    if (getAudioContext().state === 'suspended') {
      getAudioContext().resume();
    }
    // console.log('After touchStarted:', getAudioContext().state);
}



//
// Mouse watcher
//
function drawMousePositions() {
  // Check if there are enough points to draw
  if (mousePositions.length > 1) {
    for (let i = 1; i < mousePositions.length; i++) {
      line(mousePositions[i-1].x, mousePositions[i-1].y, mousePositions[i].x, mousePositions[i].y);
    }
  }
}


function mousePressed() {
    // console.log('Before mousePressed:', getAudioContext().state);
    if (getAudioContext().state === 'suspended') {
      getAudioContext().resume();
    }
    mousePositions = [];
    // console.log('After mousePressed:', getAudioContext().state);
}

function mouseDragged() {
  mousePositions.push(createVector(mouseX, mouseY));
  // Optionally, draw the line in real-time as well
  if (mousePositions.length > 1) {
    let len = mousePositions.length;
    line(mousePositions[len - 2].x, mousePositions[len - 2].y, mousePositions[len - 1].x, mousePositions[len - 1].y);
  }
  console.log(mousePositions)
}



function mouseReleased() {
  // Optionally, handle mouseReleased logic here
  // For example, you could draw the entire path again for any reason, or handle end of drawing logic
}


//
// Download SVG spacebar
//
var spacebarWasPressed = false;

function keyPressed() {
  if (key === ' ' && !spacebarWasPressed) {
    saveSvg();
    spacebarWasPressed = true;
  }
}

function keyReleased() {
  if (key === ' ') {
    spacebarWasPressed = false;
  }
}

function saveSvg(){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    save("midiTest.svg"); // give file name
    print("saved svg");
  }
}
