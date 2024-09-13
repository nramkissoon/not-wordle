import { ReactNode, useContext } from "react";
import { Board, GameStateContext } from "./GameStateProvider";
import clsx from "clsx";

export function KeyBoard() {
  return (
    <div className="flex flex-col gap-2">
      <KeyboardRow>
        <AlphaKey letter="q" />
        <AlphaKey letter="w" />
        <AlphaKey letter="e" />
        <AlphaKey letter="r" />
        <AlphaKey letter="t" />
        <AlphaKey letter="y" />
        <AlphaKey letter="u" />
        <AlphaKey letter="i" />
        <AlphaKey letter="o" />
        <AlphaKey letter="p" />
      </KeyboardRow>
      <KeyboardRow className="items-center justify-center">
        <AlphaKey letter="a" />
        <AlphaKey letter="s" />
        <AlphaKey letter="d" />
        <AlphaKey letter="f" />
        <AlphaKey letter="g" />
        <AlphaKey letter="h" />
        <AlphaKey letter="j" />
        <AlphaKey letter="k" />
        <AlphaKey letter="l" />
      </KeyboardRow>
      <KeyboardRow>
        <ActionKey type="enter" />
        <AlphaKey letter="z" />
        <AlphaKey letter="x" />
        <AlphaKey letter="c" />
        <AlphaKey letter="v" />
        <AlphaKey letter="b" />
        <AlphaKey letter="n" />
        <AlphaKey letter="m" />
        <ActionKey type="backspace" />
      </KeyboardRow>
    </div>
  );
}

function KeyboardRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("flex gap-[6px]", className)}>{children}</div>;
}

const keyDefaultBackgroundStyles =
  "light:bg-keyboard-light dark:bg-keyboard-dark high-contrast:bg-keyboard-hc high-contrast-dark:bg-keyboard-hc_dark";

function getKeyBackgroundStyle(letter: string, board: Board) {
  // search the board to see if letter is used, check in reverse row order to get most recent letter state
  let backgroundStyles = keyDefaultBackgroundStyles;
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (
        cell.value === letter &&
        // don't change styles if already set
        backgroundStyles === keyDefaultBackgroundStyles
      ) {
        // change background color depending on state
        switch (cell.state) {
          case "absent": {
            backgroundStyles =
              "high-contrast:bg-absent-hc high-contrast-dark:bg-absent-hc_dark light:bg-absent-light dark:bg-absent-dark";
            break;
          }
          case "correct": {
            backgroundStyles =
              "high-contrast:bg-correct-hc light:bg-correct-light dark:bg-correct-dark high-contrast-dark:bg-correct-hc_dark";
            break;
          }
          case "present": {
            backgroundStyles =
              "high-contrast:bg-present-hc high-contrast-dark:bg-present-hc_dark light:bg-present-light dark:bg-present-dark";
            break;
          }
          default:
            break;
        }
      }
    }
  }

  return backgroundStyles;
}

function AlphaKey({ letter }: { letter: string }) {
  const { enterLetter, board } = useContext(GameStateContext);

  function enter() {
    // TODO: handle errors, animations
    enterLetter(letter);
  }

  return (
    <button
      onClick={enter}
      className={clsx(
        getKeyBackgroundStyle(letter, board),
        "w-11 flex items-center justify-center text-xl font-bold py-3.5 rounded-sm"
      )}
    >
      {letter.toLocaleUpperCase()}
    </button>
  );
}

function ActionKey({ type }: { type: "enter" | "backspace" }) {
  const { commitGuess, deleteLetter } = useContext(GameStateContext);

  function act() {
    // TODO error handling and animations
    if (type === "backspace") deleteLetter();
    if (type === "enter") {
      const commitResult = commitGuess();
      console.log(commitResult);
    }
  }

  const displayText = type === "backspace" ? "DEL" : "ENTER";

  return (
    <button
      onClick={act}
      className={clsx(
        keyDefaultBackgroundStyles,
        "w-11 px-4 flex items-center justify-center text-xs font-bold py-3.5 rounded-sm flex-grow"
      )}
    >
      {displayText}
    </button>
  );
}
