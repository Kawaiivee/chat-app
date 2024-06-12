import { useState } from 'react';
import ChatWriter from "./components/ChatWriter";
import ChatMessages from "./components/ChatMessages";
import { Col, Divider, Row } from "antd";
import {socket, SocketContext} from "./context/socket";
// import DoodleCanvas from "./components/DoodleCanvas";

const App = () => {
  
  return (
    <SocketContext.Provider value={socket}>
      <Row>
        {/* <Col span={12}>
          <DoodleCanvas />
        </Col> */}
        <Col span={12}>
          <ChatWriter />
          <Divider />
          <ChatMessages />
        </Col>
      </Row>
    </SocketContext.Provider>
  )
};

export default App;
