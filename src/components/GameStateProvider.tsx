import { getWordForToday } from "@/utils";
import {
  lsGetGameMode,
  lsGetGameState,
  lsSetGameMode,
  lsSetGameState,
} from "@/utils/localStorage";
import { createContext, ReactNode, useState } from "react";
import data from "../assets/words.json";
import { useToast } from "@/hooks/use-toast";

const words = new Set<string>(data.words);

export type TileState =
  | "correct"
  | "present"
  | "absent"
  | "empty"
  | "unchecked";

export interface TileProps {
  state: TileState;
  value: string | null;
}

type GameStateContext = {
  board: TileProps[][];
  date: string;
  answer: string;
  gameMode: "hard" | "normal";
  workingRow: number;
  toggleGameMode: () => void;
  commitGuess: () => CommitGuessResult;
  enterLetter: (letter: string) => void;
  deleteLetter: () => void;
  saveGameState: () => void;
  getNextEmptyRow: () => number | null;
};

export const GameStateContext = createContext<GameStateContext>({
  board: [],
  date: "",
  answer: "",
  gameMode: "normal",
  workingRow: 0,
  toggleGameMode: () => {},
  commitGuess: () => "OK",
  enterLetter: () => {},
  deleteLetter: () => {},
  saveGameState: () => {},
  getNextEmptyRow: () => null,
});

type GameStateProviderProps = {
  children: ReactNode;
};

export type GameState = Pick<
  GameStateContext,
  "board" | "answer" | "gameMode" | "date" | "workingRow"
>;

export type Board = GameStateContext["board"];

export function initNewBoard(): Board {
  const board = new Array(6);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(5);
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = { state: "empty", value: null };
    }
  }

  return board;
}

export function isGameInProgress(board: Board) {
  for (const tile of board[0]) {
    if (tile.state !== "empty" && tile.state !== "unchecked") return true;
  }

  return false;
}

export function isRowEmpty(board: Board, index: number) {
  if (index < 0 || index > board.length - 1)
    throw new Error("isRowEmpty index out of bounds");

  for (const tile of board[index]) {
    if (tile.state !== "empty") return false;
  }

  return true;
}

export function isRowUnchecked(board: Board, index: number) {
  if (index < 0 || index > board.length - 1)
    throw new Error("isRowEmpty index out of bounds");

  for (const tile of board[index]) {
    if (tile.state !== "empty" && tile.state !== "unchecked") return false;
  }

  return true;
}

export function rowIsAnswer(board: Board, index: number) {
  if (index < 0 || index > board.length - 1)
    throw new Error("rowIsAnswer index out of bounds");

  for (const tile of board[index]) {
    if (tile.state !== "correct") return false;
  }

  return true;
}

export function isGameDone(board: Board) {
  let i = 0;
  while (i < board.length) {
    if (rowIsAnswer(board, i)) return true;
    if (isRowEmpty(board, i) || isRowUnchecked(board, i)) return false;
    i++;
  }
  // out of guesses
  return true;
}

export function canChangeMode(board: Board) {
  return !isGameDone(board) && !isGameInProgress(board);
}

export function save(state: GameState) {
  lsSetGameState(JSON.stringify(state));
  return state;
}

export function load() {
  const state = lsGetGameState();
  if (!state) return null;
  const deserialized = JSON.parse(state) as GameState;

  // different day, garbage state
  if (new Date().toDateString() !== deserialized.date) return null;

  return deserialized;
}

export function loadOrInitGameState(): GameState {
  const loaded = load();
  if (!loaded) {
    return {
      board: initNewBoard(),
      date: new Date().toDateString(),
      answer: getWordForToday(),
      gameMode: lsGetGameMode(),
      workingRow: 0,
    };
  }

  return loaded;
}

export function enter(letter: string, board: Board, workingRow: number) {
  if (isGameDone(board)) return;
  if (workingRow < 0 || workingRow > board.length - 1) return;
  let i = 0;

  // iterate until we find empty cell
  while (
    i < board[workingRow].length &&
    board[workingRow][i].state === "unchecked"
  ) {
    i++;
  }

  if (i < board[workingRow].length)
    board[workingRow][i] = { state: "unchecked", value: letter };
}

export function del(board: Board, workingRow: number) {
  if (workingRow < 0 || workingRow > board.length - 1) return;
  let i = 0;

  // iterate until we find empty cell
  while (
    i < board[workingRow].length &&
    board[workingRow][i].state === "unchecked"
  ) {
    i++;
  }

  // go back one
  i--;
  if (i >= 0) board[workingRow][i] = { state: "empty", value: "" };
}

