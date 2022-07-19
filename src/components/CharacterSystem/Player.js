import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useRecoilState, useRecoilValue } from "recoil";

import { useBox } from "@react-three/cannon";
import { action, playerPosition, keyPressed } from "../../recoil";
import Controls from "./Controls";
import Model from "../GLTF/Michel.js";

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
      </group>
      <Controls model={model}></Controls>
    </>
  );
}

export default Player;
