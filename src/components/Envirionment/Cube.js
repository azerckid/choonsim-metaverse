import React from "react";
import { useBox } from "@react-three/cannon";

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    ...props,
  }));
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={props.color} />
    </mesh>
  );
}

export default Cube;
