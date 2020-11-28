const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
// let socket = require('socket.io');
// let io = socket(server);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

app.use(express.static('public'));
app.use(express.json());

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('new connection: ' + socket.id);
	console.log(socket);

	socket.on('mouse', mouseMsg);
}

function mouseMsg(data) {
	// socket.broadcast.emit('mouse', data);
	io.sockets.emit('mouse', data);
	console.log(data);
} 

// to static pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/sign", (req, res) => {
    res.sendFile(path.join(__dirname, "public/sign.html"));
});

app.get("/receive", (req, res) => {
    res.sendFile(path.join(__dirname, "public/receive.html"));
});

app.get("/draw", (req, res) => {
    res.sendFile(path.join(__dirname, "public/draw.html"));
});


// // actual API calls
// app.get("/move/:xy", async (req, res) => {
//     let temp = req.params.xy.split(',');
//     console.log(temp);
//     x = temp[0];
//     y = temp[1];
//     port.write(`XM,1000,${x},${y}\r`, function (err) {
//         if (err) {
//             return console.log('Error on write: ', err.message)
//         }
//         console.log('message written', x,y);
//     })
// });

app.listen(port, () => {
    console.log("Server listening at http://localhost:8080!")
});







