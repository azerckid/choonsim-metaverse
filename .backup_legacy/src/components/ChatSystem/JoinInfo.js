import { useEffect, useState } from "react";
import styled from "styled-components";

import ChatBody from "./ChatBody";

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: bisque;
  input {
    width: 100px;
  }
  button {
    height: 40px;
    width: 100px;
  }
`;
const Title = styled.div``;

function JoinInfo({ socket }) {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("default");
  // const [roomList, setRoomList] = useState([]);

  const joinRoom = () => {
    if (userName && roomName) {
      socket.emit("join_room", roomName);
    }
  };

  // useEffect(() => {
  //   socket.on("room", (data) => {
  //     setRoomList((prev) => [...prev, data]);
  //   });
  // }, [socket]);

  return (
    <Container>
      <Title>JOIN A CHAT</Title>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => setUserName(e.currentTarget.value)}
      />
      {/* <input
        type="text"
        placeholder="Enter your room"
        onChange={(e) => setRoomName(e.currentTarget.value)}
      /> */}
      <button onClick={joinRoom}>Join a Room</button>
      {/* <div>room list</div>
      {roomList.map((room, index) => (
        <div key={index} onClick={() => joinRoom}>
          😀 {room}
        </div>
      ))} */}
      <ChatBody socket={socket} userName={userName} roomName={roomName} />
    </Container>
  );
}

export default JoinInfo;
