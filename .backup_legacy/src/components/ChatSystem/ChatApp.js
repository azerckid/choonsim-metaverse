import styled from "styled-components";
import io from "socket.io-client";

import JoinInfo from "./JoinInfo";

const socket = io("http://localhost:3001");

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
`;

function ChatApp() {
  return (
    <Container>
      <JoinInfo socket={socket}></JoinInfo>
    </Container>
  );
}

export default ChatApp;
