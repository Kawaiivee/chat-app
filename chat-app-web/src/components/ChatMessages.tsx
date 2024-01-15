import { useState, useEffect, useContext } from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../context/socket';

const ChatMessages = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageCount, setMessageCount] = useState<number>(0);

  useEffect(() => {
    socket.on('server_received_message', (data) => {
      setMessages(data);
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('server_received_message');
    };
  }, [socket]);

  return (
    <ul>
      {messages.map((x) => (
        <li key={x?.timestamp}>
          {x?.text}
        </li>
      ))}
    </ul>
  );
};

export default ChatMessages;