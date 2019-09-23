const white = '\x1b[37m';
const black = '\x1b[30m';

const colors = [
  white, // FgBlack
  white, // FgWhite
  '\x1b[31m', // FgRed
  '\x1b[32m', // FgGreen
  '\x1b[33m', // FgYellow
  '\x1b[34m', // FgBlue
  '\x1b[35m', // FgMagenta
  '\x1b[36m', // FgCyan
];

const ranks = [
  'dead (0)',
  'Second Lieutenant (1)',
  'First Lieutenant',
  'Captain',
  'Major',
  'Colonel',
  'Major General',
  'General',
];

export function initializeRenderingGrid(board) {
  const renderingGrid = [];

  for (let i = 0; i < board.length; i += 1) {
    renderingGrid[i] = [];

    for (let j = 0; j < board[i].length; j += 1) {
      renderingGrid[i][j] = 0;
    }
  }

  return renderingGrid;
}

export function updateRenderingGrid(renderingGrid, board) {
  const newRenderingGrid = [];

  for (let i = 0; i < board.length; i += 1) {
    newRenderingGrid[i] = [];

    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === 0) {
        newRenderingGrid[i][j] = 0;
      } else {
        newRenderingGrid[i][j] = renderingGrid[i][j] + 1;
      }
    }
  }

  return newRenderingGrid;
}

export function renderColorfulBoard(renderingGrid, renderZerosInBlack = false) {
  let renderedBoard = '';

  for (let i = 0; i < renderingGrid.length; i += 1) {
    const line = [];

    for (let j = 0; j < renderingGrid[i].length; j += 1) {
      const renderingGridElement = renderingGrid[i][j];
      let color = renderingGridElement < colors.length
        ? colors[renderingGridElement]
        : colors[colors.length - 1];

      if (
        renderingGridElement === 0
        && renderZerosInBlack !== undefined
        && renderZerosInBlack === true
      ) {
        color = black;
      }

      const items = color + (renderingGridElement === 0 ? '0' : '1') + white;

      line.push(items);
    }

    renderedBoard += `${line.join(' ')}\n`;
  }

  return renderedBoard + white;
}

export function renderColorCheatSheet() {
  let cheatSheet = '';

  for (let i = 0; i < colors.length; i += 1) {
    cheatSheet += `${colors[i]}level - ${ranks[i]}\n`;
  }

  cheatSheet += white;

  return cheatSheet;
}
