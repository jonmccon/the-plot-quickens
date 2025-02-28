function simpleLinePattern(x, y, size, topInterrupter = null, bottomInterrupter = null, leftInterrupter = null, rightInterrupter = null) {
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

    beginShape();

    // Top segments
    if (borderWeights.topLeft > 0) {
        let endX = x + segmentSize * borderWeights.topLeft;
        if (topInterrupter) {
            endX -= interrupterSize / 2;
            vertex(x, y);
            vertex(endX, y);
            drawInterrupter(endX + interrupterSize / 2, y, topInterrupter);
        } else {
            vertex(x, y);
            vertex(endX, y);
        }
    }
    if (borderWeights.topRight > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.topLeft, 1);
        let endX = startX + segmentSize * borderWeights.topRight;
        if (topInterrupter) {
            endX -= interrupterSize / 2;
            vertex(startX, y);
            vertex(endX, y);
            drawInterrupter(endX + interrupterSize / 2, y, topInterrupter);
        } else {
            vertex(startX, y);
            vertex(endX, y);
        }
    }

    // Right segments
    if (borderWeights.rightTop > 0) {
        let endY = y + segmentSize * borderWeights.rightTop;
        if (rightInterrupter) {
            endY -= interrupterSize / 2;
            vertex(x + size, y);
            vertex(x + size, endY);
            drawInterrupter(x + size, endY + interrupterSize / 2, rightInterrupter);
        } else {
            vertex(x + size, y);
            vertex(x + size, endY);
        }
    }
    if (borderWeights.rightBottom > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.rightTop, 1);
        let endY = startY + segmentSize * borderWeights.rightBottom;
        if (rightInterrupter) {
            endY -= interrupterSize / 2;
            vertex(x + size, startY);
            vertex(x + size, endY);
            drawInterrupter(x + size, endY + interrupterSize / 2, rightInterrupter);
        } else {
            vertex(x + size, startY);
            vertex(x + size, endY);
        }
    }

    // Bottom segments
    if (borderWeights.bottomRight > 0) {
        let endX = x + segmentSize * borderWeights.bottomRight;
        if (bottomInterrupter) {
            endX -= interrupterSize / 2;
            vertex(x + size, y + size);
            vertex(endX, y + size);
            drawInterrupter(endX + interrupterSize / 2, y + size, bottomInterrupter);
        } else {
            vertex(x + size, y + size);
            vertex(endX, y + size);
        }
    }
    if (borderWeights.bottomLeft > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.bottomRight, 1);
        let endX = startX - segmentSize * borderWeights.bottomLeft;
        if (bottomInterrupter) {
            endX -= interrupterSize / 2;
            vertex(startX, y + size);
            vertex(endX, y + size);
            drawInterrupter(endX + interrupterSize / 2, y + size - interrupterSize, bottomInterrupter);
        } else {
            vertex(startX, y + size);
            vertex(endX, y + size);
        }
    }

    // Left segments
    if (borderWeights.leftBottom > 0) {
        let endY = y + segmentSize * borderWeights.leftBottom;
        if (leftInterrupter) {
            endY -= interrupterSize / 2;
            vertex(x, y + size);
            vertex(x, endY);
            drawInterrupter(x, endY + interrupterSize / 2, leftInterrupter);
        } else {
            vertex(x, y + size);
            vertex(x, endY);
        }
    }
    if (borderWeights.leftTop > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.leftBottom, 1);
        let endY = startY - segmentSize * borderWeights.leftTop;
        if (leftInterrupter) {
            endY -= interrupterSize / 2;
            vertex(x, startY);
            vertex(x, endY + interrupterSize);
            drawInterrupter(x, endY + interrupterSize / 2, leftInterrupter);
        } else {
            vertex(x, startY);
            vertex(x, endY);
        }
    }

    endShape(CLOSE);
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

        simpleLinePattern(x, y, size, topInterrupter, bottomInterrupter, leftInterrupter, rightInterrupter);
    };
}