var socket;

// let button = document.querySelector("#btn");
//         let x;
//         let y;
//         button.onclick = async () => {
//             x = document.querySelector("#x").value;
//             y = document.querySelector("#y").value;
//             console.log(x,y);
//             let url = `move/${x}, ${y}`;
//             let response = fetch(url);
//         }

function setup() {

  createCanvas(600, 600);
  background(51);

  socket = io.connect(':3000');
  socket.on('mouse', dataIncoming);
}

function dataIncoming(data) {
  console.log(data.x, data.y);
  let url = `http://localhost:8081/move/${data.x},${data.y}`;
  let response = fetch(url, {mode: 'cors'});
}

// function newDrawing(data) {
//     noStroke(); 
//     fill(0,0,200);
//   ellipse(data.x, data.y, 36, 36);
// }

// function mouseDragged() {
//   console.log(mouseX + ',' + mouseY);

//   var data = {
//     x: mouseX,
//     y: mouseY
//   }

//   socket.emit('mouse', data);
// }

function draw() {}