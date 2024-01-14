import { useEffect, useState } from "react";
import ChatWriter from "./components/ChatWriter";

const App = () => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if(name?.length <= 0){
      const dialogText = window.prompt("Please enter a username");
      setName(dialogText ?? '');
    }
  }, []);

  return (
    <>
      <></>
      <>
        <ChatWriter name={name} />
      </>
    </>
  )
};

export default App;
