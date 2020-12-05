console.log("hello from the receiverlogin script");

var socket;
let fullname = "";
let email = "";
let roomname = "";
let pw = "";
let cipher = "";
let data = {};

socket = io.connect();

document.querySelector("#createroom").onclick = () => {
    fullname = document.querySelector("#fullname").value;
    email = document.querySelector("#email").value;
    roomname = document.querySelector("#roomname").value;
    pw = document.querySelector("#pw").value;
    console.log(fullname, email, roomname, pw);
    cipher = CryptoJS.AES.encrypt(roomname, pw).toString();
    document.querySelector("#cipher").textContent = cipher;
    data = {
        fullname: fullname,
        email: email,
        roomname: roomname,
        cipher: cipher
    }
    socket.emit('receiver login', data);
};

socket.on('enter', onEnter);
function onEnter(data){
    console.log(data);
}

socket.on('message', onMsg);
function onMsg(data){
    console.log("on message" + data);
}  

socket.on("hello", console.log(data));

