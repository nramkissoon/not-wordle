import { useContext } from "react";
import { OnscreenKeyboardInputOnlyContext } from "./OnscreenKeyboardInputOnlyProvider";

export function OnscreenKeyBoardToggleTest() {
  const { toggle, setting } = useContext(OnscreenKeyboardInputOnlyContext);
  console.log("OnscreenKeyboardInputOnly:", setting);
  return (
    <>
      <button onClick={() => toggle()}>Toggle Onscreen Keyboard Only</button>
    </>
  );
}
