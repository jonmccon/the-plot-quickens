let diffLine;
let iterations = 0;

let edgeBuffer = 20;  
let gridRows = 3;
let gridCols = 3;
let cellWidth, cellHeight;
let diffLines = [];

function setup() {
  createCanvas(1200, 1200, SVG);
  cellWidth = width / gridCols;
  cellHeight = height / gridRows;

  for (let i = 0; i < gridRows; i++) {
    diffLines[i] = [];
    for (let j = 0; j < gridCols; j++) {
      let randomHeight = random(20, cellHeight);
      let randomWidth = random(20, cellWidth);
      diffLine = new DifferentialLine(0.9, 1, 30, 0.8, 5);
      let count = 50;
      for (let k = 0; k < count; k++) {
        let ang = map(k, 0, count, 0, TWO_PI);
        let a = cellWidth / randomWidth;
        let b = cellHeight / randomHeight;
        let pos = createVector(j * cellWidth + 0.5 * cellWidth + a * cos(ang), i * cellHeight + 0.5 * cellHeight + b * sin(ang));
        diffLine.addNode(pos);
      }
      diffLines[i][j] = diffLine;
    }
  }
  
  background(220);
  noFill();
  stroke(0);
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      diffLines[i][j].render();
    }
  }
}

function draw() {
  if (iterations < 600) {
    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        diffLines[i][j].run();
        if (iterations % 21 === 0 ) {
          diffLines[i][j].render();
        }
      }
    }
    iterations++;
  }
}


class BB {
  
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  cont(p) {
    return (p.x >= this.x - this.w &&
      p.x < this.x + this.w &&
      p.y >= this.y - this.h &&
      p.y < this.y + this.h);
  }

  inter(r) {
    return !(r.x - r.w > this.x + this.w ||
      r.x + r.w < this.x - this.w ||
      r.y - r.h > this.y + this.h ||
      r.y + r.h < this.y - this.h);
  }

}

class QT {
  
  constructor(bb, cap) {
    this.bb = bb;
    this.cap = cap;
    this.ps = [];
    this.div = false;
  }

  sub() {
    let x = this.bb.x;
    let y = this.bb.y;
    let w = this.bb.w;
    let h = this.bb.h;
    this.ne = new QT(new BB(x + w / 2, y - h / 2, w / 2, h / 2), this.cap);
    this.nw = new QT(new BB(x - w / 2, y - h / 2, w / 2, h / 2), this.cap);
    this.se = new QT(new BB(x + w / 2, y + h / 2, w / 2, h / 2), this.cap);
    this.sw = new QT(new BB(x - w / 2, y + h / 2, w / 2, h / 2), this.cap);
    this.div = true;
  }

  ins(p) {
    if (!this.bb.cont(p)) return false;
    if (this.ps.length < this.cap) {
      this.ps.push(p);
      return true;
    } else {
      if (!this.div) {
        this.sub();
      }
      if (this.ne.ins(p)) return true;
      else if (this.nw.ins(p)) return true;
      else if (this.se.ins(p)) return true;
      else if (this.sw.ins(p)) return true;
    }
  }
  
  q(rng, f) {
    if (!f) f = [];
    if (!this.bb.inter(rng)) return;
    else {
      for (let p of this.ps) {
        if (rng.cont(p)) f.push(p);
      }
      if (this.div) {
        this.nw.q(rng, f);
        this.ne.q(rng, f);
        this.sw.q(rng, f);
        this.se.q(rng, f);
      }
    }
    return f;
  }
  
}

class DifferentialLine {
  
  constructor(mf, ms, ds, scr, mel) {
    this.nodes = [];
    this.maxForce = mf;
    this.maxSpeed = ms;
    this.desiredSeparation = ds;
    this.separationCohesionRation = scr;
    this.maxEdgeLen = mel;
  }
  
