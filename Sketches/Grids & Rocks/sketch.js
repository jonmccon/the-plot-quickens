
// Basics
function setup() {
  createCanvas(800, 800, SVG);
  noLoop()
  colorMode(HSL)
}

let gridSize = 2; // Define the size of the grid squares
let inset = 200; // Define the inset from the canvas

function dist(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}


let centerPoints = [
  { x: -10, y: 50, numCircles: 15 },
  { x: 50, y: 0, numCircles: 15 },
  // { x: 150, y: 50, numCircles: 15 },
];




function createGrid() {
  background("antiquewhite");
  noFill();
  stroke(0, 0, 0); // Set the color as you want

  // Generate the points where the circles will be
  let circlePoints = [];
  for (let centerPoint of centerPoints) {
    let circles = Array.from({ length: centerPoint.numCircles }, (_, i) => ({
      x: centerPoint.x,
      y: centerPoint.y,
      radius: gridSize * (i + 1), // each circle's radius is a multiple of gridSize
    }));
    circlePoints.push(...circles);
  }

  // Calculate the number of rows and columns based on the canvas size, grid size and inset
  let rows = (height - 2 * inset) / gridSize;
  let cols = (width - 2 * inset) / gridSize;

  push(); // Save the current transformation matrix
  translate(width / 2, height / 2); // Move the origin to the center of the canvas

  // Draw the grid lines
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = j * gridSize - width / 2 + inset;
      let y = i * gridSize - height / 2 + inset;

      // Initialize variables to store the start and end points of the line
      let startX = x, startY = y, endX = x + gridSize, endY = y;

      // Check if the line intersects with any of the polygons
      let shouldDraw = true;
      for (let k = 0; k < circlePoints.length; k += 2) {
        let point1 = circlePoints[k];
        let point2 = circlePoints[k + 1];

        // Generate the points of the polygon
        let polygon = [];
        for (let angle = 0; angle < TWO_PI; angle += 0.01) {
          let x, y;
          if (angle < PI) {
            x = point1.x + point1.radius * cos(angle);
            y = point1.y + point1.radius * sin(angle);
          } else {
            x = point2.x + point2.radius * cos(angle);
            y = point2.y + point2.radius * sin(angle);
          }
          polygon.push({ x, y });
        }

        let d1 = pointInPolygon(startX, startY, polygon);
        let d2 = pointInPolygon(endX, endY, polygon);
        if (d1 || d2) {
          // If either end of the line is inside the polygon, do not draw the line
          shouldDraw = false;
          break;
        }
      }

      if (shouldDraw) {
        line(startX, startY, endX, endY);
      }
    }
  }

  // Sort the circlePoints in descending order of radius
  circlePoints.sort((a, b) => b.radius - a.radius);

  for (let i = 0; i < circlePoints.length; i += 2) {
    let point1 = circlePoints[i];
    let point2 = circlePoints[i + 1];
    roundedPolygon([point1, point2]);
  }

  pop(); // Restore the transformation matrix
}

function roundedPolygon(points) {
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.01) {
    // Find the point with the maximum radius for this angle
    let maxPoint = points[0];
    let maxRadius = maxPoint.radius * (1 + cos(angle - atan2(maxPoint.y, maxPoint.x)) / 2);
    for (let i = 1; i < points.length; i++) {
      let point = points[i];
      let radius = point.radius * (1 + cos(angle - atan2(point.y, point.x)) / 2);
      if (radius > maxRadius) {
        maxPoint = point;
        maxRadius = radius;
      }
    }

    // Add the vertex for this angle
    let x = maxPoint.x + maxRadius * cos(angle);
    let y = maxPoint.y + maxRadius * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function pointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i].x, yi = polygon[i].y;
    let xj = polygon[j].x, yj = polygon[j].y;

    let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Download SVG when clicked
function mousePressed(){
  save("mySVG.svg"); // give file name
  print("saved svg");
}

// Puts it all together so it doesn't run every time
var myFunctions = [createGrid, mousePressed];
var index = 0;
function draw(){
  if (index < myFunctions.length) {
    myFunctions[index]();
  }
}