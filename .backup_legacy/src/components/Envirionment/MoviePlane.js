import React from "react";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { useAspect } from "@react-three/drei";

function MoviePlane(props) {
  const size = useAspect(1280, 720);
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/tomboy.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );

  useEffect(() => void video.play(), [video]);
  return (
    <mesh scale={size} {...props}>
      <planeBufferGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </mesh>
  );
}

export default MoviePlane;
