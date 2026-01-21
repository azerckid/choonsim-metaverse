import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { directionOffsetFunction, keyPressed } from "../../recoil.js";
// eslint-disable-next-line

function InputKeys(props) {
  const [pressedKeys, setPressedKeys] = useRecoilState(keyPressed);
  const [preDirectionOffset, setDirectionOffset] = useRecoilState(
    directionOffsetFunction
  );

  const _pressedKey = {};
  const handleKeyDown = (event) => {
    _pressedKey[event.key.toLowerCase()] = true;
    setPressedKeys({ ..._pressedKey });
  };
  const handleKeyUp = (event) => {
    _pressedKey[event.key.toLowerCase()] = false;
    setPressedKeys({ ..._pressedKey });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    // eslint-disable-next-line
  }, []);

  function directionOffsetf(pressedKeys) {
    let directionOffset = 3.14; // w
    if (pressedKeys["w"]) {
      if (pressedKeys["a"]) {
        directionOffset = -Math.PI + Math.PI / 4; // w+a
      } else if (pressedKeys["d"]) {
        directionOffset = -Math.PI - Math.PI / 4; // w+d
      }
    } else if (pressedKeys["s"]) {
      if (pressedKeys["a"]) {
        directionOffset = -Math.PI / 4; // s+a
      } else if (pressedKeys["d"]) {
        directionOffset = Math.PI / 4; // s+d
      } else {
        directionOffset = 0; // sdd
      }
    } else if (pressedKeys["a"]) {
      directionOffset = -Math.PI / 2; // a
    } else if (pressedKeys["d"]) {
      directionOffset = Math.PI / 2; // d
    } else {
      directionOffset = preDirectionOffset;
    }
    setDirectionOffset(directionOffset);
    return directionOffset;
  }
  let directionOffsetvalue = directionOffsetf(pressedKeys);
  setDirectionOffset(directionOffsetvalue);

  return null;
}

export default InputKeys;
