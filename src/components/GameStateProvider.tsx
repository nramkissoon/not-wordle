import { getWordForToday } from "@/utils";
import {
  lsGetGameMode,
  lsGetGameState,
  lsSetGameMode,
  lsSetGameState,
} from "@/utils/localStorage";
import { createContext, ReactNode, useState } from "react";

export type TileState = "correct" | "present" | "absent" | "empty";

type GameStateContext = {
  board: { state: TileState; value: string | null }[][];
  date: string;
  answer: string;
  gameMode: "hard" | "normal";
  toggleGameMode: () => void;
  commitGuess: (guess: string) => void;
  saveGameState: () => void;
  getNextEmptyRow: () => number | null;
};

export const GameStateContext = createContext<GameStateContext>({
  board: [],
  date: "",
  answer: "",
  gameMode: "normal",
  toggleGameMode: () => {},
  commitGuess: () => {},
  saveGameState: () => {},
  getNextEmptyRow: () => null,
});

type GameStateProviderProps = {
  children: ReactNode;
};

type GameState = Pick<
  GameStateContext,
  "board" | "answer" | "gameMode" | "date"
>;

type Board = GameStateContext["board"];

function initNewBoard(): Board {
  const board = new Array(6);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(5);
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = { state: "empty", value: null };
    }
  }

  return board;
}

function isGameInProgress(board: Board) {
  for (const tile of board[0]) {
    if (tile.state !== "empty") return true;
  }

  return false;
}

function isRowEmpty(board: Board, index: number) {
  if (index < 0 || index > board.length - 1)
    throw new Error("isRowEmpty index out of bounds");

  for (const tile of board[index]) {
    if (tile.state !== "empty") return false;
  }

  return true;
}

function rowIsAnswer(board: Board, index: number) {
  if (index < 0 || index > board.length - 1)
    throw new Error("rowIsAnswer index out of bounds");

  for (const tile of board[index]) {
    if (tile.state !== "correct") return false;
  }

  return true;
}

function isGameDone(board: Board) {
  let i = 0;
  while (i < board.length) {
    if (rowIsAnswer(board, i)) return true;
    if (isRowEmpty(board, i)) return false;
    i++;
  }
  // out of guesses
  return true;
}

function canChangeMode(board: Board) {
  return !isGameDone(board) && !isGameInProgress(board);
}

function save(state: GameState) {
  lsSetGameState(JSON.stringify(state));
  return state;
}

function load() {
  const state = lsGetGameState();
  if (!state) return null;
  const deserialized = JSON.parse(state) as GameState;

  // different day, garbage state
  if (new Date().toDateString() !== deserialized.date) return null;

  return deserialized;
}

function loadOrInitGameState(): GameState {
  const loaded = load();
  if (!loaded) {
    return {
      board: initNewBoard(),
      date: new Date().toDateString(),
      answer: getWordForToday(),
      gameMode: lsGetGameMode(),
    };
  }

  return loaded;
}

export const GameStateProvider: React.FC<GameStateProviderProps> = ({
  children,
}) => {
  // TODO: may need to split game state object into multiple states
  const [gameState, setGameState] = useState<GameState>(loadOrInitGameState());

  function toggleGameMode() {
    if (!canChangeMode(gameState.board)) return;
    const mode = gameState.gameMode;
    if (mode === "hard") {
      lsSetGameMode("normal");
      return setGameState(save({ ...gameState, gameMode: "normal" }));
    }
    if (mode === "normal") {
      lsSetGameMode("hard");
      return setGameState(save({ ...gameState, gameMode: "hard" }));
    }
  }

  function saveGameState() {
    return save(gameState);
  }

  function getNextEmptyRow() {
    const { board } = gameState;
    let i = 0;
    while (i < board.length) {
      if (isRowEmpty(board, i)) return i;
      i++;
    }

    return i;
  }

  function commitGuess(guess: string) {
    const { board, answer } = gameState;
    const lettersInAnswer = new Set(answer.split(""));
    const boardRowIndex = getNextEmptyRow();
    const row = Array.from(board[boardRowIndex]);
    if (isGameDone(board)) return;
    let i = 0;
    while (i < guess.length) {
      const guessChar = guess.charAt(i);
      const ansChar = answer.charAt(i);
      // correct
      if (guessChar === ansChar) {
        row[i] = { state: "correct", value: guessChar };
      } else if (lettersInAnswer.has(guessChar)) {
        row[i] = { state: "present", value: guessChar };
      } else if (!lettersInAnswer.has(guessChar)) {
        row[i] = { state: "absent", value: guessChar };
      }
      i++;
    }
    board[boardRowIndex] = row;
    setGameState({ ...gameState, board });
  }

  return (
    <GameStateContext.Provider
      value={{
        ...gameState,
        toggleGameMode,
        saveGameState,
        commitGuess,
        getNextEmptyRow,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
