const electron = require('electron');
const path = require('path');
const ipc = electron.ipcRenderer;

const scanBtn = document.getElementById('scan');
const connectBtn = document.getElementById('connect');
const select = document.getElementById('select');
const msg = document.getElementById('msg');
const textArea = document.getElementById('command');
const sendBtn = document.getElementById('send');
const ins = document.getElementById('ins');
let aPorts = [];

scanBtn.onclick = () => {
    console.log("scan button clicked");
    ipc.send('scan', true);
};

connectBtn.onclick = () => {
    console.log("connect button clicked");
    let thePort = select.options[select.selectedIndex].value;
    console.log(thePort);
    ipc.send('connect', thePort);
};

sendBtn.onclick = () => {
    console.log("send button clicked");
    ipc.send('sendCmd', textArea.value);
};

ipc.on('aPorts', (event, arg) => {
    aPorts = arg;
    console.log(aPorts);
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    aPorts.forEach(port => {
        let option = document.createElement("option");
        option.value = port;
        option.textContent = port;
        select.appendChild(option);
    });
});

ipc.on('portConnected', (event, arg) => {
    console.log("connected");
    msg.textContent = "You are connected";
    ins.style.display = "inline";
});

ipc.on('cmdWrite', (event, arg) => {
    console.log("Command written");
    textArea.textContent = arg;
});

console.log("hello from renderjs");