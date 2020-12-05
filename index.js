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

let users = [];
let rooms = [];

io.on('connection', socket => {
    console.log(socket.id);
    socket.on("receiver login", (data) => {
        console.log("a receiver");
        // console.log(data);
        const user = {
            fullname: data.fullname,
            email: data.email,
            id: socket.id
        };
        const room = {
            room: data.roomname,
            cipher: data.cipher
        }
        console.log(user);
        console.log(room);
        users.push(user);
        rooms.push(room);

        socket.join(room.room);
        io.to(room.room).emit('enter', room.room);
        // io.emit("new user", users);
    });

    socket.on("signer login", (data) => {
        // console.log(data);
        console.log("a signer");
        const user = {
            fullname: data.fullname,
            email: data.email,
            id: socket.id
        };
        let room = {
            room: data.roomname
        }

        console.log(user);
        // console.log(rooms);
        let cipher;
        let targetRoomName;

        rooms.forEach(e => {
            if (e.room === room.room) {
                targetRoomName = e.room;
                cipher = e.cipher;
            }
        });
        io.to(socket.id).emit("get cipher from server", cipher);
        socket.on("signer login success", logindata => {
            if (logindata.room === targetRoomName && logindata.cipher === cipher) {
                users.push(user);
                socket.join(targetRoomName);
                console.log(`${user.fullname} joined`);
                io.to(targetRoomName).emit('enter', targetRoomName);
                io.sockets.in(targetRoomName).emit('message', 'what is going on, party people?');
            }
        });
    });

    // socket.on("join room", (room, cb) => {
    //     socket.join(room);
    //     // cb(messages[roomName]);
    // })
});

io.sockets.on('connection', test);
function test(socket){
    console.log("running test");
    socket.on("test", outputTest);
}
function outputTest(data){
    console.log("running outputtest");
    io.sockets.emit("message", "testing 123");
}


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

app.get("/signerlogin", (req, res) => {
    res.sendFile(path.join(__dirname, "public/signerlogin.html"));
});

app.get("/receiverlogin", (req, res) => {
    res.sendFile(path.join(__dirname, "public/receiverlogin.html"));
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

// app.listen(PORT, () => {
//     console.log("Server listening at http://localhost:8080!")
// });