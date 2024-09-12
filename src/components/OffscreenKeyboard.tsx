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
    if (key === "Enter") return commitGuess();
    if (key === "Backspace") return del();
    if (key.match(/^[a-zA-Z]+$/) && key.length === 1) return enter(key);
  };

  return (
    <div
      tabIndex={-1}
      className="min-h-screen focus:border-none"
      onKeyDown={(e) => onKeyDown(e.key)}
    >
      {children}
    </div>
  );
};
