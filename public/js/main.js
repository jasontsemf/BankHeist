console.log("hello from the main script");

let roomname = "";
let pw = "";
let ciphertext = "";

document.querySelector("#createroom").onclick = () => {
    roomname = document.querySelector("#roomname").value;
    pw = document.querySelector("#pw").value;
    console.log(roomname, pw);
    ciphertext = CryptoJS.AES.encrypt(roomname, pw).toString();
    document.querySelector("#cipher").textContent = ciphertext;
};

let roomname2 = "";
let pw2 = "";

// Decrypt
var bytes;
var originalText;

document.querySelector("#joinroom").onclick = () => {
    roomname2 = document.querySelector("#roomname2").value;
    pw2 = document.querySelector("#pw2").value;

    bytes = CryptoJS.AES.decrypt(ciphertext, pw2);
    originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (roomname2 === originalText) {
        document.querySelector("#msg").textContent = "logging in";
    }else{
        document.querySelector("#msg").textContent = "wrong pw, try again";
    }
};

// console.log(originalText); // 'my message'