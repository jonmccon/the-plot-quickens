

function simpleLinePattern(x, y, size) {
    stroke(255, 0, 0);
    noFill();

    let segmentSize = size / 2;

    // Top segments
    if (borderWeights.topLeft > 0) {
        line(x, y, x + segmentSize * borderWeights.topLeft, y);
    }
    if (borderWeights.topRight > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.topLeft, 1);
        line(startX, y, startX + segmentSize * borderWeights.topRight, y);
    }

    // Bottom segments
    if (borderWeights.bottomLeft > 0) {
        line(x, y + size, x + segmentSize * borderWeights.bottomLeft, y + size);
    }
    if (borderWeights.bottomRight > 0) {
        let startX = x + segmentSize * Math.max(borderWeights.bottomLeft, 1);
        line(startX, y + size, startX + segmentSize * borderWeights.bottomRight, y + size);
    }

    // Left segments
    if (borderWeights.leftTop > 0) {
        line(x, y, x, y + segmentSize * borderWeights.leftTop);
    }
    if (borderWeights.leftBottom > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.leftTop, 1);
        line(x, startY, x, startY + segmentSize * borderWeights.leftBottom);
    }

    // Right segments
    if (borderWeights.rightTop > 0) {
        line(x + size, y, x + size, y + segmentSize * borderWeights.rightTop);
    }
    if (borderWeights.rightBottom > 0) {
        let startY = y + segmentSize * Math.max(borderWeights.rightTop, 1);
        line(x + size, startY, x + size, startY + segmentSize * borderWeights.rightBottom);
    }
}

function selectBorderWithWeight() {
    // For now, we only have one border pattern
    return simpleLinePattern;
}