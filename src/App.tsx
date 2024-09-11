import { GameBoard } from "./components/GameBoard";
import { GameStateProvider } from "./components/GameStateProvider";
import { Header } from "./components/Header";
import { KeyBoard } from "./components/Keyboard";
import { OffscreenKeyboard } from "./components/OffscreenKeyboard";
import { OnscreenKeyBoardToggleTest } from "./components/OnscreenKeyboardInoutOnlyProviderTest";
import { OnscreenKeyboardInputOnlyProvider } from "./components/OnscreenKeyboardInputOnlyProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggleTest } from "./components/ThemeToggleTest";

function App() {
  return (
    <ThemeProvider>
      <OnscreenKeyboardInputOnlyProvider>
        <GameStateProvider>
          <OffscreenKeyboard>
            <OnscreenKeyBoardToggleTest />
            <ThemeToggleTest />
            <Header />
            <GameBoard />
            <KeyBoard />
          </OffscreenKeyboard>
        </GameStateProvider>
      </OnscreenKeyboardInputOnlyProvider>
    </ThemeProvider>
  );
}

export default App;
