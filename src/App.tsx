import { GameBoard } from "./components/GameBoard";
import { GameStateProvider } from "./components/GameStateProvider";
import { Header } from "./components/Header";
import { KeyBoard } from "./components/Keyboard";
import { OffscreenKeyboard } from "./components/OffscreenKeyboard";
import { OnscreenKeyboardInputOnlyProvider } from "./components/OnscreenKeyboardInputOnlyProvider";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <OnscreenKeyboardInputOnlyProvider>
        <GameStateProvider>
          <OffscreenKeyboard>
            <Header />
            <main className="flex flex-col items-center gap-6">
              <GameBoard />
              <KeyBoard />
            </main>
          </OffscreenKeyboard>
        </GameStateProvider>
      </OnscreenKeyboardInputOnlyProvider>
    </ThemeProvider>
  );
}

export default App;