export type CommitGuessResult =
  | "OK"
  | "GAME_FINISHED"
  | "NOT_ENOUGH_LETTERS"
  | "DOES_NOT_FOLLOW_HARD_MODE_RULE"
  | "GUESS_NOT_WORD";

export const GameStateProvider: React.FC<GameStateProviderProps> = ({
  children,
}) => {
  // TODO: may need to split game state object into multiple states
  const [gameState, setGameState] = useState<GameState>(loadOrInitGameState());
  const { toast } = useToast();

  function saveAndSetGameState(state: GameState) {
    return setGameState(save(state));
  }

  function toggleGameMode() {
    if (!canChangeMode(gameState.board)) return;
    const mode = gameState.gameMode;
    if (mode === "hard") {
      lsSetGameMode("normal");
      return saveAndSetGameState({ ...gameState, gameMode: "normal" });
    }
    if (mode === "normal") {
      lsSetGameMode("hard");
      return saveAndSetGameState({ ...gameState, gameMode: "hard" });
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

  function adheresToHardModeRule(): boolean {
    const { board, workingRow } = gameState;
    const guessRow = Array.from(board[workingRow]);

    // iterate through rows 0 -> workingRow - 1 included to get correct guesses so far
    let rowIdx = 0;
    const correctGuesses: (TileProps | null)[] = new Array(
      board[0].length
    ).fill(null);
    while (rowIdx < workingRow) {
      for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
        const tile = board[rowIdx][colIdx];
        if (tile.state === "correct") {
          correctGuesses[colIdx] = tile;
        }
      }
      rowIdx++;
    }

    // compare guess in working row with correct guesses
    for (let i = 0; i < guessRow.length; i++) {
      const guess = guessRow[i];
      const correctGuess = correctGuesses[i];
      if (correctGuess) {
        // does not follow hard mode if guess does not use previously correct guess
        if (correctGuess.value !== guess.value) return false;
      }
    }

    return true;
  }

  function commitGuess(): CommitGuessResult {
    const { board, answer, workingRow } = gameState;
    const lettersInAnswer: { [letter: string]: number } = {};
    for (const letter of answer.split("")) {
      if (!lettersInAnswer[letter]) {
        lettersInAnswer[letter] = 1;
      } else {
        lettersInAnswer[letter]++;
      }
    }
    const boardRowIndex = workingRow;
    const row = Array.from(board[boardRowIndex]);
    if (isGameDone(board)) return "GAME_FINISHED";
    if (row.find((cell) => cell.state === "empty")) {
      toast({
        title: "Not enough letters",
      });
      return "NOT_ENOUGH_LETTERS";
    }
    let i = 0;
    const guess = row.map((cell) => cell.value).join("");
    if (!words.has(guess)) {
      toast({
        title: "Not in word list",
      });
      return "GUESS_NOT_WORD";
    }
    if (!adheresToHardModeRule()) {
      toast({
        title: "Must use previous correct guesses!",
      });
      return "DOES_NOT_FOLLOW_HARD_MODE_RULE";
    }
    while (i < guess.length) {
      const guessChar = guess.charAt(i);
      const ansChar = answer.charAt(i);
      if (guessChar === ansChar) {
        row[i] = { state: "correct", value: guessChar };
        lettersInAnswer[guessChar]--;
      } else if (lettersInAnswer[guessChar] > 0) {
        row[i] = { state: "present", value: guessChar };
        lettersInAnswer[guessChar]--;
      } else if (!lettersInAnswer[guessChar]) {
        row[i] = { state: "absent", value: guessChar };
      }
      i++;
    }
    board[boardRowIndex] = row;
    saveAndSetGameState({ ...gameState, board, workingRow: workingRow + 1 });
    return "OK";
  }

  function enterLetter(letter: string) {
    const { board, workingRow } = gameState;
    enter(letter, board, workingRow);
    saveAndSetGameState({ ...gameState, board });
  }

  function deleteLetter() {
    const { board, workingRow } = gameState;
    del(board, workingRow);
    saveAndSetGameState({ ...gameState, board });
  }

  return (
    <GameStateContext.Provider
      value={{
        ...gameState,
        toggleGameMode,
        saveGameState,
        commitGuess,
        getNextEmptyRow,
        enterLetter,
        deleteLetter,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
