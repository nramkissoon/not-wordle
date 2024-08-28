import "./App.css";
import { GameBoard } from "./components/GameBoard";
import { Header } from "./components/Header";
import { KeyBoard } from "./components/Keyboard";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggleTest } from "./components/ThemeToggleTest";

function App() {
  return (
    <>
      <ThemeProvider>
        <ThemeToggleTest />
        <Header />
        <GameBoard />
        <KeyBoard />
      </ThemeProvider>
    </>
  );
}

export default App;
