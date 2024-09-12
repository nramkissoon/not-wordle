import { createContext, ReactNode, useState } from "react";
import { lsGetTheme, lsSetTheme } from "../utils/localStorage";

export type Themes = "light" | "dark" | "high-contrast" | "high-contrast-dark";

type ThemeContextType = {
  theme: Themes;
  toggleHighContrast: () => void;
  toggleColorMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleHighContrast: () => {},
  toggleColorMode: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

function getSystemPreferredColorScheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

function getDefaultTheme() {
  let defaultTheme = "light";
  const lsTheme = lsGetTheme();
  if (lsTheme === null) {
    defaultTheme = getSystemPreferredColorScheme();
  } else {
    defaultTheme = lsTheme;
  }
  lsSetTheme(defaultTheme as Themes);
  return defaultTheme as Themes;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(getDefaultTheme());

  function saveAndSetTheme(theme: Themes) {
    lsSetTheme(theme);
    setTheme(theme);
  }

  const toggleColorMode = () => {
    if (theme === "light") return saveAndSetTheme("dark");
    if (theme === "dark") return saveAndSetTheme("light");
    if (theme === "high-contrast") return saveAndSetTheme("high-contrast-dark");
    if (theme === "high-contrast-dark") return saveAndSetTheme("high-contrast");
  };

  const toggleHighContrast = () => {
    if (theme === "light") return saveAndSetTheme("high-contrast");
    if (theme === "dark") return saveAndSetTheme("high-contrast-dark");
    if (theme === "high-contrast") return saveAndSetTheme("light");
    if (theme === "high-contrast-dark") return saveAndSetTheme("dark");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleColorMode, toggleHighContrast }}
    >
      <div className={theme}>
        <div className="dark:bg-wordleBlack high-contrast-dark:bg-wordleBlack light:bg-white high-contrast:bg-white dark:text-white high-contrast-dark:text-white light:text-wordleBlack high-contrast:text-wordleBlack">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
