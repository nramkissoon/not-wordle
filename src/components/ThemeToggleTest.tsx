import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export function ThemeToggleTest() {
  const { toggleColorMode, toggleHighContrast } = useContext(ThemeContext);

  return (
    <>
      <button onClick={() => toggleColorMode()}>Toggle Color</button>
      <button onClick={() => toggleHighContrast()}>Toggle Contrast</button>
    </>
  );
}
