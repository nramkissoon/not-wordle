// helper functions for interfacing with local storage

import { Themes } from "../components/ThemeProvider";

export function lsGetTheme() {
  console.debug("Getting theme from local storage...");
  return localStorage.getItem("theme");
}

export function lsSetTheme(theme: Themes) {
  console.debug(`Setting theme to ${theme} in local storage...`);
  localStorage.setItem("theme", theme);
}

export function lsGetGameMode() {
  console.debug("Getting game mode from local storage...");
  return (localStorage.getItem("gamemode") as "normal" | "hard") ?? "normal";
}

export function lsSetGameMode(mode: "hard" | "normal") {
  console.debug(`Setting game mode to ${mode} in local storage...`);
  localStorage.setItem("gamemode", mode);
}

export function lsGetGameState() {
  console.debug("Getting game state from local storage...");
  return localStorage.getItem("gamestate");
}

export function lsSetGameState(state: string) {
  localStorage.setItem("gamestate", state);
}
