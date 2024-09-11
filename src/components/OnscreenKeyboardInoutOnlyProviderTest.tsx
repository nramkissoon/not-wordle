import { useContext } from "react";
import { OnscreenKeyboardInputOnlyContext } from "./OnscreenKeyboardInputOnlyProvider";

export function OnscreenKeyBoardToggleTest() {
  const { toggle, setting } = useContext(OnscreenKeyboardInputOnlyContext);
  return (
    <div>
      <button onClick={() => toggle()}>Toggle Onscreen Keyboard Only</button>
      <div>OnscreenKeyBoardOnly setting -&gt; {setting}</div>
    </div>
  );
}
