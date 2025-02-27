// Border interrupter randomix
const interrupters = [null, 'circle', 'asterisk', 'perpendicular'];
const selectedInterrupter = interrupters[Math.floor(Math.random() * interrupters.length)];


function simpleLinePattern(x, y, size, interrupter = null) {
    stroke(255, 0, 0);
    noFill();

    let segmentSize = size / 2;
    let interrupterSize = size / 10; // Size of the interrupter

    function drawInterrupter(x, y) {
        if (interrupter === 'circle') {
            ellipse(x, y, interrupterSize, interrupterSize);
        } else if (interrupter === 'asterisk') {
            line(x - interrupterSize / 2, y, x + interrupterSize / 2, y);
            line(x, y - interrupterSize / 2, x, y + interrupterSize / 2);
            line(x - interrupterSize / 2.5, y - interrupterSize / 2.5, x + interrupterSize / 2.5, y + interrupterSize / 2.5);
            line(x - interrupterSize / 2.5, y + interrupterSize / 2.5, x + interrupterSize / 2.5, y - interrupterSize / 2.5);
        } else if (interrupter === 'perpendicular') {
            line(x - interrupterSize / 2, y, x + interrupterSize / 2, y);
            line(x, y - interrupterSize / 2, x, y + interrupterSize / 2);
        }
    }

    // Top segments
    if (borderWeights.topLeft > 0) {
        let endX = x + segmentSize * borderWeights.topLeft;
        if (interrupter) endX -= interrupterSize / 2;
        line(x, y, endX, y);
        if (interrupter) drawInterrupter(endX, y);
    }
    if (borderWeights.topRight > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.topLeft, 1);
        let endX = startX + segmentSize * borderWeights.topRight;
        if (interrupter) endX -= interrupterSize / 2;
        line(startX, y, endX, y);
        if (interrupter) drawInterrupter(endX, y);
    }

    // Bottom segments
    if (borderWeights.bottomLeft > 0) {
        let endX = x + segmentSize * borderWeights.bottomLeft;
        if (interrupter) endX -= interrupterSize / 2;
        line(x, y + size, endX, y + size);
        if (interrupter) drawInterrupter(endX, y + size);
    }
    if (borderWeights.bottomRight > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.bottomLeft, 1);
        let endX = startX + segmentSize * borderWeights.bottomRight;
        if (interrupter) endX -= interrupterSize / 2;
        line(startX, y + size, endX, y + size);
        if (interrupter) drawInterrupter(endX, y + size);
    }

    // Left segments
    if (borderWeights.leftTop > 0) {
        let endY = y + segmentSize * borderWeights.leftTop;
        if (interrupter) endY -= interrupterSize / 2;
        line(x, y, x, endY);
        if (interrupter) drawInterrupter(x, endY);
    }
    if (borderWeights.leftBottom > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.leftTop, 1);
        let endY = startY + segmentSize * borderWeights.leftBottom;
        if (interrupter) endY -= interrupterSize / 2;
        line(x, startY, x, endY);
        if (interrupter) drawInterrupter(x, endY);
    }

    // Right segments
    if (borderWeights.rightTop > 0) {
        let endY = y + segmentSize * borderWeights.rightTop;
        if (interrupter) endY -= interrupterSize / 2;
        line(x + size, y, x + size, endY);
        if (interrupter) drawInterrupter(x + size, endY);
    }
    if (borderWeights.rightBottom > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.rightTop, 1);
        let endY = startY + segmentSize * borderWeights.rightBottom;
        if (interrupter) endY -= interrupterSize / 2;
        line(x + size, startY, x + size, endY);
        if (interrupter) drawInterrupter(x + size, endY);
    }
}

function selectBorderWithWeight(interrupter = null) {
    return function(x, y, size) {
        simpleLinePattern(x, y, size, selectedInterrupter);
    };
}