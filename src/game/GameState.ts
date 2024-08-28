import { getWordForToday } from "../utils";
import {
  lsGetGameMode,
  lsGetGameState,
  lsSetGameState,
} from "../utils/localStorage";

export type TileState = "correct" | "present" | "absent";

export class GameState {
  board: ({ state: TileState; value: string } | null)[][];
  date: string;
  inProgress: boolean;
  answer: string;
  gameMode: "hard" | "normal";

  constructor() {
    // load state if same day
    const state = this._load();
    if (state) {
      this.board = state.board;
      this.date = state.date;
      this.answer = state.answer;
      this.gameMode = state.gameMode;
      this.inProgress = state.inProgress;
    }

    // if no new state -> initialize board, date and save to local storage
    this.board = new Array(6);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(5).fill(null);
    }

    this.date = new Date().toDateString();
    this.inProgress = true;
    this.answer = getWordForToday();
    this.gameMode = lsGetGameMode();
    this._save();
  }
  guess(chars: string[]) {
    console.log(chars);
  }

  _validateGuess() {}

  _save() {
    const serialized = JSON.stringify({
      board: this.board,
      date: this.date,
      inProgress: this.inProgress,
      answer: this.answer,
      gameMode: this.gameMode,
    });

    lsSetGameState(serialized);
  }

  _load() {
    const state = lsGetGameState();
    if (!state) return null;
    const deserialized = JSON.parse(state) as {
      board: ({ state: TileState; value: string } | null)[][];
      date: string;
      inProgress: boolean;
      answer: string;
      gameMode: "hard" | "normal";
    };

    // different day, garbage state
    if (new Date().toDateString() !== deserialized.date) return null;

    return deserialized;
  }
}
