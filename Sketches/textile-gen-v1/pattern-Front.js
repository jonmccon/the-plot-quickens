// Front Patterns


//
// sine concentric rings
//
function sine(x, y, size) {
    let scale = 50;
    let resolution = 0.008;
    let radius = size / 2; // Use the size parameter to control the radius
    let numPoints = 30;
    let numRings = S1;
    // var startAngle = L1 / size; // random start angle

    noiseSeed(S2); 

    // Calculate the center of the grid
    let centerX = size / 2;
    let centerY = size / 2;

    // Adjust x and y to start from the center of the grid
    x += centerX;
    y += centerY;

    for (let r = radius / numRings; r < radius; r += radius / numRings) {
        beginShape();
        for (let a = L1; a < TAU + L1; a += TAU / numPoints) {
            var offsetX = x + r * cos(a);
            var offsetY = y + r * sin(a);

            var n = map(noise(offsetX * resolution, offsetY * resolution), 0, 1, -scale, scale);

            curveVertex(offsetX + n, offsetY + n);
            stroke('#EB220E');
        }
        endShape(CLOSE);
    }
}
    


//    
// Vert Wiggle
//
function wigVert(x, y, size) {
    let linesPerSquare = W2; 
    let lineSpacing = size / linesPerSquare;
    let arcHeight = size / (1.5 * linesPerSquare);
    stroke("red");
    strokeWeight(1);

    beginShape();
    // Extend the first line to the height of the arcHeight
    vertex(x, y + size - arcHeight);
    
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
function wigHorz(x, y, size) {
    let linesPerSquare = W1;
    let lineSpacing = size / linesPerSquare;
    let arcHeight = size / (1.5 * linesPerSquare);
    stroke("blue");
    strokeWeight(1);

    beginShape();
    // Draw the first line as part of the shape, rotated by swapping x and y
    vertex(x + size - arcHeight, y);
    
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
// Primitives by grid, random
//
function fillX(x, y, size) {
    let numShapes = X1;
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
    
            // Randomly decide which shape to draw
            let shapeType = Math.floor(random() * 10); // Generates a random number between 0 and 4
    
            switch (shapeType) {
                case 0: // Draw an 'X'
                    line(topLeftX, topLeftY, topLeftX + shapeSize, topLeftY + shapeSize);
                    line(topLeftX, topLeftY + shapeSize, topLeftX + shapeSize, topLeftY);
                    break;
                case 1: // Draw a triangle
                    triangle(topLeftX + shapeSize / 2, topLeftY + 2, topLeftX, topLeftY + shapeSize, topLeftX + shapeSize, topLeftY + shapeSize);
                    break;
                case 2: // Draw a square
                    rect(topLeftX, topLeftY, shapeSize / 2, shapeSize / 2);
                    break;
                case 3: // Draw a circle
                    ellipse(topLeftX + shapeSize / 2, topLeftY + shapeSize / 2, shapeSize / 2, shapeSize / 2);
                    break;
                case 4: // Draw a smaller circle
                    ellipse(topLeftX + shapeSize / 3, topLeftY + shapeSize / 3, shapeSize / 3, shapeSize / 3);
                    break;
                case 5: // Leave a blank space
                    rect(topLeftX, topLeftY, shapeSize / 2, shapeSize / 2);
                    push();
                    translate(topLeftX + shapeSize / 2, topLeftY + shapeSize / 2);
                    rotate(PI / 4);
                    rect(0, 0, shapeSize / 2, shapeSize / 2);
                    pop();
                    break;
                case 6: // Leave a blank space
                    // Do nothing
                    break;
                case 7: // Leave a blank space
                    // Do nothing
                    break;
                case 8: // Leave a blank space
                    // Do nothing
                    break;  
                case 9: // Leave a blank space
                    // Do nothing
                    break;                
            }
        }
    }
}

function squigglyLines(x, y, size) {
    let numLines = 1; // Number of squiggly lines
    let maxSegments = 10; // Maximum number of segments per line
    let maxSegmentLength = size / 3; // Maximum length of each segment
    let controlPointRange = maxSegmentLength / 2; // Range for control points to ensure smoother curves
    let directionRange = PI / 4; // Directional range in radians (45 degrees)

    stroke("green");
    strokeWeight(1);

    for (let i = 0; i < numLines; i++) {
        let startX = x + random(size);
        let startY = y + random(size);
        let currentX = startX;
        let currentY = startY;
        let currentAngle = random(TWO_PI); // Random initial direction

        beginShape();
        vertex(currentX, currentY);

        for (let j = 0; j < maxSegments; j++) {
            let angle1 = currentAngle + random(-directionRange, directionRange);
            let segmentLength1 = random(maxSegmentLength / 2, maxSegmentLength);

            let controlX1 = currentX + cos(currentAngle) * segmentLength1 / 2;
            let controlY1 = currentY + sin(currentAngle) * segmentLength1 / 2;
            let controlX2 = controlX1 + cos(angle1) * segmentLength1 / 2;
            let controlY2 = controlY1 + sin(angle1) * segmentLength1 / 2;
            let endX = controlX2 + cos(angle1) * segmentLength1;
            let endY = controlY2 + sin(angle1) * segmentLength1;

            let resampled = resampleBezier(0.5, currentX, currentY, controlX1, controlY1, controlX2, controlY2, endX, endY);

            bezierVertex(resampled.x1, resampled.y1, resampled.x2, resampled.y2, resampled.x, resampled.y);

            currentX = resampled.x;
            currentY = resampled.y;
            currentAngle = atan2(endY - currentY, endX - currentX); // Update direction
        }

        endShape();
    }
}

const resampleBezier = function(t, x0, y0, x1, y1, x2, y2, x3, y3) {
    const dt = 1 - t,
        x01 = x0 * dt + x1 * t,
        y01 = y0 * dt + y1 * t,
        x12 = x1 * dt + x2 * t,
        y12 = y1 * dt + y2 * t,
        x23 = x2 * dt + x3 * t,
        y23 = y2 * dt + y3 * t,

        h1x = x01 * dt + x12 * t,
        h1y = y01 * dt + y12 * t,
        h2x = x12 * dt + x23 * t,
        h2y = y12 * dt + y23 * t,
        x = h1x * dt + h2x * t,
        y = h1y * dt + h2y * t;
    return {
        x0: x0,
        y0: y0,
        x1: h1x,
        y1: h1y,
        x2: h2x,
        y2: h2y,
        x: x,
        y: y
    };
};


