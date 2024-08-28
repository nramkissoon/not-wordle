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
