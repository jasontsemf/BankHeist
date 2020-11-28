var database;
var socket; 

var drawing = [];
var currentPath = [];
var isDrawing = false;
let prem = 0;
let diff = 0;
let minDiff=10000;


function setup() {
  if (prem === 0){
    millisecond = millis();
  }
  console.log("hello from my sendjs");
  console.log(socket);
  canvas = createCanvas(600, 600);

  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  // var saveButton = select('#saveButton');
  // saveButton.mousePressed(saveDrawing);

  // var clearButton = select('#clearButton');
  // clearButton.mousePressed(clearDrawing);
  socket = io.connect('/');
}

function mouseDragged() {
  if(millis() !== prem){
    diff = millis() - prem;
    // console.log(diff);
    prem = millis();
  }
  if(diff < minDiff){
    minDiff = diff;
    console.log(minDiff);
  }
  // console.log(millisecond = millis());
  // console.log(mouseX + ',' + mouseY);
  var data = {
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);

}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function draw() {
  background(0);

  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY
    };
    currentPath.push(point);
  }

  stroke(255);
  strokeWeight(4);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
}

function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    name: 'Dan',
    drawing: drawing
  };
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status) {
    console.log(status);
  }
}

function gotData(data) {
  // clear the listing
  var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    li.class('listing');
    var ahref = createA('#', key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);

    var perma = createA('?id=' + key, 'permalink');
    perma.parent(li);
    perma.style('padding', '4px');

    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(key) {
  //console.log(arguments);
  if (key instanceof MouseEvent) {
    key = this.html();
  }

  var ref = database.ref('drawings/' + key);
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;
    //console.log(drawing);
  }
}

function clearDrawing() {
  drawing = [];
}
