function getNeighbourCellsCoordinates(board, i, j) {
  const neighbourCellsCoordinates = [];

  for (let x = i - 1; x <= i + 1; x += 1) {
    if (x >= 0 && x < board.length) {
      for (let y = j - 1; y <= j + 1; y += 1) {
        if (y >= 0 && y < board[x].length) {
          if (x !== i || y !== j) {
            neighbourCellsCoordinates.push({ x, y });
          }
        }
      }
    }
  }

  return neighbourCellsCoordinates;
}

export function countLiveNeighbours(board, x, y) {
  let countOfLivingNeighbourCells = 0;

  const neighboursCoordinates = getNeighbourCellsCoordinates(board, x, y);

  neighboursCoordinates.forEach(
    (neighbourCell) => {
      countOfLivingNeighbourCells += board[neighbourCell.x][neighbourCell.y];
    },
  );

  return countOfLivingNeighbourCells;
}

function getNextCellState(currentBoardState, x, y) {
  let nextCellState = 0;

  const liveNeighbours = countLiveNeighbours(currentBoardState, x, y);
  const currentCellState = currentBoardState[x][y];

  if (currentCellState === 1 && (liveNeighbours >= 2 && liveNeighbours <= 3)) {
    nextCellState = 1;
  }

  if (currentCellState === 0 && liveNeighbours === 3) {
    nextCellState = 1;
  }

  return nextCellState;
}

export default function getNextBoardState(currentBoardState) {
  const nextBoardState = currentBoardState.map((row) => row.map((cell) => cell));

  for (let x = 0; x < currentBoardState.length; x += 1) {
    for (let y = 0; y < currentBoardState[x].length; y += 1) {
      nextBoardState[x][y] = getNextCellState(currentBoardState, x, y);
    }
  }

  return nextBoardState;
}
