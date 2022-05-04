import { useRecoilState } from "recoil";
import { KeyDisplay } from "./utils.js";
import { isPress, keyPressed } from "./atoms.js";

function ShowKeys(props) {
  // eslint-disable-next-line
  const [keyDown, setKeyDown] = useRecoilState(isPress);
  const [pressedKeys, setPressedKeys] = useRecoilState(keyPressed);

  const keysPressed = {};
  const keyDisplayQueue = new KeyDisplay();
  document.addEventListener(
    "keydown",
    (event) => {
      keyDisplayQueue.down(event.key);
      setKeyDown(true);
      setPressedKeys(event.key);
      if (event.shiftKey) {
      } else {
        keysPressed[event.key.toLowerCase()] = true;
        setPressedKeys(event.key);
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
      setPressedKeys(event.key);
    },
    false
  );

  return null;
}

export default ShowKeys;
