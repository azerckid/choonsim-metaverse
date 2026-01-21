"use client";

import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Michel } from "./Michel";

interface OtherPlayerProps {
    id: string;
    position: { x: number; y: number; z: number };
    action?: string;
}

export function OtherPlayer({ id, position, action = "Idle" }: OtherPlayerProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [currentAction, setCurrentAction] = useState(action);

    // 이전 위치 저장용 (이동 감지 및 회전 계산)
    const prevPosition = useRef(new THREE.Vector3(position.x, position.y, position.z));

    // Lerp (Linear Interpolation)를 위한 목표 위치
    const targetPosition = useRef(new THREE.Vector3(position.x, position.y, position.z));

    useEffect(() => {
        // 목표 위치 업데이트
        targetPosition.current.set(position.x, position.y, position.z);

        // 움직임 감지하여 애니메이션 설정
        const dist = prevPosition.current.distanceTo(targetPosition.current);
        if (dist > 0.01) {
            setCurrentAction("Run");
        } else {
            setCurrentAction("Idle");
        }
    }, [position.x, position.y, position.z]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // 1. 부드러운 위치 보간 (Interpolation)
        // lerp factor 0.1은 부드럽게, 0.5는 빠르게 따라감
        // delta를 곱해 프레임 속도에 독립적인 움직임 보장
        groupRef.current.position.lerp(targetPosition.current, delta * 15);

        // 2. 이동 방향 바라보기 (LookAt)
        const currentPos = groupRef.current.position;
        const diff = new THREE.Vector3().subVectors(targetPosition.current, currentPos);

        // 이동 중일 때만 회전 업데이트
        if (diff.lengthSq() > 0.001) {
            const lookTarget = new THREE.Vector3().addVectors(currentPos, diff);
            groupRef.current.lookAt(lookTarget);
        }

        prevPosition.current.copy(currentPos);
    });

    return (
        <group ref={groupRef} position={[position.x, position.y, position.z]}>
            <Michel action={currentAction} />

            {/* 닉네임 / ID 표시 */}
            <Html distanceFactor={12} position={[0, 2.2, 0]} center>
                <div className="flex flex-col items-center gap-1">
                    <div className="px-2 py-1 bg-black/60 text-white/50 backdrop-blur-md rounded-md text-[10px] font-mono border border-white/10 shadow-lg">
                        {id.slice(0, 5)}...
                    </div>
                </div>
            </Html>
        </group>
    );
}
