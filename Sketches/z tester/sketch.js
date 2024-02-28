let svg;

function preload() {
  svg = loadSVG('../../svg/H.svg'); // replace with your SVG file path
}

function setup() {
  createCanvas(600, 600, SVG);

  // Extract the path data from the SVG
  let pathData = svg.elt.getElementsByTagName('path')[0].getAttribute('d');

  // Parse the path data
  let points = parsePathData(pathData);

  // Use the points to create the seed nodes
  diffLine = new DifferentialLine(0.9, 1, 25, 0.9, 5);
  for (let point of points) {
    let pos = createVector(point[0], point[1]);
    diffLine.addNode(pos);
  }

  // Rest of your setup code...
}

// Function to parse the path data
function parsePathData(data) {
  let commands = data.split(/(?=[a-z])/i);
  let points = [];
  for (let command of commands) {
    let type = command[0];
    let coords = command.slice(1).trim().split(/[\s,]+/).map(Number);
    if (type.toLowerCase() === 'm' || type.toLowerCase() === 'l') {
      points.push(coords);
    }
    // Add more cases for other command types if needed
  }
  return points;
}