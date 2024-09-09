import { useContext } from "react";
import { GameStateContext, TileProps } from "./GameStateProvider";
import clsx from "clsx";

export function GameBoard() {
  const { board } = useContext(GameStateContext);

  return (
    <div className="flex flex-col gap-1">
      {board.map((_, i) => (
        <TileRow row={i} />
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

//TODO
const emptyTileBgStyles = "";
//TODO
const uncheckedTileBgStyles = "";

const tileBackgroundMap = {
  correct: correctTileBgStyles,
  present: presentTileBgStyles,
  absent: absentTileBgStyles,
  empty: emptyTileBgStyles,
  unchecked: uncheckedTileBgStyles,
};

// TODO
const emptyTileBorderStyles =
  "border-2 dark:border-absent-dark high-contrast-dark:border-absent-hc_dark";
// TODO
const filledTileBorderStyles = "border-2";

const tileBorderMap = {
  empty: emptyTileBorderStyles,
  filled: filledTileBorderStyles,
};

function Tile({ state, value }: TileProps) {
  const bg = tileBackgroundMap[state];
  const border = tileBorderMap[value === "" ? "empty" : "filled"];

  return (
    <div
      className={clsx(
        bg,
        border,
        "w-10 h-10 flex items-center justify-center text-xl font-extrabold",
        "dark:text-white light:text-black high-contrast:text-black high-contrast-dark:text-white"
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
      {tiles.map((tile) => (
        <Tile {...tile} />
      ))}
    </div>
  );
}
