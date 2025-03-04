  
// function blankPattern(x, y, size) {
//     // Do nothing
// }


//
// Lines with Noise
//
function linesNoise(x, y, size) {
    let linesPerSquare = L1; // Number of parallel lines
    let lineSpacing = size / linesPerSquare; // Calculate spacing based on the square size and number of lines
    let noiseScale = L2; // Adjust this value to change the "zoom" level of the noise

    push(); // Save the current drawing style settings and transformations
    translate(x, y); // Move the origin to x, y

    let randomSeed = Math.floor(random() * L3); 
    noiseSeed(randomSeed);  

    for (let i = 0; i < linesPerSquare; i++) {
        // Determine the starting edge: 0 = top, 1 = bottom, 2 = left, 3 = right
        let edge = i % 4;
        let startX, startY;
        if (edge === 0) { // Top
            startX = i * lineSpacing;
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
            let noiseVal = noise(xOff * noiseScale, yOff * noiseScale);
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
// Vertical Lines Pattern
//
function verticalLines(x, y, size) {
    let numRows = floor(random(3, 6)); // Number of rows
    let numLinesPerRow = floor(random(10, 30)); // Number of vertical lines in each row
    let rowSpacing = size / numRows; // Calculate the spacing between rows
    let lineSpacing = size / (numLinesPerRow - 1); // Calculate the spacing between lines in each row
    let lineHeight = rowSpacing * 0.8; // Height of each vertical line, with some space between rows

    // console.log("numRows:" + numRows, "numLinesPerRow:" + numLinesPerRow, "rowSpacing:" + rowSpacing, "lineSpacing:" + lineSpacing, "lineHeight:" + lineHeight);  

    push(); // Save the current drawing style settings and transformations
    translate(x + size / 2, (y + size / 2) ); // Move the origin to the center of the pattern

    for (let i = 0; i < numRows; i++) {
        let rowY = -size / 2 + i * rowSpacing;
        for (let j = 0; j < numLinesPerRow; j++) {
            let lineX = -size / 2 + j * lineSpacing;
            line(lineX, rowY, lineX, rowY + lineHeight);
        }
    }

    pop(); // Restore the previous drawing style settings and transformations
}






