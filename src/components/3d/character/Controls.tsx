"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGameStore } from "@/store/useGameStore";

interface ControlsProps {
    model: React.RefObject<THREE.Group | null>;
}

export function Controls({ model }: ControlsProps) {
    const orbitRef = useRef<any>(null);
    const { camera } = useThree();

    const action = useGameStore((state) => state.action);
    const directionOffset = useGameStore((state) => state.directionOffset);
    const playerPosition = useGameStore((state) => state.playerPosition);

    // 내부 연산용 벡터들 (메모리 최적화)
    const walkDirection = useRef(new THREE.Vector3()).current;
    const rotateAngle = useRef(new THREE.Vector3(0, 1, 0)).current;
    const rotateQuarternion = useRef(new THREE.Quaternion()).current;

    const walkVelocity = 0.1; // 이동 속도

    useFrame(() => {
        if (!model.current || !orbitRef.current) return;

        // 1. 캐릭터 회전
        const angleYCameraDirection = Math.atan2(
            camera.position.x - model.current.position.x,
            camera.position.z - model.current.position.z
        );

        rotateQuarternion.setFromAxisAngle(
            rotateAngle,
            angleYCameraDirection + directionOffset
        );

        model.current.quaternion.rotateTowards(
            rotateQuarternion,
            0.2
        );

        // 2. 이동 방향 계산
        camera.getWorldDirection(walkDirection);
        walkDirection.y = 0;
        walkDirection.normalize();
        walkDirection.applyAxisAngle(rotateAngle, directionOffset);

        // 3. 위치 업데이트
        const velocity = action === "Run" ? walkVelocity : 0;
        const moveX = walkDirection.x * velocity;
        const moveZ = walkDirection.z * velocity;

        // 현재 위치에서 이동량 빼기 (기존 로직 유지 - 카메라 기준이라 뺌)
        // 캐릭터가 앞으로 갈 때 좌표가 감소하는 방향이라면 -= 가 맞음
        const nextX = playerPosition.x - moveX;
        const nextZ = playerPosition.z - moveZ;

        // Zustand 업데이트
        useGameStore.setState({
            playerPosition: { x: nextX, y: playerPosition.y, z: nextZ }
        });

        // 모델 위치 강제 업데이트
        model.current.position.set(nextX, playerPosition.y, nextZ);

        // 4. 카메라 이동 (캐릭터를 따라감)
        camera.position.x -= moveX;
        camera.position.z -= moveZ;

        // OrbitControls 타겟 업데이트 (캐릭터 머리 위)
        orbitRef.current.target.set(nextX, playerPosition.y + 1.5, nextZ);
        orbitRef.current.update();
    });

    return (
        <OrbitControls
            ref={orbitRef}
            enableZoom={true}
            enablePan={false}
            minDistance={5}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2 - 0.1}
        />
    );
}
