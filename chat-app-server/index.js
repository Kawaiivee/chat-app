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
const messages = [];

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    socket.broadcast.emit({

    });
  });
  socket.on('message', (data) => {
    console.log(data);
  });
  socket.broadcast()
});

server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});