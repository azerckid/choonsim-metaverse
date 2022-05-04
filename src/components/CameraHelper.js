import React from "react";
import { PerspectiveCamera } from "three";

function CameraHelper(props) {
  const camera = new PerspectiveCamera(60, 1, 1, 3);
  return (
    <group position={[0, 2, 2]}>
      <cameraHelper args={[camera]} />
    </group>
  );
}

export default CameraHelper;
