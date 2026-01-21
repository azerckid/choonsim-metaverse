"use client";

import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useAspect } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useGameStore } from "@/store/useGameStore";

export function MoviePlane(props: ThreeElements["mesh"]) {
    const size = useAspect(1280, 720);
    const isStarted = useGameStore((state) => state.isStarted);

    const [video] = useState(() => {
        if (typeof window === "undefined") return null;
        const v = document.createElement("video");
        v.src = "/tomboy.mp4";
        v.crossOrigin = "anonymous";
        v.loop = true;
        v.muted = true; // 자동 재생을 위해 반드시 muted 설정
        v.playsInline = true;
        return v;
    });

    useEffect(() => {
        if (!video || !isStarted) return;

        // 사용자가 '입장' 버튼을 누른 후 재생 시도
        const playVideo = async () => {
            try {
                video.muted = false; // 입장이 확인되었으므로 음소거 해제
                video.volume = 0.3;  // 배경음으로 적절한 볼륨 설정
                await video.play();
                console.log("Video started playing with audio");
            } catch (err) {
                console.warn("Audio play failed, playing muted as fallback:", err);
                video.muted = true;
                await video.play();
            }
        };

        playVideo();

        return () => {
            video.pause();
        };
    }, [video, isStarted]);

    if (!video) return null;

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
