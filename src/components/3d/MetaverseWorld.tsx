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
import { useGameStore } from "@/store/useGameStore";
import { Button } from "@/components/ui/button";
import { RocketIcon, PlayIcon, BoxIcon, VideoIcon } from "lucide-react";
import { LightingControlPanel } from "@/components/ui/LightingControlPanel";

export default function MetaverseWorld() {
    const isStarted = useGameStore((state) => state.isStarted);
    const setIsStarted = useGameStore((state) => state.setIsStarted);

    return (
        <div className="w-full h-screen bg-black overflow-hidden relative">
            {/* 3D World */}
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                <Suspense fallback={null}>
                    <Physics gravity={[0, -9.81, 0]}>
                        <LightControl />
                        <Plane rotation={[-Math.PI / 2, 0, 0]} />
                        <GroupCube />
                        <Player />
                    </Physics>

                    <MoviePlane position={[0, 7, -20]} />

                    {/* @ts-ignore */}
                    <Stats />
                </Suspense>
                <axesHelper args={[5]} />
            </Canvas>

            {/* Start Screen Overlay */}
            {!isStarted && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-2xl transition-all duration-700">
                    <div className="flex flex-col items-center gap-10 text-center max-w-2xl px-6">
                        <div className="space-y-4 animate-in fade-in zoom-in duration-1000">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold tracking-widest uppercase">
                                <RocketIcon className="w-3 h-3" />
                                V2.0 Core Initialized
                            </div>
                            <h1 className="text-7xl font-black tracking-tighter text-white">
                                MOGAME <span className="text-teal-400">METAVERSE</span>
                            </h1>
                            <p className="text-zinc-400 font-mono tracking-widest uppercase text-sm max-w-md mx-auto leading-relaxed">
                                Next-Generation 3D Virtual Social Space<br />
                                Built with Next.js 15 & Three.js
                            </p>
                        </div>

                        <Button
                            size="lg"
                            onClick={() => setIsStarted(true)}
                            className="h-16 px-12 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-black text-lg rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(45,212,191,0.3)] gap-3"
                        >
                            <PlayIcon className="w-6 h-6 fill-current" />
                            ENTER METAVERSE
                        </Button>

                        <div className="grid grid-cols-3 gap-12 mt-4 opacity-60">
                            <div className="flex flex-col gap-2">
                                <BoxIcon className="w-5 h-5 text-teal-500 mx-auto" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Graphics</span>
                                    <span className="text-xs text-zinc-300">R3F Engine</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <RocketIcon className="w-5 h-5 text-teal-500 mx-auto" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Physics</span>
                                    <span className="text-xs text-zinc-300">Cannon.js</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <VideoIcon className="w-5 h-5 text-teal-500 mx-auto" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Media</span>
                                    <span className="text-xs text-zinc-300">Spatial Video</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* HUD / Overlay */}
            {isStarted && (
                <div className="absolute top-6 left-6 z-10 text-white font-mono pointer-events-none select-none animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex flex-col gap-1 p-4 bg-zinc-950/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                        <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                            MOGAME METAVERSE
                        </h1>
                        <div className="h-[1px] w-full bg-white/10 my-1" />
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400">Environment: Stable v2.1</p>
                        <div className="flex gap-4 mt-2">
                            <div className="flex flex-col">
                                <span className="text-[8px] text-zinc-500 font-bold uppercase">Controls</span>
                                <span className="text-xs text-teal-200 font-bold">W A S D</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] text-zinc-500 font-bold uppercase">Rotation</span>
                                <span className="text-xs text-blue-200 font-bold">MOUSE</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isStarted && <LightingControlPanel />}

            {isStarted && (
                <div className="absolute bottom-6 right-6 z-10 pointer-events-none animate-in fade-in duration-1000">
                    <div className="px-4 py-2 bg-zinc-950/40 backdrop-blur-sm rounded-full border border-white/5">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest italic font-bold">System: Responsive</span>
                    </div>
                </div>
            )}
        </div>
    );
}
