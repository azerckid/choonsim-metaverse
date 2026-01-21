"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { LightControl } from "./environment/LightControl";
import { Plane } from "./environment/Plane";
import { GroupCube } from "./interaction/GroupCube";
import { MoviePlane } from "./environment/MoviePlane";
import { Player } from "./character/Player";

export default function MetaverseWorld() {
    return (
        <div className="w-full h-screen bg-black overflow-hidden relative">
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                <Suspense fallback={null}>
                    <Physics gravity={[0, -9.81, 0]}>
                        <LightControl />
                        <Plane rotation={[-Math.PI / 2, 0, 0]} />
                        <GroupCube />
                        <Player />
                    </Physics>

                    <MoviePlane position={[0, 7, -20]} />

                    {/* @ts-ignore - Stats type issue in some React 19 / Drei versions */}
                    <Stats />
                </Suspense>
                <axesHelper args={[5]} />
            </Canvas>

            {/* HUD / Overlay */}
            <div className="absolute top-6 left-6 z-10 text-white font-mono pointer-events-none select-none">
                <div className="flex flex-col gap-1 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                    <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        MOGAME METAVERSE
                    </h1>
                    <div className="h-[1px] w-full bg-white/10 my-1" />
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">Environment: v2.0 (Next.js 15)</p>
                    <div className="flex gap-4 mt-2">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-zinc-500 font-bold uppercase">Controls</span>
                            <span className="text-xs text-teal-200">W A S D to Move</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] text-zinc-500 font-bold uppercase">Orbit</span>
                            <span className="text-xs text-blue-200">Mouse to Rotate</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
                <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/5">
                    <span className="text-[10px] text-zinc-500 font-mono">STABLE PREVIEW</span>
                </div>
            </div>
        </div>
    );
}
