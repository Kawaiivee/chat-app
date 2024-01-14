import { useState } from "react";
import { sendMessage } from "../api/socketClient";
import { Message } from "../classes/types";

export interface IChatWriterProps {
  name: string,
}

const ChatWriter = ({
  name
}: IChatWriterProps) => {
  const [inputText, setInputText] = useState<string>('');
  const handleSendMessage = () => {
    const message: Message = {
      id: Date.now(),
      author: {
        id: Date.now().toString(),
        name: name
      },
      messageContent: {
        text: inputText,
        timestamp: Date.now().toString(),
      }
    };
    sendMessage(message);
  };

  return (
    <>
    {
      name?.length <= 0
      ?
        <>
          <p>You need to select a valid name!</p>
        </>
      :
        <>
          <input type="text" value={inputText} onChange={(event) => setInputText(event?.target?.value)} />
          <button onClick={() => handleSendMessage()}>Socket Test</button>
        </>
    }
    </>
  )
};

export default ChatWriter