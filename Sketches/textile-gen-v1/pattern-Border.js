function simpleLinePattern(x, y, size, borderWeights, topInterrupter = null, bottomInterrupter = null, leftInterrupter = null, rightInterrupter = null) {
    stroke(255, 0, 0);
    noFill();

    let segmentSize = size / 2;
    let interrupterSize = size / 10; // Size of the interrupter

    function drawInterrupter(x, y, interrupter) {
        if (interrupter === 'circle') {
            ellipse(x, y, interrupterSize, interrupterSize);
        } else if (interrupter === 'asterisk') {
            line(x - interrupterSize / 2, y, x + interrupterSize / 2, y);
            line(x, y - interrupterSize / 2, x, y + interrupterSize / 2);
            line(x - interrupterSize / 2.5, y - interrupterSize / 2.5, x + interrupterSize / 2.5, y + interrupterSize / 2.5);
            line(x - interrupterSize / 2.5, y + interrupterSize / 2.5, x + interrupterSize / 2.5, y - interrupterSize / 2.5);
        } else if (interrupter === 'perpendicular') {
            line(x - interrupterSize / 2, y, x + interrupterSize / 2, y);
            line(x - interrupterSize / 2, y - interrupterSize / 2, x + interrupterSize / 2, y - interrupterSize / 2);
        }
    }

    function drawSegment(startX, startY, endX, endY, interrupter, isHorizontal) {
        if (interrupter) {
            let midX = (startX + endX) / 2;
            let midY = (startY + endY) / 2;

            if (isHorizontal) {
                endX -= interrupterSize / 2;
            } else {
                endY -= interrupterSize / 2;
            }
            vertex(startX, startY);
            vertex(endX, endY);
            drawInterrupter(midX, midY, interrupter);
            
            if (isHorizontal) {
                vertex(endX, endY);
            } else {
                vertex(endX, endY);
            }

        } else {
            vertex(startX, startY);
            vertex(endX, endY);
        }
    }

    beginShape();

    // Top segments
    if (borderWeights.topLeft > 0) {
        let endX = x + segmentSize * borderWeights.topLeft;
        drawSegment(x, y, endX, y, topInterrupter, true);
    } else {
        endShape();
        beginShape();
    }
    if (borderWeights.topRight > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.topLeft, 1);
        let endX = startX + segmentSize * borderWeights.topRight;
        drawSegment(startX, y, endX, y, topInterrupter, true);
    } else {
        endShape();
        beginShape();
    }

    // Right segments
    if (borderWeights.rightTop > 0) {
        let endY = y + segmentSize * borderWeights.rightTop;
        drawSegment(x + size, y, x + size, endY, rightInterrupter, false);
    } else {
        endShape();
        beginShape();
    }
    if (borderWeights.rightBottom > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.rightTop, 1);
        let endY = startY + segmentSize * borderWeights.rightBottom;
        drawSegment(x + size, startY, x + size, endY, rightInterrupter, false);
    } else {
        endShape();
        beginShape();
    }

    // Bottom segments
    if (borderWeights.bottomRight > 0) {
        let endX = x + segmentSize * borderWeights.bottomRight;
        drawSegment(x + size, y + size, endX + interrupterSize, y + size, bottomInterrupter, true);
    } else {
        endShape();
        beginShape();
    }
    if (borderWeights.bottomLeft > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.bottomRight, 1);
        let endX = startX - segmentSize * borderWeights.bottomLeft;
        drawSegment(startX, y + size, endX + interrupterSize, y + size, bottomInterrupter, true);
    } else {
        endShape();
        beginShape();
    }

    // Left segments
    if (borderWeights.leftBottom > 0) {
        let endY = y + segmentSize * borderWeights.leftBottom;
        drawSegment(x, y + size, x, endY, leftInterrupter, false);
    } else {
        endShape();
        beginShape();
    }
    if (borderWeights.leftTop > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.leftBottom, 1);
        let endY = startY - segmentSize * borderWeights.leftTop;
        drawSegment(x, startY, x, endY + interrupterSize / 2, leftInterrupter, false);
    } else {
        endShape();
        beginShape();
    }

    // endShape(CLOSE);
}

function selectBorderWithWeight(borderWeights, interrupterWeights) {
    function getRandomInterrupter(weights) {
        let totalWeight = Object.values(weights).reduce((acc, weight) => acc + weight, 0);
        let random = Math.random() * totalWeight;
        let sum = 0;

        for (let interrupter in weights) {
            sum += weights[interrupter];
            if (random <= sum) {
                return interrupter;
            }
        }
        return null;
    }

    return function(x, y, size) {
        let topInterrupter = getRandomInterrupter(interrupterWeights.top);
        let bottomInterrupter = getRandomInterrupter(interrupterWeights.bottom);
        let leftInterrupter = getRandomInterrupter(interrupterWeights.left);
        let rightInterrupter = getRandomInterrupter(interrupterWeights.right);

        simpleLinePattern(x, y, size, borderWeights, topInterrupter, bottomInterrupter, leftInterrupter, rightInterrupter);
    };
}