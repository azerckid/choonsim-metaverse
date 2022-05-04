import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isPress, action } from "./atoms";
import Controls from "./Controls";
import Model from "./GLTF/Michel.js";

function Player(props) {
  const [animation, setAnimation] = useRecoilState(action);
  const press = useRecoilValue(isPress);

  useEffect(() => {
    if (press) {
      setAnimation("Run");
    } else {
      setAnimation("Idle");
    }
  }, [press, animation]);

  return (
    <>
      <Controls></Controls>
      <group>
        <mesh castShadow>
          <directionalLight intensity={0.9} />
          <Model action={animation}></Model>
        </mesh>
      </group>
    </>
  );
}

export default Player;
