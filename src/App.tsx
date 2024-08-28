import "./App.css";
import { GameBoard } from "./components/GameBoard";
import { Header } from "./components/Header";
import { KeyBoard } from "./components/Keyboard";

function App() {
  return (
    <>
      <Header />
      <GameBoard />
      <KeyBoard />
    </>
  );
}

export default App;
