import React from "react";
import { useLoader } from "@react-three/fiber";
import placeholder from "./images/placeholder.png";
import { TextureLoader, RepeatWrapping } from "three";

function Plane(props) {
  const placeholderMap = useLoader(TextureLoader, placeholder);
  placeholderMap.wrapS = placeholderMap.wrapT = RepeatWrapping;
  placeholderMap.repeat.x = placeholderMap.repeat.y = 200;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry attach="geometry" args={[1000, 1000]} />
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
