import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useRecoilState, useRecoilValue } from "recoil";

import { action, playerPosition, keyPressed } from "./atoms";
import Controls from "./Controls";
import Model from "./GLTF/Michel.js";

function Player(props) {
  const model = useRef();

  const pressedKeys = useRecoilValue(keyPressed);
  const playPosition = useRecoilValue(playerPosition);
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
    model.current?.position.set(playPosition.x, playPosition.y, playPosition.z);
  });

  return (
    <>
      <Controls model={model}></Controls>
      <group ref={model}>
        <directionalLight intensity={0.9} />
        <Model action={animation}></Model>
      </group>
    </>
  );
}

export default Player;
