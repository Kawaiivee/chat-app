import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/socket';
import { Tag, Row, Typography }from 'antd';

export interface IChatMessageProps { };

const ChatMessages = ({ }: IChatMessageProps) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [notificationSound, setNotificationSound] = useState<HTMLAudioElement>(new Audio('/notification.mp3'));

  useEffect(() => {
    socket.on('server_received_message', (data) => {
      setMessages(data);
      // add author/user or author/userid to the socket context to use as a check to NOT play notification sound if message is posted from same user
      notificationSound.play();
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('server_received_message');
    };
  });

  return (
  <>
    {messages.map((x, idx) => {
      if(x == null || x == undefined || x?.messageContent.timestamp == null || x?.messageContent?.timestamp == undefined){
        return (<></>);
      }
      else {
        return(
          <Row key={idx}>
            <Tag
              color={x?.author?.color}
            >{x?.author?.name}</Tag>
            <Typography>
              {x?.messageContent?.text}
            </Typography>
          </Row>
        );
      }
    })}
  </>
  );
};

export default ChatMessages;