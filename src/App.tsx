import "./App.css";
import { GameBoard } from "./components/GameBoard";
import { GameStateProvider } from "./components/GameStateProvider";
import { Header } from "./components/Header";
import { KeyBoard } from "./components/Keyboard";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggleTest } from "./components/ThemeToggleTest";

function App() {
  return (
    <>
      <ThemeProvider>
        <GameStateProvider>
          <ThemeToggleTest />
          <Header />
          <GameBoard />
          <KeyBoard />
        </GameStateProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
