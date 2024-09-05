import { useContext } from "react";
import { OnscreenKeyboardInputOnlyContext } from "./OnscreenKeyboardInputOnlyProvider";
import { GameStateContext } from "./GameStateProvider";

export const OffscreenKeyboard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setting } = useContext(OnscreenKeyboardInputOnlyContext);
  const { enterLetter, deleteLetter, commitGuess } =
    useContext(GameStateContext);

  const enter = (letter: string) => {
    if (setting === "true") return;
    enterLetter(letter);
  };

  const del = () => {
    if (setting === "true") return;
    deleteLetter();
  };

  const onKeyDown = (key: string) => {
    console.log("OffscreenKeyboard_onKeyDown:", key);
    if (key === "Enter") commitGuess();
    if (key === "Backspace") del();
    if (key.match(/^[a-zA-Z]+$/)) enter(key);
  };

  return (
    <div tabIndex={-1} onKeyDown={(e) => onKeyDown(e.key)}>
      {children}
    </div>
  );
};
