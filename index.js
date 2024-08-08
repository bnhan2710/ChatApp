const express = require('express')
const app = express()
const { Server } = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = new Server(server) 
require('dotenv').config()
const port = process.env.PORT

app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')


io.on('connection', (client) => {
    console.log('a user connected')
    var room;//room chat

    //join room chat
    client.on('join', (data) => {
        room = data.room;
        console.log(`${data.name} da vao Phong chat: ${room}`)
        client.join(room);
    })
    
    client.on("message",(data)=>{
        io.to(room).emit("thread", data); 
     })
})

app.get('/chat' ,(req,res)=>{
    res.render('chat.ejs')
})

server.listen(port, () => {
    console.log(`Server run at port ${port}`)
})