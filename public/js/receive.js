// const { write } = require("fs");

var socket;
var xarray = [];
var xoutput = [];
var yarray = [];
var youtput = [];
var seconds = [];
var factor = 10;
var start = true;

var drawing = [];
var currentPath = [];

function setup() {
  console.log("hello from receivejs");
  canvas = createCanvas(247 * 2, 175 * 2);
  canvas.parent('canvascontainer');
  // socket = io.connect();
  socket.on('mouse', moveAxiDraw);
  socket.on('mouse', drawCanvas);
  background(0);
}

function moveAxiDraw(data) {
  xarray.push(data.x);
  let findlastx = xarray[xarray.length - 2];
  xoutput.push(data.x - findlastx);
  // console.log(xoutput[xoutput.length - 1]);

  yarray.push(data.y);
  let findlasty = yarray[yarray.length - 2];
  youtput.push(data.y - findlasty);
  console.log(data.s, xoutput[xoutput.length - 1], youtput[youtput.length - 1]);

  seconds.push(Math.floor(data.s));
  //array.length to find out length of array 
  //the array is the difference 
  // x = 0-24700
  // y = 0-17500

  let writeS = seconds[xarray.length - 1];
  let writeX = xoutput[xoutput.length - 1] * factor;
  let writeY = youtput[youtput.length - 1] * factor;
  if (writeS < 500) {
    let url = `http://localhost:8081/move/${writeS},${writeX},${writeY}`;
    let response = fetch(url, {
      mode: 'no-cors'
    });
  }
  // }
}

function draw() {}

function drawCanvas(data) {
  fill(255);
  ellipse(data.x, data.y, 5, 5);
}