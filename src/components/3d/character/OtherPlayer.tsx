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
    nickname?: string;
}

export function OtherPlayer({ id, position, action = "Idle", nickname }: OtherPlayerProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [currentAction, setCurrentAction] = useState(action);

    // Lerp (Linear Interpolation)를 위한 목표 위치
    const targetPosition = useRef(new THREE.Vector3(position.x, position.y, position.z));

    useEffect(() => {
        // 목표 위치 업데이트
        targetPosition.current.set(position.x, position.y, position.z);

        if (!groupRef.current) return;
        const currentPos = groupRef.current.position;
        const dist = currentPos.distanceTo(targetPosition.current);

        // 거리가 너무 멀면(텔레포트 등) 즉시 이동 (초기 렌더링 포함)
        if (dist > 5) {
            groupRef.current.position.copy(targetPosition.current);
        }

        // 애니메이션 상태 업데이트
        if (dist > 0.1) {
            setCurrentAction("Run");
        } else {
            setCurrentAction("Idle");
        }
    }, [position.x, position.y, position.z]);

    // 초기 렌더링 시 위치 강제 설정 (깜빡임/사라짐 방지)
    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.position.set(position.x, position.y, position.z);
        }
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // 1. 부드러운 위치 보간 (Interpolation)
        // lerp factor 0.1은 부드럽게, 0.5는 빠르게 따라감
        // delta를 곱해 프레임 속도에 독립적인 움직임 보장
        groupRef.current.position.lerp(targetPosition.current, delta * 15);

        // 2. 이동 방향 바라보기 (LookAt)
        const currentPos = groupRef.current.position;

        // y축 회전만 적용하기 위해 높이차 무시한 타겟 설정
        const lookTarget = new THREE.Vector3(targetPosition.current.x, currentPos.y, targetPosition.current.z);
        const distSq = currentPos.distanceToSquared(lookTarget);

        // 이동 중일 때만 회전 업데이트 (너무 작은 움직임은 무시하여 떨림 방지)
        if (distSq > 0.001) {
            groupRef.current.lookAt(lookTarget);
        }
    });

    return (
        <group ref={groupRef}>
            <Michel action={currentAction} />

            {/* 닉네임 / ID 표시 */}
            <Html distanceFactor={12} position={[0, 2.2, 0]} center>
                <div className="flex flex-col items-center gap-1">
                    <div className="px-2 py-1 bg-black/60 text-white/90 backdrop-blur-md rounded-md text-[10px] font-bold font-mono border border-white/10 shadow-lg whitespace-nowrap">
                        {nickname || id.slice(0, 5)}
                    </div>
                </div>
            </Html>
        </group>
    );
}
