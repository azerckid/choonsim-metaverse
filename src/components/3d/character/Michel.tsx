"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
    action: string;
}

export function Michel({ action }: ModelProps) {
    const group = useRef<THREE.Group>(null);
    const { nodes, materials, animations } = useGLTF("/michel.glb") as any;
    const { actions } = useAnimations(animations, group);

    const previousAction = useRef<string>("");

    useEffect(() => {
        if (previousAction.current && actions[previousAction.current]) {
            actions[previousAction.current]?.fadeOut(0.2);
        }

        if (actions[action]) {
            actions[action]?.reset().fadeIn(0.2).play();
        }

        previousAction.current = action;
    }, [action, actions]);

    return (
        <group ref={group} dispose={null}>
            <group name="Scene">
                <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <primitive object={nodes.mixamorigHips} />
                    <skinnedMesh
                        castShadow
                        name="Ch03"
                        geometry={nodes.Ch03.geometry}
                        material={materials.Ch03_Body}
                        skeleton={nodes.Ch03.skeleton}
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/michel.glb");
