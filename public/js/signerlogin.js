console.log("hello from the signerlogin script");

var socket;
let fullname = "";
let email = "";
let roomname = "";
let pw = "";
let cipher = "";
let data = {};
let logindata;

socket = io.connect();

document.querySelector("#joinroom").onclick = () => {
    fullname = document.querySelector("#fullname").value;
    email = document.querySelector("#email").value;
    roomname = document.querySelector("#roomname").value;
    pw = document.querySelector("#pw").value;
    console.log(fullname, email, roomname, pw);
    cipher = CryptoJS.AES.encrypt(roomname, pw).toString();
    // document.querySelector("#cipher").textContent = cipher;
    data = {
        fullname: fullname,
        email: email,
        roomname: roomname
    }
    socket.emit('signer login', data);
    socket.on('get cipher from server', onReceiveCipher);
};

document.querySelector("#test").onclick = () => {
    console.log("test button pressed");
    socket.emit("test", "hi");
};

socket.on('enter', onEnter);

function onEnter(data){
    console.log(data);
}

socket.on('message', onMsg);
function onMsg(data){
    console.log("on message" + data);
}  

function onReceiveCipher(data){
    console.log(data);
    let ciphertext = data;
    // let logindata;
    bytes = CryptoJS.AES.decrypt(ciphertext, pw);
    originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (roomname === originalText) {
        document.querySelector("#msg").textContent = "logging in";
        logindata = {room: roomname, cipher: ciphertext};
        socket.emit("signer login success", logindata);
    }else{
        document.querySelector("#msg").textContent = "wrong pw, try again";
    }
}

