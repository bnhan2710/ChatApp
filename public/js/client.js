const ip_name = document.getElementById('name');
const ip_room = document.getElementById('room');
const btn_join = document.getElementById('btn_join');

const ip_message = document.getElementById('ip_message');
const btn_send = document.getElementById('btn_send');
const ul_message = document.getElementById('ul_message')
let socket = io.connect();

socket.on("connect", () => {
    console.log('Connected to server');
});

btn_join.addEventListener('click', () => {
    const name = ip_name.value;
    const room = ip_room.value;
    if (name && room) {
        socket.emit("join", { name, room });
    } else {
        alert('Please enter both name and room');
    }
});

btn_send.addEventListener('click', () => {
    const message = ip_message.value;
    const name = ip_name.value;
    if (message && room) {
        socket.emit("message", { name, message });
        ip_message.value = '';
    } else {
        alert('Please enter a message');
    }
});

socket.on("thread", (data) => {
    const li = document.createElement("li")
    li.innerText = ` - ${data.name}: ${data.message}`
    ul_message.appendChild(li)
});