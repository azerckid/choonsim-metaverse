import React from "react";
import { useLoader } from "@react-three/fiber";
import placeholder from "../images/placeholder.png";
import { TextureLoader, RepeatWrapping } from "three";
import { usePlane } from "@react-three/cannon";

function Plane(props) {
  const placeholderMap = useLoader(TextureLoader, placeholder);
  placeholderMap.wrapS = placeholderMap.wrapT = RepeatWrapping;
  placeholderMap.repeat.x = placeholderMap.repeat.y = 10;

  const [ref] = usePlane(() => ({
    mass: 0,
    ...props,
  }));

  return (
    <group>
      <mesh ref={ref} receiveShadow>
        <planeGeometry attach="geometry" args={[50, 50]} />
        <meshStandardMaterial
          attach="material"
          color={"teal"}
          roughness={0.5}
          metalness={0.2}
          map={placeholderMap}
        />
      </mesh>
    </group>
  );
}

export default Plane;
