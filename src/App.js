import io from "socket.io-client";

import Scene01 from "./scene/scene01";

// const socket = io("https://mogame-server-01.herokuapp.com/");
const socket = io("http://localhost:5050");

function App() {
  return (
    <>
      <Scene01 socket={socket} />
    </>
  );
}

export default App;
