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

const tagColors = [   // React antd "Tag" colors
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
];

let messages = [];
let users = [];   // NEED SOME KIND OF GUID FOR USERS TO STORE COLOR AND OTHER INDIVIDUAL INFO

io.on('connection', (socket) => {
  io.sockets.emit('server_received_message', messages);

  console.log(`Socket ID: ${socket.id} connected`);
  users.push({
    id: socket.id,
    color: tagColors[Math.floor(Math.random() * tagColors.length)]
  });
  console.log(users.map(u => u.Id).toString());
  
  socket.on('disconnect', () => {
    //console.log(`Socket Id: ${socket.id} disconnected`);
    users = users.filter(u => u.id !== socket.id);
  });
  
  socket.on('send_global_message', (message) => {
    //console.log(`Global: ${decodeURIComponent(message?.messageContent?.text)} from ${message?.author?.name}`);
    message.author.color = tagColors[Math.floor(Math.random() * tagColors.length)];

    message.messageContent.text = decodeURIComponent(message?.messageContent?.text);
    messages.unshift(message);
    io.sockets.emit('server_received_message', messages);
  });

  socket.on('send_whisper_message', (message) => {
    //console.log(`Whisper: ${decodeURIComponent(message?.messageContent?.text)} from ${message?.author?.name}`);
    message.author.color = tagColors[Math.floor(Math.random() * tagColors.length)];
    
    message.messageContent.text = decodeURIComponent(message?.messageContent?.text);
    messages.unshift(message);
    io.sockets.emit('server_received_message', messages);
  });

  socket.on('reset', () => {
    messages = [];
    users = [];
    io.sockets.emit('server_received_message', messages);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
