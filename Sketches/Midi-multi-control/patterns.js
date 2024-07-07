  
function blankPattern(x, y, size) {
    // Do nothing
}


//
// Lines with Noise
//
function linesNoise(x, y, size) {
    let linesPerSquare = C1; // Number of parallel lines
    let lineSpacing = size / linesPerSquare; // Calculate spacing based on the square size and number of lines
    let noiseScale = C2; // Adjust this value to change the "zoom" level of the noise
    stroke("purple");

    push(); // Save the current drawing style settings and transformations
    translate(x, y); // Move the origin to x, y

    for (let i = 0; i < linesPerSquare; i++) {
        // Determine the starting edge: 0 = top, 1 = bottom, 2 = left, 3 = right
        let edge = i % 4;
        let startX, startY;
        if (edge === 0) { // Top
            startX = i * lineSpacing % size;
            startY = 0;
        } else if (edge === 1) { // Bottom
            startX = i * lineSpacing % size;
            startY = size;
        } else if (edge === 2) { // Left
            startX = 0;
            startY = i * lineSpacing % size;
        } else { // Right
            startX = size;
            startY = i * lineSpacing % size;
        }

        beginShape();
        vertex(startX, startY);
        let xOff = startX;
        let yOff = startY;
        for (let step = 0; step <= size; step += 5) {
            let noiseVal = noise(xOff * noiseScale, yOff * noiseScale, C3);
            let angle = noiseVal * TWO_PI;
            xOff += cos(angle) * 5;
            yOff += sin(angle) * 5;
            // Keep within bounds
            xOff = constrain(xOff, 0, size);
            yOff = constrain(yOff, 0, size);
            vertex(xOff, yOff);
        }
        endShape();
    }

    pop(); // Restore the previous drawing style settings and transformations
}



//    
// Cones
//
function cones(x, y, size) {
    let numberOfCircles = D1; // Use D1 to determine the number of rings
    let interval = size / numberOfCircles; // Calculate the size decrement for each circle

    // Adjust the center point based on D2 and D3
    let centerY = y; // Initially, the center point is not adjusted for perspective
    let centerX = x; // Initially, the center point is not moved left or right

    for (let i = 0; i < numberOfCircles; i++) {
        let diameter = size - i * interval;
        stroke(0, 0, 0); // Set stroke color to black
        noFill(); // No fill for the circles

        // Adjust the ellipse to be flatter based on D2
        let flattenFactor = map(D2 + i * (size / numberOfCircles), 0, size / 2, 1, 0.5); // Adjust this mapping as needed

        push(); // Save the current drawing style settings and transformations
        translate(centerX + (size/2), centerY + (size/2)); // Move the origin to the center of the ellipse
        rotate(radians(D3)); // Rotate the canvas by D3 radians
        ellipse(0, 0, diameter, diameter * flattenFactor); // Draw the ellipse at the new origin
        pop(); // Restore the previous drawing style settings and transformations
    }
}
    


//    
// Vert Wiggle
//
function wigVertA(x, y, size) {
    let linesPerSquare = G2; 
    let lineSpacing = size / linesPerSquare;
    let arcHeight = size / (1.5 * linesPerSquare);
    stroke("red");
    strokeWeight(1);

    beginShape();
    // Draw the first line as part of the shape
    vertex(x, y + arcHeight);
    
    for (let k = 0; k <= linesPerSquare; k++) {
        let lineX = x + k * lineSpacing;
        let nextLineX = x + (k + 1) * lineSpacing;
    
        if (k < linesPerSquare) {
            // Calculate the control points for the Bezier curve for all but the last iteration
            let cp1x = lineX;
            let cp1y = k % 2 === 0 ? y : y + size;
            let cp2x = nextLineX;
            let cp2y = k % 2 === 0 ? y : y + size;
    
            // Calculate the arcY based on the current line's y-coordinate and the arcHeight
            let arcY = k % 2 === 0 ? y + arcHeight : y + size - arcHeight;
    
            // Add a new vertex point at the start of each curve
            vertex(lineX, arcY);
    
            // Add the Bezier curve
            bezierVertex(cp1x, cp1y, cp2x, cp2y, nextLineX, arcY);
        } 
    }
    vertex(x + linesPerSquare * lineSpacing, y + arcHeight);
    
    // Complete the shape
    endShape();
}



//
// Horz Wiggle
//
function wigHorzA(x, y, size) {
    let linesPerSquare = G1;
    let lineSpacing = size / linesPerSquare;
    let arcHeight = size / (1.5 * linesPerSquare);
    stroke("blue");
    strokeWeight(1);

    beginShape();
    // Draw the first line as part of the shape, rotated by swapping x and y
    vertex(x + arcHeight, y);
    
    for (let k = 0; k <= linesPerSquare; k++) {
        let lineY = y + k * lineSpacing;
        let nextLineY = y + (k + 1) * lineSpacing;
    
        if (k < linesPerSquare) {
            // Calculate the control points for the Bezier curve for all but the last iteration, with swapped and adjusted coordinates
            let cp1y = lineY;
            let cp1x = k % 2 === 0 ? x : x + size;
            let cp2y = nextLineY;
            let cp2x = k % 2 === 0 ? x : x + size;
    
            // Calculate the arcX based on the current line's x-coordinate and the arcHeight, adjusted for rotation
            let arcX = k % 2 === 0 ? x + arcHeight : x + size - arcHeight;
    
            // Add a new vertex point at the start of each curve, with swapped coordinates
            vertex(arcX, lineY);
    
            // Add the Bezier curve with adjusted control points
            bezierVertex(cp1x, cp1y, cp2x, cp2y, arcX, nextLineY);
        } 
    }
    vertex(x + arcHeight, y + linesPerSquare * lineSpacing);
    
    // Complete the shape
    endShape();
}



//
// X's by grid, random
//
function fillX(x, y, size) {
    let numShapes = 20;
    let shapeSize = size / numShapes;

    // Set stroke properties
    stroke("red");
    strokeWeight(1);

    // Loop over the grid
    for (let i = 0; i < numShapes; i++) {
        for (let j = 0; j < numShapes; j++) {
        // Calculate the top left corner of the current grid square
        let topLeftX = x + i * shapeSize;
        let topLeftY = y + j * shapeSize;

        // Randomly decide whether to draw an 'X' in the current grid square
        if (random() < 0.5) {
            // Draw an 'X'
            line(topLeftX, topLeftY, topLeftX + shapeSize, topLeftY + shapeSize);
            line(topLeftX, topLeftY + shapeSize, topLeftX + shapeSize, topLeftY);
        }
        }
    }
}



//
// Circles by grid, random
//
function fillCircles(x, y, size) {
let numShapes = 10;
let shapeSize = size / numShapes;

// Set stroke properties
stroke("red");
strokeWeight(1);

// Loop over the grid
for (let i = 0; i < numShapes; i++) {
    for (let j = 0; j < numShapes; j++) {
    // Calculate the top left corner of the current grid square
    let topLeftX = x + i * shapeSize;
    let topLeftY = y + j * shapeSize;

    // Randomly decide whether to draw a circle in the current grid square
    if (random() < 0.5) {
        // Draw a circle
        ellipse(topLeftX + shapeSize / 2, topLeftY + shapeSize / 2, shapeSize, shapeSize);
    }
    }
}
}