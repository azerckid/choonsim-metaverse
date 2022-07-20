import React, { useState } from "react";
import { useBox } from "@react-three/cannon";

function Cube(props) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ref] = useBox(() => ({
    mass: 1,
    ...props,
  }));
  return (
    <mesh
      {...props}
      ref={ref}
      castShadow
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(!hovered)}
      onPointerOut={() => setHovered(!hovered)}
      scale={!clicked ? [1, 1, 1] : [1.5, 1.5, 1.5]}
    >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={!hovered ? props.color : "red"}
      />
    </mesh>
  );
}

export default Cube;
