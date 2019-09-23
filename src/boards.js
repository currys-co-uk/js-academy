const smallBoard = [
  [0, 0, 1],
  [1, 1, 0],
  [1, 0, 1],
];

const mediumBoard = [
  [0, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1],
];

const bigBoard = [
  [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
];

let randomBiggerThanBigBoard = [];


function generateRandomBoard() {
  const boardSize = Math.round(Math.random() * 20) + 45;

  for (let i = 0; i < boardSize; i += 1) {
    const row = [];
    randomBiggerThanBigBoard[i] = row;

    for (let j = 0; j < boardSize; j += 1) {
      row.push(Math.round(Math.random()));
    }
  }
}

randomBiggerThanBigBoard = generateRandomBoard();

// eslint-disable-next-line import/prefer-default-export
export const boards = {
  smallBoard,
  mediumBoard,
  bigBoard,
  randomBiggerThanBigBoard,
};