  run() {
    let qt = new QT(new BB(0.5 * width, 0.5 * height, 0.5 * width, 0.5 * height), 4);
    for (let i = 0; i < this.nodes.length; i++) {
      qt.ins({x: this.nodes[i].position.x, y: this.nodes[i].position.y, n: this.nodes[i]});
    }
    
    for (let i = 0; i < this.nodes.length; i++) {
      let range = new BB(this.nodes[i].position.x, this.nodes[i].position.y, 2 * this.desiredSeparation, 2 * this.desiredSeparation);
      let neighbors = qt.q(range);
      this.nodes[i].run(neighbors.map(n => n.n), this.nodes[(i - 1 + this.nodes.length) % this.nodes.length], this.nodes[(i + 1) % this.nodes.length]);
    }
    this.growth();
  }
  
  addNode(pos) {
    let n = new Node(pos, createVector(0, 0), createVector(0, 0), this.maxForce, this.maxSpeed, this.desiredSeparation, this.separationCohesionRation, 0);
    this.nodes.push(n);
  }
  
  addNodeAt(n, index) {
    this.nodes.splice(index, 0, n);
  }
  
  growth() {
    for (let i = this.nodes.length - 1; i > 0; i--) {
      let n1 = this.nodes[i];
      let n2 = this.nodes[(i + 1) % this.nodes.length];
      let d = p5.Vector.dist(n1.position, n2.position);
      if (d > this.maxEdgeLen) {
        let newNodePosition = p5.Vector.add(n1.position, n2.position).div(2);
        let newNodeVelocity = createVector(0, 0);
        let newNodeAcceleration = createVector(0, 0);
        let newNode = new Node(newNodePosition, newNodeVelocity, newNodeAcceleration, this.maxForce, this.maxSpeed, this.desiredSeparation, this.separationCohesionRation, 0.5 * (n1.pct + n2.pct));
        this.addNodeAt(newNode, i + 1);
      }
    }
  }
  
  render() {
    beginShape();
      for (let i = 0; i < this.nodes.length; i++) {
        let p = this.nodes[i].position;
        vertex(p.x, p.y);
      }
    endShape(CLOSE);
  }
  
}

class Node {
  
  constructor(p, v, a, mf, ms, ds, scr, pct) {
    this.position = p;
    this.velocity = v;
    this.acceleration = a;
    this.maxForce = mf;
    this.maxSpeed = ms;
    this.desiredSeparation = ds;
    this.separationCohesionRation = scr;
    this.pct = pct;
  }
  
  run(nodes, left, right) {
    this.differentiate(nodes, left, right);
    this.update();
    this.age++;
  }
  
  applyForce(force) {
    this.acceleration.add(force);
  }

  applyEdgeForce() {

    // distance from edge at which the force starts

    let edgeForce = createVector(0, 0);

    if (this.position.x < edgeBuffer) edgeForce.x = this.maxForce;
    else if (this.position.x > width - edgeBuffer) edgeForce.x = -this.maxForce;

    if (this.position.y < edgeBuffer) edgeForce.y = this.maxForce;
    else if (this.position.y > height - edgeBuffer) edgeForce.y = -this.maxForce;

    this.applyForce(edgeForce);
  }
  
  differentiate(nodes, left, right) {
    let separation = this.separate(nodes);
    let cohesion = this.edgeCohesion(left, right);
    separation.mult(this.separationCohesionRation);
    this.applyForce(separation);
    this.applyForce(cohesion);
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // Apply edge force after updating position
    this.applyEdgeForce();
  }
  
  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  render() {
    fill(0);
    ellipse(this.position.x, this.position.y, 2, 2);
  }
  
  separate(nodes) {
    let steer = createVector(0, 0);
    let count = 0;
    for (let other of nodes) {
      let d = p5.Vector.dist(this.position, other.position);
      if (d > 0 && d < this.desiredSeparation) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }
    if (count > 0) {
      steer.div(count);
    }
    if (steer.mag() > 0) {
      steer.setMag(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }
  
  edgeCohesion(left, right) {
    let sum = p5.Vector.add(left.position, right.position).div(2);
    return this.seek(sum);
  }
  
  
}

function mousePressed() {
  save("wiggles.svg"); // give file name
}