require('dotenv').config();

const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app.use(cors()));
const io = new Server(server, {cors:
  {
    origin: "*",
    allowedHeaders: ["Access-Control-Allow-Origin"]
  }
});

let messages = [];
let users = [];

io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    console.log(`Socket Id: ${socket.id} disconnected`);
    users = users.filter(a => a.id !== socket.id);
  });
  
  socket.on('send_global_message', (message) => {
    console.log(`Global: ${decodeURIComponent(message?.messageContent?.text)} from ${message?.author?.name}`);
    message.messageContent.text = decodeURIComponent(message?.messageContent?.text);
    messages.push(message?.messageContent);
    io.sockets.emit('server_received_message', messages);
  });

  socket.on('send_whisper_message', (message) => {
    console.log(`Whisper: ${decodeURIComponent(message?.messageContent?.text)} from ${message?.author?.name}`);
    message.messageContent.text = decodeURIComponent(message?.messageContent?.text);
    messages.push(message?.messageContent);
    io.sockets.emit('server_received_message', messages);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});