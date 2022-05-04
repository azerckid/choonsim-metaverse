import { atom } from "recoil";

export const isPress = atom({
  key: "isPress",
  default: false,
});

export const keyPressed = atom({
  key: "keyPressed",
  default: {},
});

export const action = atom({
  key: "action",
  default: "Idle",
});

export const playerPosition = atom({
  key: "playerPosition",
  default: {
    x: 0,
    y: 0,
    z: 0,
  },
});
