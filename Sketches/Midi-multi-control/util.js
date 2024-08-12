


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
}



function mouseReleased() {
  beginShape();
  stroke("black");
  strokeWeight(2);
  for (let i = 0; i < mousePositions.length; i++) {
    vertex(mousePositions[i].x, mousePositions[i].y);
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
