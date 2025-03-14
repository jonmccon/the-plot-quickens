var channel, value, on;


if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);

    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
      console.log(input);
    }
}

function getMIDIMessage(midiMessage) {
    value = midiMessage.data[2];
    channel = midiMessage.data[1];
    on = midiMessage.data[0];

    // Log all midi data
    // console.log(`MIDI Message received. Value: ${value}, Channel: ${channel}, On: ${on}`);
}