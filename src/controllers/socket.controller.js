module.exports = (io) => {
    io.on('connection', (client) => {
        console.log('a user connected')
        let room; 

        // Join room chat
        client.on('join', (data) => {
            room = data.room;
            console.log(`${data.name} joined room: ${room}`)
            client.join(room);
        });
        
        // Handle incoming messages
        client.on("message", (data) => {
            io.to(room).emit("thread", data);
        });
    });
};