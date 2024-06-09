import React, { useState } from "react";
import { Loading } from "./components/Loading";
import { Game } from "./components/Game";
import "./App.css";

function App() {
  const [game, startGame] = useState<Boolean>(false);
  return (
    <div className="App">
      <header className="App-header">
        {game ? <Game /> : <Loading startGame={startGame} />}
      </header>
    </div>
  );
}

export default App;
