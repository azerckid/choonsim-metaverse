import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  isPress,
  action,
  playerPosition,
  rotateQuarternionValue,
} from "./atoms";
import Controls from "./Controls";
import Model from "./GLTF/Michel.js";

function Player(props) {
  //
  const rotateQuarternion = useRecoilValue(rotateQuarternionValue);
  //
  const model = useRef();
  //
  const press = useRecoilValue(isPress);

  //
  const playPosition = useRecoilValue(playerPosition);
  //
  const [animation, setAnimation] = useRecoilState(action);
  //

  useFrame(() => {
    if (press) {
      setAnimation("Run");
    } else {
      setAnimation("Idle");
    }
    // console.log("playPosition", playPosition);
    // console.log("modelPosition", model.current.position);
    console.log("rotateQuarternion", rotateQuarternion);
  });

  return (
    <>
      <Controls></Controls>
      <group ref={model}>
        <mesh castShadow>
          <directionalLight intensity={0.9} />
          <Model action={animation} position={playPosition}></Model>
        </mesh>
      </group>
    </>
  );
}

export default Player;
