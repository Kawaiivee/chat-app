import React, {useState, useContext, useCallback, useEffect, ChangeEvent} from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../context/socket';
import { Message } from "../classes/types";
import { Input, Select, Row, Col, Button, } from "antd";
const { Option } = Select;

const ChatWriter = () => {

  const socket = useContext<Socket>(SocketContext);
  const [nameSelected, setNameSelected] = useState<boolean>(false);
  const [name, setName] = useState<string>(localStorage.getItem('name') ?? '');
  const [inputText, setInputText] = useState<string>('');
  const [messageAudience, setMessageAudience] = useState<string>('global');

  useEffect(() => {
    if(name == null || name == undefined || name?.length <= 0){
      setNameSelected(false);
    }
  }, []);

  const handleSetNameClicked = () => {
    localStorage.setItem('name', name);
    setName(name);
    setNameSelected(true);
  };

  const handleSendMessageClicked = () => {
    const message: Message = {
      id: Date.now().toString(),
      author: {
        id: Date.now().toString(),
        name: name
      },
      messageContent: {
        text: encodeURIComponent(inputText),
        timestamp: Date.now().toString(),
      }
    };
    
    socket.emit(`send_${messageAudience}_message`, message); 
  };

  return (
    <>
    {
      (!nameSelected)
      ?
        <>
          <Row>
            <Col>
              <Input 
                value={name}
                onChange={(event) => setName(event?.target?.value)}
                  />
            </Col>
            <Col> 
              <Button onClick={() => handleSetNameClicked()}>Set Name</Button>
            </Col>
          </Row>
        </>
      :
        <>
          <Row>
            <Col span={12}>
              <Input 
                value={inputText}
                onChange={(event) => setInputText(event?.target?.value)}
                addonBefore={
                  <>
                    <Select defaultValue="global" onSelect={(val: string) => setMessageAudience(val)}>
                      <Option value="global">global</Option>
                      <Option value="whisper">whisper</Option>
                    </Select>
                    {
                    (messageAudience === 'whisper')
                    ? 
                      <Select defaultValue={"Select a user to whisper to: "}>
                        <Option value=''>Name1</Option>
                        <Option>Name2</Option>
                        <Option>Name3</Option>
                      </Select>
                    :
                      <></>
                    }
                  </>
                }
              />
            </Col>
            <Col> 
              <Button onClick={() => handleSendMessageClicked()}>Send</Button>
            </Col>
          </Row>
        </>
    }
    </>
  )
};

export default ChatWriter;