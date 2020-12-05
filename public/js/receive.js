var socket;
var xarray = [];
var xoutput = [];
var yarray = [];
var youtput = [];
var start = true;

function setup() {
  createCanvas(247, 175);
  background(51);
  socket = io.connect();
  socket.on('mouse', dataIncoming);
}

function dataIncoming(data) {
  // console.log(data.x, data.y);

  xarray.push(data.x);
  let findlastx = xarray[xarray.length - 2];
  xoutput.push(data.x - findlastx);
  // console.log(xoutput[xoutput.length - 1]);

  yarray.push(data.y);
  let findlasty = yarray[yarray.length - 2];
  youtput.push(data.y - findlasty);
  console.log(xoutput[xoutput.length - 1],youtput[youtput.length - 1]);

  //array.length to find out length of array 
  //the array is the difference 
  // x = 0-24700
  // y = 0-17500
  if (start) {
    let url = `http: //localhost:8081/move/${xarray[xarray.length - 1]*100},${yarray[yarray.length - 1]*100}`;
    let response = fetch(url, {
      mode: 'no-cors'
    });
    start = false;
  } else {
    let url = `http://localhost:8081/move/${xoutput[xoutput.length - 1]*100},${youtput[youtput.length - 1]*100}`;
    let response = fetch(url, {
      mode: 'no-cors'
    });
  }
}

function draw() {}
// let button = document.querySelector("#btn");
// let x;
// let y;
// button.onclick = async () => {
//     x = document.querySelector("#x").value;
//     y = document.querySelector("#y").value;
//     console.log(x,y);
//     let url = move/${x}, ${y};
//     let response = fetch(url);
// }