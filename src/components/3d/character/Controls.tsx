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
    const orbitControlRef = useRef<any>(null);
    const { camera } = useThree();

    const action = useGameStore((state) => state.action);
    const directionOffset = useGameStore((state) => state.directionOffset);
    const playerPosition = useGameStore((state) => state.playerPosition);
    const setPlayerPosition = useGameStore((state) => state.setPlayerPosition);

    // Reusable vectors/quaternions to avoid GC
    const walkDirection = useRef(new THREE.Vector3()).current;
    const rotateAngle = useRef(new THREE.Vector3(0, 1, 0)).current;
    const rotateQuarternion = useRef(new THREE.Quaternion()).current;
    const cameraTarget = useRef(new THREE.Vector3()).current;
    const walkVelocity = 0.05;

    useFrame((state, delta) => {
        if (!model.current || !orbitControlRef.current) return;

        // Calculate rotation towards movement direction
        const angleYCameraDirection = Math.atan2(
            camera.position.x - playerPosition.x,
            camera.position.z - playerPosition.z
        );

        rotateQuarternion.setFromAxisAngle(
            rotateAngle,
            angleYCameraDirection + directionOffset
        );

        model.current.quaternion.rotateTowards(
            rotateQuarternion,
            THREE.MathUtils.degToRad(10)
        );

        // Calculate movement velocity
        camera.getWorldDirection(walkDirection);
        walkDirection.y = 0;
        walkDirection.normalize();
        walkDirection.applyAxisAngle(rotateAngle, directionOffset);

        const velocity = action === "Run" ? walkVelocity : 0;
        const moveX = walkDirection.x * velocity;
        const moveZ = walkDirection.z * velocity;

        // Update position in store
        const newPos = {
            x: playerPosition.x - moveX,
            y: playerPosition.y,
            z: playerPosition.z - moveZ,
        };

        // Direct store update for performance (avoiding React re-render of complex components)
        useGameStore.setState({ playerPosition: newPos });

        // Sync camera with model
        camera.position.x -= moveX;
        camera.position.z -= moveZ;

        cameraTarget.set(
            model.current.position.x,
            model.current.position.y + 1,
            model.current.position.z
        );

        orbitControlRef.current.target.copy(cameraTarget);
        orbitControlRef.current.update();
    });

    return (
        <OrbitControls
            ref={orbitControlRef}
            enableDamping={true}
            enableZoom={true}
            enablePan={false}
            zoomSpeed={0.5}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2 - 0.2}
            minPolarAngle={Math.PI / 2 - 0.6}
        />
    );
}
