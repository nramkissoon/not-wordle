import { useContext } from "react";
import { GameStateContext } from "./GameStateProvider";

export function GameStateProviderTestComponent() {
  const { board } = useContext(GameStateContext);
  return (
    <div>
      {board.map((row) => (
        <div className="flex gap-3">
          {row.map((cell) => (
            <div className="flex flex-col">
              <div>{cell.state}</div> <div>{cell.value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
