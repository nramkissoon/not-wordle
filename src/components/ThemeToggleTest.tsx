import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export function ThemeToggleTest() {
  const { toggleColorMode, toggleHighContrast, theme } =
    useContext(ThemeContext);

  return (
    <div className="flex flex-col items-start">
      <button onClick={() => toggleColorMode()}>Toggle Color</button>
      <button onClick={() => toggleHighContrast()}>Toggle Contrast</button>
      <div>Theme -&gt;{theme}</div>
    </div>
  );
}
