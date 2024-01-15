import React from 'react';
import { Socket, io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_CHAT_SERVER_SOCKET_URL);
export const SocketContext = React.createContext<Socket>(socket);