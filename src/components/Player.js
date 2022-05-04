import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isPress, action, playerPosition } from "./atoms";
import Controls from "./Controls";
import Model from "./GLTF/Michel.js";

function Player(props) {
  const model = useRef();
  const [playPosition, setPlayPosition] = useRecoilState(playerPosition);
  //
  const [animation, setAnimation] = useRecoilState(action);
  const press = useRecoilValue(isPress);

  useEffect(() => {
    if (press) {
      setAnimation("Run");
    } else {
      setAnimation("Idle");
    }
  }, [press, animation]);

  useFrame(() => {
    console.log("playPosition", playPosition);
    console.log("modelPosition", model.current.position);
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
