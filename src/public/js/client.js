const ip_name = document.getElementById('name');
const ip_room = document.getElementById('room');
const btn_join = document.getElementById('btn_join');

const ip_message = document.getElementById('ip_message');
const btn_send = document.getElementById('btn_send');
const ul_message = document.getElementById('ul_message');

let socket = io.connect();
let currentUserName = ''; 

socket.on("connect", () => {
    console.log('Connected to server');
});

btn_join.addEventListener('click', () => {
    const name = ip_name.value;
    const room = ip_room.value;
    if (name && room) {
        currentUserName = name; 
        socket.emit("join", { name, room });
        alert(`Join room ${room} successfully !!`)
    } else {
        alert('Please enter both name and room');
    }
});

const sendmsg = () => {
    console.log('send message');
    const message = ip_message.value;
    const obj ={ 
        name:currentUserName,
         message 
        }
    if (message) {
        socket.emit("message",JSON.stringify(obj));
        ip_message.value = '';
    } else {
        alert('Please enter a message');
    }
}

btn_send.addEventListener('click', sendmsg);


socket.on("thread", (data) => {
    const obj = JSON.parse(data)
    const li = document.createElement("li");
    li.innerText = `${obj.message}`;
    
    if (obj.name === currentUserName) {
        li.classList.add('message-self');
    } else {
        li.classList.add('message-other');
    }
    
    ul_message.appendChild(li);
    ul_message.scrollTop = ul_message.scrollHeight; 
});

ip_message.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        sendmsg();
    }
})