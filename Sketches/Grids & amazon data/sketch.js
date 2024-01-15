
let table;
let groups = {};
let data = [];
let maxNumber = 0;
let minAmount = Infinity;
let maxAmount = -Infinity;



function preload() {
  // Load the CSV file
  table = loadTable('./data.csv', 'csv', 'header', processData);
}

function processData() {
// Loop through all rows in the table
for (let row of table.rows) {
  // Use a unique identifier for each purchase as the key
  let key = row.get('Order ID');

  

  // If the group doesn't exist yet, create it
  if (!groups[key]) {
    groups[key] = [];
  }

  // Add the purchase to the group
  groups[key].push(row);
}

// Loop through all groups
for (let key in groups) {
  // Calculate the number and amount of purchases
  let number = groups[key].length;
  let amount = groups[key].reduce((sum, row) => sum + parseFloat(row.get('Total Charged')), 0);

  // Add the data to the array
  data.push({ number, amount });
}

// Get the keys and sort them
let keys = Object.keys(groups).sort();

// Loop through all keys
for (let key of keys) {
  // Calculate the number and amount of purchases
  let number = groups[key].length;
  let amount = groups[key].reduce((sum, row) => {
    let totalCharged = row.get('Total Charged').replace('$', '');
    totalCharged = parseFloat(totalCharged);
    if (!isNaN(totalCharged)) {
      return sum + totalCharged;
    } else {
      console.log('Invalid Total Charged:', totalCharged);
      return sum;
    }
  }, 0);

  // Add the data to the array
  data.push({ number, amount });

  // Update maxNumber, minAmount, and maxAmount
  maxNumber = Math.max(maxNumber, number);
  minAmount = Math.min(minAmount, amount);
  maxAmount = Math.max(maxAmount, amount);
}
}

// Basics
function setup() {
  createCanvas(800, 800, SVG);
  noLoop()
  colorMode(HSL)
}






// ------------------------------
function createGrid() {
  background("antiquewhite");

  let gridSize = 12; // Define the size of the grid squares
  let inset = 100; // Define the inset from the canvas

  // Calculate the number of rows and columns based on the canvas size, grid size and inset
  let rows = (height - 2 * inset) / gridSize;
  let cols = (width - 2 * inset) / gridSize;

  // Draw the bars
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Get the data for this cell
      let cellData = data[i * cols + j];

      let entriesDrawn = 0;

      if (cellData) {
        // Skip if the amount is 0 or NaN
        if (!cellData.amount || isNaN(cellData.amount)) {
          continue;
        }

        // Calculate the height and color of the bar
        let barHeight = cellData.number / maxNumber * gridSize;
        let barColor = map(cellData.amount, minAmount, maxAmount, 0, 360);

        // Draw the bar
        fill(barColor, 100, 50);
        rect(j * gridSize + inset, i * gridSize + inset + gridSize - barHeight, gridSize, barHeight);

        // Increment the counter
        entriesDrawn++;
      }

      console.log('Entries drawn:', entriesDrawn);
    }
  }

  // Draw the grid lines
  stroke(0); // Set the color of the grid lines
  for (let i = 0; i <= rows; i++) {
    line(inset, i * gridSize + inset, width - inset, i * gridSize + inset);
  }
  for (let j = 0; j <= cols; j++) {
    line(j * gridSize + inset, inset, j * gridSize + inset, height - inset);
  }
}

// Download SVG when clicked
function mousePressed(){
  save("mySVG.svg"); // give file name
  print("saved svg");
}

// Puts it all together so it doesn't run every time
var myFunctions = [createGrid, mousePressed];
var index = 0;
function draw(){
  if (index < myFunctions.length) {
    myFunctions[index]();
  }
}