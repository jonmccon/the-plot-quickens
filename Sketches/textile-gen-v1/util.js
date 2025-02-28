

// Save and add Timestamp to filename
function saveSvg() {
  const currentTime = new Date().toISOString().replace(/[-:.]/g, '');
  save(`bayviewTextile_${currentTime}.svg`); // give file name with current time
  console.log("Saved SVG at", currentTime);
}

// Save for Automator
// function saveSvg() {
//   save(`SCCfall24.svg`); // give file name 
//   console.log("Saved SVG at", currentTime);
// }
