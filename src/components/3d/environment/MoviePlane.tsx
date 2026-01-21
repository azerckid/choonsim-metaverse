"use client";

import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useAspect } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export function MoviePlane(props: ThreeElements["mesh"]) {
    const size = useAspect(1280, 720);
    const [video] = useState(() => {
        const v = document.createElement("video");
        if (typeof window !== "undefined") {
            v.src = "/tomboy.mp4";
            v.crossOrigin = "anonymous";
            v.loop = true;
            v.muted = true;
        }
        return v;
    });

    useEffect(() => {
        if (video) {
            video.play().catch((err: Error) => console.log("Video play failed:", err));
        }
        return () => {
            if (video) {
                video.pause();
                video.src = "";
            }
        };
    }, [video]);

    return (
        <mesh scale={[size[0] * 1.5, size[1] * 1.5, 1]} {...props}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial toneMapped={false}>
                <videoTexture
                    attach="map"
                    args={[video]}
                    colorSpace={THREE.SRGBColorSpace}
                />
            </meshBasicMaterial>
        </mesh>
    );
}
