import { createContext, useEffect, useState } from "react";
import ChatWriter from "./components/ChatWriter";
import ChatMessages from "./components/ChatMessages";
import { Row, Divider } from "antd";
import {socket, SocketContext} from "./context/socket";

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Row>
        <ChatMessages />
      </Row>
      <Divider />
        <ChatWriter />
    </SocketContext.Provider>
  )
};

export default App;
