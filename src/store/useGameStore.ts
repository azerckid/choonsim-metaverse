import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface PlayerPosition {
  x: number;
  y: number;
  z: number;
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

  // Actions
  setKeyPressed: (keys: Record<string, boolean>) => void;
  setAction: (action: string) => void;
  setPlayerPosition: (position: PlayerPosition) => void;
  setDirectionOffset: (offset: number) => void;
}

export const useGameStore = create<GameState>()(
  subscribeWithSelector((set) => ({
    keyPressed: {},
    action: "Run",
    playerPosition: { x: 0, y: 0, z: 0 },
    directionOffset: 0,

    setKeyPressed: (keys) => set({ keyPressed: keys }),
    setAction: (action) => set({ action }),
    setPlayerPosition: (position) => set({ playerPosition: position }),
    setDirectionOffset: (offset) => set({ directionOffset: offset }),
  }))
);
