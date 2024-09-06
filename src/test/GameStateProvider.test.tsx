import { assert, beforeEach, describe, test } from "vitest";
import {
  initNewBoard,
  isGameInProgress,
  isRowEmpty,
  isRowUnchecked,
} from "./../components/GameStateProvider";

let board = initNewBoard();

describe("utility functions", () => {
  beforeEach(() => {
    board = initNewBoard();
  });

  describe("isGameInProgress", () => {
    test("true", () => {
      board[0][0] = { value: "s", state: "unchecked" };
      assert(isGameInProgress(board));
    });
    test("false", () => {
      assert.isFalse(isGameInProgress(board));
    });
  });

  test("isRowEmpty", () => {
    assert.throws(() => isRowEmpty(board, -1));
    assert.throws(() => isRowEmpty(board, 20));
    assert(isRowEmpty(board, 1));
    board[0][3] = { value: "s", state: "unchecked" };
    assert.isFalse(isRowEmpty(board, 0));
  });

  test("isRowUnchecked", () => {
    assert.throws(() => isRowUnchecked(board, -1));
    assert.throws(() => isRowUnchecked(board, 20));
    assert(isRowUnchecked(board, 1));
    board[0][3] = { value: "s", state: "correct" };
    assert.isFalse(isRowUnchecked(board, 0));
  });

  test.todo("rowIsAnswer");

  describe("isGameDone", () => {
    test.todo("answer in board before all rows used", () => {});
    test.todo("empty row exists", () => {});
    test.todo("unchecked row exists", () => {});
    test.todo("true", () => {});
  });

  test.todo("canChangeMode");
  test.todo("enter");
  test.todo("del");
});
describe.todo("saving and loading", () => {});

describe.todo("Provider Component", () => {});
