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

    // Top segments
    if (borderWeights.topLeft > 0) {
        let endX = x + segmentSize * borderWeights.topLeft;
        if (topInterrupter) {
            endX -= interrupterSize / 2;
            line(x, y, endX, y);
            drawInterrupter(endX + interrupterSize / 2, y, topInterrupter);
        } else {
            line(x, y, endX, y);
        }
    }
    if (borderWeights.topRight > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.topLeft, 1);
        let endX = startX + segmentSize * borderWeights.topRight;
        if (topInterrupter) {
            endX -= interrupterSize / 2;
            line(startX, y, endX, y);
            drawInterrupter(endX + interrupterSize / 2, y, topInterrupter);
        } else {
            line(startX, y, endX, y);
        }
    }

    // Bottom segments
    if (borderWeights.bottomLeft > 0) {
        let endX = x + segmentSize * borderWeights.bottomLeft;
        if (bottomInterrupter) {
            endX -= interrupterSize / 2;
            line(x, y + size, endX, y + size);
            drawInterrupter(endX + interrupterSize / 2, y + size, bottomInterrupter);
        } else {
            line(x, y + size, endX, y + size);
        }
    }
    if (borderWeights.bottomRight > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.bottomLeft, 1);
        let endX = startX + segmentSize * borderWeights.bottomRight;
        if (bottomInterrupter) {
            endX -= interrupterSize / 2;
            line(startX, y + size, endX, y + size);
            drawInterrupter(endX + interrupterSize / 2, y + size, bottomInterrupter);
        } else {
            line(startX, y + size, endX, y + size);
        }
    }

    // Left segments
    if (borderWeights.leftTop > 0) {
        let endY = y + segmentSize * borderWeights.leftTop;
        if (leftInterrupter) {
            endY -= interrupterSize / 2;
            line(x, y, x, endY);
            drawInterrupter(x, endY + interrupterSize / 2, leftInterrupter);
        } else {
            line(x, y, x, endY);
        }
    }
    if (borderWeights.leftBottom > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.leftTop, 1);
        let endY = startY + segmentSize * borderWeights.leftBottom;
        if (leftInterrupter) {
            endY -= interrupterSize / 2;
            line(x, startY, x, endY);
            drawInterrupter(x, endY + interrupterSize / 2, leftInterrupter);
        } else {
            line(x, startY, x, endY);
        }
    }

    // Right segments
    if (borderWeights.rightTop > 0) {
        let endY = y + segmentSize * borderWeights.rightTop;
        if (rightInterrupter) {
            endY -= interrupterSize / 2;
            line(x + size, y, x + size, endY);
            drawInterrupter(x + size, endY + interrupterSize / 2, rightInterrupter);
        } else {
            line(x + size, y, x + size, endY);
        }
    }
    if (borderWeights.rightBottom > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.rightTop, 1);
        let endY = startY + segmentSize * borderWeights.rightBottom;
        if (rightInterrupter) {
            endY -= interrupterSize / 2;
            line(x + size, startY, x + size, endY);
            drawInterrupter(x + size, endY + interrupterSize / 2, rightInterrupter);
        } else {
            line(x + size, startY, x + size, endY);
        }
    }
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