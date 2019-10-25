import React from "react";
import GameOfLife from "./GameOfLife";
import './App.css';
import next from './gol';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Vítejte v "Game of life"</h1>
        <p>Nejprve vyberte velikost hracího plánu, poté nastavte výchozí stav, a na závěr pokračujte v úrovních.</p>
        <GameOfLife next={next} />
      </header>
    </div>
  );
}

export default App;

