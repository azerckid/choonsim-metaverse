import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  action,
  directionOffsetFunction,
  playerPosition,
  rotateQuarternionValue,
} from "../../recoil";
import InputKeys from "./InputKeys";

function Controls({ model }) {
  const orbitControlRef = useRef();
  const { camera } = useThree();

  const animation = useRecoilValue(action);
  const directionOffset = useRecoilValue(directionOffsetFunction);
  const [modelPosition, setModelPosition] = useRecoilState(playerPosition);

  const setRotateQuarternionV = useSetRecoilState(rotateQuarternionValue);

  let walkDirection = new THREE.Vector3();
  let rotateAngle = new THREE.Vector3(0, 1, 0);
  let rotateQuarternion = new THREE.Quaternion();
  let cameraTarget = new THREE.Vector3();
  const walkVelocity = 0.05;

  useFrame(() => {
    let angleYCameraDirection = Math.atan2(
      camera.position.x - modelPosition.x,
      camera.position.z - modelPosition.z
    );

    rotateQuarternion.setFromAxisAngle(
      rotateAngle,
      angleYCameraDirection + directionOffset
    );

    model.current.quaternion.rotateTowards(
      rotateQuarternion,
      THREE.MathUtils.degToRad(10)
    );

    setRotateQuarternionV(rotateQuarternion);

    camera.getWorldDirection(walkDirection);
    walkDirection.y = 0;
    walkDirection.normalize();
    walkDirection.applyAxisAngle(rotateAngle, directionOffset);

    const velocity = animation === "Run" ? walkVelocity : 0;

    const moveX = walkDirection.x * velocity;
    const moveZ = walkDirection.z * velocity;
    setModelPosition({
      x: modelPosition.x - moveX,
      y: modelPosition.y,
      z: modelPosition.z - moveZ,
    });

    // updateCameraTarget(moveX, moveZ);
    camera.position.x -= moveX;
    camera.position.z -= moveZ;
    // update camera target
    cameraTarget.x = modelPosition.x;
    cameraTarget.y = modelPosition.y + 1;
    cameraTarget.z = modelPosition.z;
    orbitControlRef.current.target = cameraTarget;

    orbitControlRef.current.update();
  });

  return (
    <>
      <OrbitControls
        ref={orbitControlRef}
        // autoRotateSpeed={0.5}
        enableDamping={true}
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2 - 0.2}
        minPolarAngle={Math.PI / 2 - 0.6}
      />
      <InputKeys />
    </>
  );
}

export default Controls;
