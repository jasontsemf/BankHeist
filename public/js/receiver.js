console.log("hello from the receiver script");

function preventBehavior(e) {
    e.preventDefault(); 
};

document.addEventListener("touchmove", preventBehavior, {passive: false});

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
    // console.log(fullname, email, roomname, pw);
    cipher = CryptoJS.AES.encrypt(roomname, pw).toString();
    document.querySelector("#cipher").textContent = cipher;
    data = {
        fullname: fullname,
        email: email,
        roomname: roomname,
        cipher: cipher
    }
    socket.emit('receiver login', data);
    document.querySelector('#msg').textContent = "login successful";
    document.querySelector('#receive').style.display = "inline";
};

document.querySelector("#ready").onclick = () => {
    // console.log("ready is clicked");
    let ready = true;
    socket.emit('receiver ready', ready);
    document.querySelector("#signingarea").style.display = 'inline-block';
    document.querySelector("#ready_message").style.display = 'none';
}

socket.on('enter', (res) => console.log(res));

socket.on('message', (res) => console.log(res));

socket.on('signer logged in', (res) => {
    if (res) {
        document.querySelector("#waiting_message").style.display = "none";
        document.querySelector("#signer_found").style.display = "inline";
    }
});

