import { useRecoilState } from "recoil";
import { KeyDisplay } from "./utils.js";
import { directionOffsetFunction, isPress, keyPressed } from "./atoms.js";
// eslint-disable-next-line
import { A, D, DIRECTIONS, S, W } from "./utils";

function InputKeys(props) {
  // eslint-disable-next-line
  const [keyDown, setKeyDown] = useRecoilState(isPress);
  const [pressedKeys, setPressedKeys] = useRecoilState(keyPressed);

  const keysPressed = {};
  const keyDisplayQueue = new KeyDisplay();
  // eslint-disable-next-line
  const [directionOffset, setDirectionOffset] = useRecoilState(
    directionOffsetFunction
  );

  document.addEventListener(
    "keydown",
    (event) => {
      keyDisplayQueue.down(event.key);
      setKeyDown(true);
      if (event.shiftKey) {
      } else {
        keysPressed[event.key.toLowerCase()] = true;
        setPressedKeys(keysPressed);
      }
    },
    false
  );

  document.addEventListener(
    "keyup",
    (event) => {
      keyDisplayQueue.up(event.key);
      setKeyDown(false);
      keysPressed[event.key.toLowerCase()] = false;
      setPressedKeys(keysPressed);
    },
    false
  );
  console.log("keyDown", keyDown);
  console.log("keysPressed", keysPressed);
  console.log("pressedKeys", pressedKeys);
  console.log("keysPressed-W", keysPressed[W]);
  console.log("pressedKeys-W", pressedKeys[W]);
  //
  function directionOffsetf(pressedKeys) {
    let directionOffset = 3.14; // w

    if (pressedKeys[W]) {
      if (pressedKeys[A]) {
        directionOffset = Math.PI / 4; // w+a
      } else if (pressedKeys[D]) {
        directionOffset = -Math.PI / 4; // w+d
      } else {
        directionOffset = -Math.PI; // w
      }
    } else if (pressedKeys[S]) {
      if (pressedKeys[A]) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (pressedKeys[D]) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
      } else {
        directionOffset = 0; // sdd
      }
    } else if (pressedKeys[A]) {
      directionOffset = -Math.PI / 2; // a
    } else if (pressedKeys[D]) {
      directionOffset = Math.PI / 2; // d
    }

    return directionOffset;
  }
  //
  // console.log("directionOffsetf", directionOffsetf(pressedKeys));
  let directionOffsetvalue = directionOffsetf(pressedKeys);
  setDirectionOffset(directionOffsetvalue);

  return null;
}

export default InputKeys;
