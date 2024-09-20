import { useContext } from "react";
import { GameStateContext, TileProps } from "./GameStateProvider";
import clsx from "clsx";

export function GameBoard() {
  const { board } = useContext(GameStateContext);

  return (
    <div className="flex flex-col gap-1">
      {board.map((_, i) => (
        <TileRow row={i} key={i} />
      ))}
    </div>
  );
}

const correctTileBgStyles =
  "high-contrast:bg-correct-hc light:bg-correct-light dark:bg-correct-dark high-contrast-dark:bg-correct-hc_dark";

const presentTileBgStyles =
  "high-contrast:bg-present-hc high-contrast-dark:bg-present-hc_dark light:bg-present-light dark:bg-present-dark";

const absentTileBgStyles =
  "high-contrast:bg-absent-hc high-contrast-dark:bg-absent-hc_dark light:bg-absent-light dark:bg-absent-dark";

const emptyTileBgStyles = "";
const uncheckedTileBgStyles = "";

const tileBackgroundMap = {
  correct: correctTileBgStyles,
  present: presentTileBgStyles,
  absent: absentTileBgStyles,
  empty: emptyTileBgStyles,
  unchecked: uncheckedTileBgStyles,
};

const emptyTileBorderStyles =
  "border-2 dark:border-absent-dark high-contrast-dark:border-absent-hc_dark light:border-keyboard-light high-contrast:border-keyboard-hc";

// no border for filled tiles
const filledTileBorderStyles = "";

const uncheckedTileBorderStyles =
  "border-2 dark:border-absent-light/80 high-contrast-dark:border-absent-hc/80 light:border-absent-light high-contrast:border-absent-hc";

const tileBorderMap = {
  empty: emptyTileBorderStyles,
  unchecked: uncheckedTileBorderStyles,
  correct: filledTileBorderStyles,
  present: filledTileBorderStyles,
  absent: filledTileBorderStyles,
};

const tileTextColorMap = {
  empty:
    "dark:text-white light:text-wordleBlack high-contrast:text-wordleBlack high-contrast-dark:text-white",
  unchecked:
    "dark:text-white light:text-wordleBlack high-contrast:text-wordleBlack high-contrast-dark:text-white",
  correct: "text-white",
  present: "text-white",
  absent: "text-white",
};

export function Tile({
  state,
  value,
  className,
}: TileProps & { className?: string }) {
  const bg = tileBackgroundMap[state];
  const border = tileBorderMap[state];
  const textColor = tileTextColorMap[state];

  return (
    <div
      className={clsx(
        bg,
        border,
        textColor,
        "w-16 h-16 flex items-center justify-center text-3xl font-bold",
        className
      )}
    >
      {value?.toLocaleUpperCase() ?? ""}
    </div>
  );
}

function TileRow({ row }: { row: number }) {
  const { board } = useContext(GameStateContext);
  const tiles = board[row];
  return (
    <div className="flex gap-1">
      {tiles.map((tile, i) => (
        <Tile {...tile} key={i} />
      ))}
    </div>
  );
}
