import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  action,
  directionOffsetFunction,
  playerPosition,
  rotateQuarternionValue,
} from "./atoms";

function Controls(props) {
  //
  // eslint-disable-next-line
  const [rotateQuarternionV, setRotateQuarternionV] = useRecoilState(
    rotateQuarternionValue
  );
  //
  const directionOffset = useRecoilValue(directionOffsetFunction);
  //
  const animation = useRecoilValue(action);
  const [modelPosition, setModelPosition] = useRecoilState(playerPosition);
  //
  const controls = useRef();
  const {
    camera,
    gl: { domElement },
  } = useThree();

  // camera.position.set(0, 10, 5);

  let walkDirection = new THREE.Vector3();
  let rotateAngle = new THREE.Vector3(0, 1, 0);
  let rotateQuarternion = new THREE.Quaternion();
  let cameraTarget = new THREE.Vector3();
  const walkVelocity = 0.05;

  useFrame(() => {
    if (animation === "Run") {
      // console.log(animation);
      // setModelPosition({
      //   x: modelPosition.x,
      //   y: modelPosition.y,
      //   z: modelPosition.z + 0.005,
      // });
      // console.log("modelPosition", modelPosition);
      //
      // calculate towards camera direction
      let angleYCameraDirection = Math.atan2(
        camera.position.x - modelPosition.x,
        camera.position.z - modelPosition.z
      );
      //
      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + directionOffset
      );
      // console.log("rotateQuarternion", rotateQuarternion);
      setRotateQuarternionV(rotateQuarternion);
      //
      // calculate walk direction
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, directionOffset);
      //
      // run/walk velocity
      const velocity = animation === "Run" ? walkVelocity : 0;
      // move model & camera
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
      controls.current.target = cameraTarget;
    }
    controls.current.update();
  });

  return (
    <>
      <OrbitControls
        ref={controls}
        args={[camera, domElement]}
        // autoRotateSpeed={0.5}
        enableDamping={true}
        minDistance={5}
        maxDistance={1}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.2}
        minPolarAngle={Math.PI / 2 - 0.6}
        enableZoom={true}
      />
    </>
  );
}

export default Controls;
