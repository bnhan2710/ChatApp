const res = require('express/lib/response');
const { checkAuthToken } = require('../utils/checkAuthToken');

module.exports = (io) => {
    io.on('connection', (client) => {
        client.auth = false;
        client.on('authenticate', async (data) => {
            try {
                const result = await checkAuthToken(data.token);
                if (result.statusCode === 200) {
                    console.log("Authenticated socket ",result.user.username );
                    client.auth = true;
                } else {
                    console.log("Authentication failed for socket ");
                }
            } catch (error) {
                console.error('Authentication error:', error);
            }
        });

        setTimeout(() => {
            if (!client.auth) {
                console.log("Disconnecting socket ");
                client.disconnect('unauthorized');
            }
        }, 2000);

        // Join room chat
        client.on('join', async (data) => {
            const result = await checkAuthToken(data.token);
            const username = result.user.username
            if (client.auth) {
                const room = data.room;
                console.log(`${username} joined room: ${room}`);
                client.join(room);
                client.emit('join',username)
            } else {
                console.log('Client not authenticated');
            }
        });

        // Handle incoming messages
        client.on('message', (data) => {
            if (client.auth) {
                const obj = JSON.parse(data);
                const room = obj.room;
                io.to(room).emit('thread', data);
            } else {
                console.log('Client not authenticated');
            }
        });
    });
};