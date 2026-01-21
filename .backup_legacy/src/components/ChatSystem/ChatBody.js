import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div``;
const Body = styled.div`
  height: ${(props) => props.windowDimensions.height - 135}px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  scroll-behavior: smooth;
  overflow-y: scroll;
  background-color: gray;
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  form {
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    input {
      height: 40px;
      flex: 2.5;
    }
    button {
      height: 40px;
      flex: 0.5;
    }
  }
`;
const MessageList = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.name === props.userName ? "flex-start" : "flex-end"};
  justify-content: flex-start;
`;
const MessageBox = styled.div`
  max-width: 70%;
  font-size: 13px;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) =>
    props.name === props.userName ? "teal" : "deepPink"};
`;

function ChatBody({ socket, userName, roomName, windowDimensions }) {
  const [receiveMessage, setReceiveMessage] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messageRef = useRef(null);
  const messageEndRef = useRef(null);
  const message = {
    userName,
    roomName,
    message: currentMessage,
    timestamp: new Date(Date.now()).toLocaleString("ko-KR"),
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage) {
      socket.emit("send_message", message);
      setReceiveMessage((prev) => {
        if (prev) {
          const newbi = prev.filter(
            (prevElem) =>
              prevElem.timestamp !== message.timestamp ||
              prevElem.message !== message.message
          );
          return [...newbi, message];
        }
      });
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("chatBody receive_message", data);
      setReceiveMessage((prev) => {
        if (prev) {
          const newbi = prev.filter(
            (message) =>
              message.timestamp !== data.timestamp ||
              message.message !== data.message
          );
          return [...newbi, data];
        }
      });
    });
  }, [socket]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [receiveMessage]);

  return (
    <Container>
      <Header>
        <h3>LIVE CHAT</h3>
      </Header>
      <Body ref={messageRef} windowDimensions={windowDimensions}>
        {receiveMessage.map((message, index) => (
          <div key={index}>
            <MessageList name={message.userName} userName={userName}>
              <MessageBox name={message.userName} userName={userName}>
                <span>
                  {message.userName === userName ? "me" : message.userName} :{" "}
                </span>
                <p>{message.message}</p>
                <div>{message.timestamp}</div>
              </MessageBox>
            </MessageList>
            <div ref={messageEndRef} />
          </div>
        ))}
      </Body>
      <Footer>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={currentMessage}
            placeholder="Type a message..."
            onChange={(e) => setCurrentMessage(e.currentTarget.value)}
            // onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>SEND</button>
        </form>
      </Footer>
    </Container>
  );
}

export default ChatBody;
