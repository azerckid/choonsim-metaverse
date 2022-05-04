import React from "react";

function Box(props) {
  return (
    <mesh receiveShadow>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color="pink"
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
}

export default Box;
