import gameOfLife from './gol';
import {
  initializeRenderingGrid,
  updateRenderingGrid,
  renderColorfulBoard,
  renderColorCheatSheet,
} from './board-render';
import { boards } from './boards';

const readline = require('readline');

const renderZerosInBlack = process.argv.slice(2)[0] === '-b';
let gameLoopInterval;
let renderingSpeed;
const boardNames = Object.keys(boards);
let selectedGameBoard;
let boardRenderingGrid;
let currentSystemState = 'init';
let controlsLine = `@xxxx[{::::::::::::::::::::::::::::::::::>
Game of Life
  much more interesting than Game of Thrones
@xxxx[{::::::::::::::::::::::::::::::::::>

Press (a) to autorun, (t) to terminate
`;

function displayControls() {
  // eslint-disable-next-line no-console
  console.log(controlsLine);
}

function displayColorCheatSheet() {
  // eslint-disable-next-line no-console
  console.log(renderColorCheatSheet());
}

function displayBoard(board) {
  if (board !== undefined) {
    if (boardRenderingGrid === undefined) {
      boardRenderingGrid = initializeRenderingGrid(board);
    }

    boardRenderingGrid = updateRenderingGrid(board, boardRenderingGrid);

    // eslint-disable-next-line no-console
    console.log(renderColorfulBoard(boardRenderingGrid, renderZerosInBlack));

    displayColorCheatSheet();
  }
}

function display(board) {
  // eslint-disable-next-line no-console
  console.clear();

  displayBoard(board);

  if (board !== undefined) {
    // eslint-disable-next-line no-console
    console.log('\n');
  }

  displayControls();
}

function generateBoardsQuestion() {
  let counter = 0;
  let question = 'Choose a board: ';
  boardNames.forEach((boardName) => { question += `\n${counter += 1}: ${boardName}`; });

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

// waiting for user input
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  let eventProcessed = false;

  if (key.ctrl && key.name === 'c') {
    process.exit();
  }

  if (!eventProcessed && currentSystemState === 'init') {
    switch (key.name) {
      case 'a':
        controlsLine = generateBoardsQuestion();
        currentSystemState = 'auto-init';
        break;
      case 't':
        process.exit();
        break;
      default:
        break;
    }

    eventProcessed = true;
  }

  if (!eventProcessed && currentSystemState === 'auto-init') {
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

  if (!eventProcessed && currentSystemState === 'auto-start') {
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

  if (!eventProcessed && currentSystemState === 'auto-running') {
    switch (key.name) {
      case 'p':
        pauseGame();

        controlsLine = '[Game paused] Press (r) to run, (t) to terminate';
        currentSystemState = 'auto-paused';
        break;
      case 't':
        process.exit();
        break;
      default:
        break;
    }

    eventProcessed = true;
  }

  if (!eventProcessed && currentSystemState === 'auto-paused') {
    switch (key.name) {
      case 'r':
        startGame();

        controlsLine = '[Game running] Press (p) to pause, (t) to terminate';
        currentSystemState = 'auto-running';
        break;
      case 't':
        process.exit();
        break;
      default:
        break;
    }

    eventProcessed = true;
  }

  display(selectedGameBoard);
});
