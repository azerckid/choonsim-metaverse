import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface PlayerPosition {
  x: number;
  y: number;
  z: number;
}

interface LightingSettings {
  ambientIntensity: number;
  directionalIntensity: number;
  hemisphereIntensity: number;
  pointIntensity: number;
  skyEnabled: boolean;
  environmentPreset: "city" | "warehouse" | "apartment" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "dawn";
}

interface GameState {
  // 키보드 입력 상태
  keyPressed: Record<string, boolean>;
  // 캐릭터 애니메이션 상태 (Run, Walk, Idle 등)
  action: string;
  // 플레이어 위치
  playerPosition: PlayerPosition;
  // 이동 방향 오프셋
  directionOffset: number;
  isStarted: boolean;

  // 조명 설정
  lighting: LightingSettings;

  // Actions
  setKeyPressed: (keys: Record<string, boolean>) => void;
  setAction: (action: string) => void;
  setPlayerPosition: (position: PlayerPosition) => void;
  setDirectionOffset: (offset: number) => void;
  setIsStarted: (isStarted: boolean) => void;
  setLighting: (settings: Partial<LightingSettings>) => void;
}

export const useGameStore = create<GameState>()(
  subscribeWithSelector((set) => ({
    keyPressed: {},
    action: "Run",
    playerPosition: { x: 0, y: 0, z: 0 },
    directionOffset: 0,
    isStarted: false,

    lighting: {
      ambientIntensity: 2.0,
      directionalIntensity: 4.0,
      hemisphereIntensity: 1.0,
      pointIntensity: 2.0,
      skyEnabled: true,
      environmentPreset: "city",
    },

    setKeyPressed: (keys) => set({ keyPressed: keys }),
    setAction: (action) => set({ action }),
    setPlayerPosition: (position) => set({ playerPosition: position }),
    setDirectionOffset: (offset) => set({ directionOffset: offset }),
    setIsStarted: (isStarted) => set({ isStarted }),
    setLighting: (settings) => set((state) => ({
      lighting: { ...state.lighting, ...settings }
    })),
  }))
);
