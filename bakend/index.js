// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const CHAT_FILE = path.join(__dirname, 'chatData.json');

// Load chat history when the server starts
let chatHistory = [];
if (fs.existsSync(CHAT_FILE)) {
    const data = fs.readFileSync(CHAT_FILE);
    chatHistory = JSON.parse(data);
    //emit last 10 massages
    if (chatHistory.length > 10) {
        chatHistory = chatHistory.slice((chatHistory.length - 10), chatHistory.length)
    }
    console.log(chatHistory.length);

}

// Serve static files (for client-side)
app.use(express.static('../public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Expect the client to send a username
    socket.on('set username', (username) => {
        socket.username = username;
        socket.status = 'connected'
        console.log(`${username} connected`);

        // Send the chat history to the new user
        socket.emit('chat history', chatHistory);
    });

    // Handle incoming messages
    socket.on('chat message', (msg) => {
        const messageData = {
            id: socket.id,
            username: socket.username || 'Anonymous',
            status: socket.status,
            message: msg,
            timestamp: new Date()
        };

        // Add message to chat history
        chatHistory.push(messageData);

        console.log('new length :::', chatHistory.length)
        // Save chat history to the file
        fs.writeFileSync(CHAT_FILE, JSON.stringify(chatHistory, null, 2));

        // Broadcast message to all clients
        io.emit('chat message', messageData);
        if (chatHistory.length > 10) {

            // io.emit('chat history', chatHistory);
        }
    });

    // var clients = io.of().clients();
    
    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.username || 'Anonymous');
        let chatHistory = [];
        if (fs.existsSync(CHAT_FILE)) {
            const data = fs.readFileSync(CHAT_FILE);
            chatHistory = JSON.parse(data);

            chatHistory.forEach(element => {
                if (element.username == socket.username) {
                    element.status = 'disconnect'
                }
                fs.writeFileSync(CHAT_FILE, JSON.stringify(chatHistory, null, 2));
            });
        }

    });
});
// routes
let users = require('./routes/basic/api');
// use postman
app.use('/api/users', users)
// app.get('/api/users', (req, res) => {
//   // to-do
// });

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


