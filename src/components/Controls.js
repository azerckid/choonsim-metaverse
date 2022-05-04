import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useRef } from "react";
import { PerspectiveCamera } from "three";
import { useRecoilValue } from "recoil";
import { action, playerPosition } from "./atoms";

import { A, D, DIRECTIONS, S, W } from "./utils";

function Controls(props) {
  const animation = useRecoilValue(action);
  const modelPosition = useRecoilValue(playerPosition);
  const controls = useRef();
  const {
    gl: { domElement },
  } = useThree();
  const camera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 5, 5);

  function update(delta, keysPressed) {
    // const directionPressed = DIRECTIONS.some((key) => keysPressed[key] == true);
  }

  useFrame(() => {
    update();
    controls.current.update();
  });

  return (
    <>
      <OrbitControls
        ref={controls}
        args={[camera, domElement]}
        autoRotateSpeed={0.5}
        enableDamping={true}
        minDistance={5}
        maxDistance={15}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.2}
        enableZoom={true}
      />
    </>
  );
}

export default Controls;
