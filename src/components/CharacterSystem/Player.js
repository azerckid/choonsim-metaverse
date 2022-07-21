import React, { useRef } from "react";
import styled from "styled-components";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRecoilState, useRecoilValue } from "recoil";

import { useBox } from "@react-three/cannon";
import { action, playerPosition, keyPressed } from "../../recoil";
import Controls from "./Controls";
import Model from "../GLTF/Michel.js";

const NameTag = styled.div`
  position: relative;
  top: -280px;
  left: -50px;
  padding-top: 10px;
  transform: translate3d(50%, 0, 0);
  text-align: left;
  background: #202035;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
`;

function Player(props) {
  const model = useRef();
  const [refcannon] = useBox(() => ({
    mass: 1,
  }));

  const pressedKeys = useRecoilValue(keyPressed);
  const modelPosition = useRecoilValue(playerPosition);
  const [animation, setAnimation] = useRecoilState(action);

  useFrame(() => {
    // console.log("pressedKeys", pressedKeys);
    const start = Object.keys(pressedKeys).find(
      (key) => pressedKeys[key] === true
    );
    // const shift = Object.keys(pressedKeys).find(
    //   (key) => pressedKeys[key] === true && key === "shift"
    // );

    if (start) {
      setAnimation("Run");
    } else {
      setAnimation("Idle");
    }
  });

  useFrame(() => {
    model.current?.position.set(
      modelPosition.x,
      modelPosition.y,
      modelPosition.z
    );
  });

  return (
    <>
      <group ref={model}>
        <directionalLight intensity={0.9} />
        <Model action={animation} ref={refcannon}></Model>
        <Html distanceFactor={10}>
          <NameTag class="content">
            hello <br />
            I'm Michel
          </NameTag>
        </Html>
      </group>
      <group>
        <Controls model={model}></Controls>
      </group>
    </>
  );
}

export default Player;
