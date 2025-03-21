
let img; // Variable to hold the image
let res = 20; // Resolution of the sampling (size of each rectangle)

function preload() {
  // Load the image before the sketch starts
  img = loadImage('../../img/JonnyMugCrop.png'); // Replace with your image path
}

function setup() {
  createCanvas(img.width, img.height); // Set canvas size to match the image
  img.loadPixels(); // Load the pixel data of the image
  noStroke(); // Disable stroke for rectangles
}

function draw() {
  background(0); // Clear the canvas with a black background

  // Loop through the image pixels with a step size of 'res'
  for (let j = 0; j < img.height; j += res) {
    for (let i = 0; i < img.width; i += res) {
      // Calculate the index of the pixel in the img.pixels array
      let index = (i + j * img.width) * 4;

      // Extract the RGB values of the pixel
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      if (r && g && b < 100) {
        
        fill(225);
        rect(i, j, res, res);
        fill("blue");
        circle(i+(res/2), j+(res/2), res/2);
      } else {
       
      

      // Set the fill color to the pixel's color
      fill(r, g, b);

      // Draw a rectangle at the corresponding position
      rect(i, j, res, res);
      }
    }
  }

  // Stop the draw loop since the image doesn't need to update continuously
  noLoop();
}