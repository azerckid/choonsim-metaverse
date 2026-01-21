import React, { useState } from "react";
import styled from "styled-components";
import { Html } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import ChatApp from "../ChatSystem/ChatApp";

const Modal = styled.div`
  position: absolute;
  top: -400px;
  left: 0;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  color: #000;
  z-index: 1000;
  display: ${(props) => (props.open ? "block" : "none")};
  div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h1 {
      margin-bottom: 20px;
    }
  }
  div:nth-child(2) {
    height: 340px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    background-color: aquamarine;
  }
`;

function ChatCube(props) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [ref] = useBox(() => ({
    mass: 1,
    ...props,
  }));

  return (
    <>
      <mesh
        ref={ref}
        castShadow
        onClick={() => {
          setClicked(!clicked);
          setOpen(!open);
        }}
        onPointerOver={() => setHovered(!hovered)}
        onPointerOut={() => setHovered(!hovered)}
        scale={!clicked ? [1, 1, 1] : [1.5, 1.5, 1.5]}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial
          attach="material"
          color={!hovered ? props.color : "red"}
        />
        <Html center>
          <Modal open={open}>
            <div>
              <h1>HELLO WORLD</h1>
              <button onClick={() => setOpen(false)}>close</button>
            </div>
            <div>
              <ChatApp></ChatApp>
            </div>
          </Modal>
        </Html>
      </mesh>
    </>
  );
}

export default ChatCube;
