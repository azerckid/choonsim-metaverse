import React from "react";

function LightControl(props) {
  return (
    <group>
      <ambientLight />
      {/* <pointLight position={[10, 10, 10]} intensity={0.5} castShadow /> */}
      <directionalLight
        intensity={1.5}
        position={[-60, 100, -10]}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
    </group>
  );
}

export default LightControl;
