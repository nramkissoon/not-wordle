import { ReactNode, useContext } from "react";
import { GameStateContext } from "./GameStateProvider";
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

const keyBackgroundStyles =
  "light:bg-keyboard-light dark:bg-keyboard-dark high-contrast:bg-keyboard-hc high-contrast-dark:bg-keyboard-hc_dark";

function AlphaKey({ letter }: { letter: string }) {
  const { enterLetter } = useContext(GameStateContext);

  function enter() {
    // TODO: handle errors, animations
    enterLetter(letter);
  }

  return (
    <button
      onClick={enter}
      className={clsx(
        keyBackgroundStyles,
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
    if (type === "enter") commitGuess();
  }

  const displayText = type === "backspace" ? "<-" : "ENTER";

  return (
    <button
      onClick={act}
      className={clsx(
        keyBackgroundStyles,
        "w-11 px-4 flex items-center justify-center text-xl font-bold py-3.5 rounded-sm"
      )}
    >
      {displayText}
    </button>
  );
}
