


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
function drawtouchPositions() {
  // Check if there are enough points to draw
  if (touchPositions.length > 1) {
    for (let i = 1; i < touchPositions.length; i++) {
      line(touchPositions[i-1].x, touchPositions[i-1].y, touchPositions[i].x, touchPositions[i].y);
    }
  }
}


function touchStarted() {
    // console.log('Before mousePressed:', getAudioContext().state);
    if (getAudioContext().state === 'suspended') {
      getAudioContext().resume();
    }
    touchPositions = [];
    // console.log('After mousePressed:', getAudioContext().state);
}

function touchMoved() {
  touchPositions.push(createVector(mouseX, mouseY));
  // Optionally, draw the line in real-time as well
}


function touchEnded() {
  beginShape();
  stroke("black");
  strokeWeight(2);
  for (let i = 0; i < touchPositions.length; i++) {
    vertex(touchPositions[i].x, touchPositions[i].y);
  }
  endShape(); 
  strokeWeight(1);
}



//
// Button refresh
//
function redrawSketch() {
  // Update any variables or states as needed before redrawing
  patterns = initializePatterns(rows, cols); // Re-initialize patterns for new drawing
  clear(); // Clear the canvas
  redraw(); // Redraw the canvas
  console.log("Redrawn sketch");
}


//
// Download SVG spacebar
//
// var spacebarWasPressed = false;

// function keyPressed() {
//   if (key === ' ' && !spacebarWasPressed) {
//     saveSvg();
//     spacebarWasPressed = true;
//   }
// }

// function keyReleased() {
//   if (key === ' ') {
//     spacebarWasPressed = false;
//   }
// }

function saveSvg() {
  const currentTime = new Date().toISOString().replace(/[-:.]/g, '');
  save(`seacreates_${currentTime}.svg`); // give file name with current time
  console.log("Saved SVG at", currentTime);
}
