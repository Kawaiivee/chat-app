import { useEffect } from 'react';
import { io } from "socket.io-client";
import { Message } from './../classes/types';
import { sendMessage } from './../api/socketClient';

export interface IChatMessagesProps {
  messages: Message[]
}

const ChatMessages = ({

}: IChatMessagesProps) => {

  return (
    <></>
  );
};

export default ChatMessages;