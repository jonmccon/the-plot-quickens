
// Midi watcher
function touchStarted() {
    console.log('Before touchStarted:', getAudioContext().state);
    if (getAudioContext().state === 'suspended') {
      getAudioContext().resume();
    }
    // console.log('After touchStarted:', getAudioContext().state);
}

// Mouse watcher
function mousePressed() {
    // console.log('Before mousePressed:', getAudioContext().state);
    if (getAudioContext().state === 'suspended') {
      getAudioContext().resume();
    }
    // console.log('After mousePressed:', getAudioContext().state);
}