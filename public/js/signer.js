console.log("hello from the signer script");

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
    socket.on('no room', (res) => console.log(res));
    socket.on('get cipher from server', onReceiveCipher);
};

function onReceiveCipher(data){
    console.log(data);
    let ciphertext = data;
    // let logindata;
    bytes = CryptoJS.AES.decrypt(ciphertext, pw);
    originalText = bytes.toString(CryptoJS.enc.Utf8);
    
    if (roomname === originalText) {
        logindata = {room: roomname, cipher: ciphertext};
        socket.emit("signer login success", logindata);
        document.querySelector("#msg").textContent = "login successful";
        document.querySelector("#sign").style.display = "inline";
        document.querySelector("#waiting_message").textContent = "waiting for your receiver's approval to start signing";
    }else{
        document.querySelector("#msg").textContent = "wrong pw, try again";
    }
}

socket.on('enter', (res) => console.log(res));
socket.on('no room', (res) => console.log(res));
socket.on('message', (res) => console.log(res));
socket.on('receiver ready', (res) => {
    if(res){
        // display canvas
        document.querySelector("#signingarea").style.display = "inline";
        document.querySelector("#waiting_message").textContent = "receiver is ready, start signing below";
    }
});



// document.querySelector("#test").onclick = () => {
//     console.log("test button pressed");
//     socket.emit("test", "hi");
// };