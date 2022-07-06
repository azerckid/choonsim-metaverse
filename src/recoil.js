import { atom } from "recoil";

export const keyPressed = atom({
  key: "keyPressed",
  default: {},
});

export const action = atom({
  key: "action",
  default: "Run",
});

export const playerPosition = atom({
  key: "playerPosition",
  default: {
    x: 0,
    y: 0,
    z: 0,
  },
});

export const directionOffsetFunction = atom({
  key: "directionOffset",
  default: 0,
});

export const rotateQuarternionValue = atom({
  key: "rotateQuarternionValue",
  default: {},
});
