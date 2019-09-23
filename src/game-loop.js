/* eslint-disable no-console,default-case */

import gameOfLife from './gol';
import {
  initializeRenderingGrid,
  updateRenderingGrid,
  renderColorfulBoard,
  renderColorCheatSheet,
} from './board-render';
import { boards } from './boards';

const readline = require('readline');

const boardNames = Object.keys(boards);
const renderZerosInBlack = process.argv.slice(2)[0] === '-b';
const welcomeMessage = `@xxxx[{::::::::::::::::::::::::::::::::::>
Game of Life
  much more interesting than Game of Thrones
@xxxx[{::::::::::::::::::::::::::::::::::>

Press (a) to autorun, (t) to terminate
`;

let gameLoopInterval;
let renderingSpeed;
let selectedGameBoard;
let boardRenderingGrid;
let currentSystemState = 'init';
let controlsLine = welcomeMessage;

function displayControls() {
  console.log(controlsLine);
}

function displayColorCheatSheet() {
  console.log(`${renderColorCheatSheet()}\n`);
}

function displayBoard(board) {
  if (boardRenderingGrid === undefined) {
    boardRenderingGrid = initializeRenderingGrid(board);
  }

  boardRenderingGrid = updateRenderingGrid(boardRenderingGrid, board);

  console.log(renderColorfulBoard(boardRenderingGrid, renderZerosInBlack));
}

function display(board) {
  console.clear();


  if (board !== undefined) {
    displayBoard(board);
    displayColorCheatSheet();
  }

  displayControls();
}

function generateBoardsQuestion() {
  let counter = 0;
  let question = 'Choose a board: ';

  boardNames.forEach((boardName) => { question += `\n${counter}: ${boardName}`; counter += 1; });

  return question;
}

function loop() {
  selectedGameBoard = gameOfLife(selectedGameBoard);
  display(selectedGameBoard);
}

function startGame() {
  loop();
  gameLoopInterval = setInterval(loop, renderingSpeed * 1000);
}

function pauseGame() {
  clearInterval(gameLoopInterval);
}

display();

// user input
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// user input loop
process.stdin.on('keypress', (str, key) => {
  let eventProcessed = false;

  if (key.ctrl && key.name === 'c') {
    process.exit();
  }

  if (currentSystemState === 'init' && !eventProcessed) {
    switch (key.name) {
      case 'a':
        controlsLine = generateBoardsQuestion();
        currentSystemState = 'auto-init';
        break;
      case 't':
        process.exit();
        break;
    }

    eventProcessed = true;
  }

  if (currentSystemState === 'auto-init' && !eventProcessed) {
    const boardNumber = Number.parseInt(key.name, 10);

    if (!Number.isNaN(boardNumber) && boardNumber >= 0 && boardNumber < boardNames.length) {
      selectedGameBoard = boards[boardNames[boardNumber]];

      controlsLine = 'Select board rendering speed is seconds:';
      currentSystemState = 'auto-start';
    } else {
      controlsLine = `Board '${key.name}' is not defined.\n${generateBoardsQuestion()}`;
    }

    eventProcessed = true;
  }

  if (currentSystemState === 'auto-start' && !eventProcessed) {
    const renderTime = Number.parseInt(key.name, 10);

    if (!Number.isNaN(renderTime) && renderTime > 0) {
      renderingSpeed = renderTime;
      startGame();

      controlsLine = '[Game running] Press (p) to pause, (t) to terminate';
      currentSystemState = 'auto-running';
    } else {
      controlsLine = `Render speed '${key.name}' is not supported.`;
    }

    eventProcessed = true;
  }

  if (currentSystemState === 'auto-running' && !eventProcessed) {
    switch (key.name) {
      case 'p':
        pauseGame();

        controlsLine = '[Game paused] Press (r) to run, (t) to terminate';
        currentSystemState = 'auto-paused';
        break;
      case 't':
        process.exit();
        break;
    }

    eventProcessed = true;
  }

  if (currentSystemState === 'auto-paused' && !eventProcessed) {
    switch (key.name) {
      case 'r':
        startGame();

        controlsLine = '[Game running] Press (p) to pause, (t) to terminate';
        currentSystemState = 'auto-running';
        break;
      case 't':
        process.exit();
        break;
    }

    eventProcessed = true;
  }

  display(selectedGameBoard);
});
