import { io } from "socket.io-client";
import { Message } from "../classes/types";

// for emitting socket events -- listening happens in components
const socket = io();

const connectToServer = () => {
  socket.connect();
};

const sendMessage = (message: Message) => {
  socket.emit('message', message);
};

export { connectToServer, sendMessage };