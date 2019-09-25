export function countLiveNeighbours(board, i, j) {
  let count = 0;
  for (let x = i - 1; x <= i + 1; x += 1) {
    if (x < 0 || x >= board.length) continue; // eslint-disable-line no-continue
    for (let y = j - 1; y <= j + 1; y += 1) {
      if (y < 0 || y >= board[x].length) continue; // eslint-disable-line no-continue
      count += board[x][y];
    }
  }

  count -= board[i][j];
  return count;
}

function next(input) {
  const output = input.map((row) => row.map((cell) => cell));

  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < input[i].length; j += 1) {
      const liveNeighbours = countLiveNeighbours(input, i, j);

      if (liveNeighbours < 2) {
        // 1. Any live cell with fewer than two live neighbours dies,
        // as if caused by underpopulation.
        output[i][j] = 0;
      } else if (liveNeighbours > 3) { // overcrowding
        // 2. Any live cell with more than three live neighbours dies,
        // as if by overcrowding.
        output[i][j] = 0;
      } else if (liveNeighbours === 3) {
        // 4. Any dead cell with exactly three live neighbours becomes a live cell.
        output[i][j] = 1;
      } else {
        // 3. Any live cell with two or three live neighbours lives on to the next generation.
        output[i][j] = input[i][j];
      }
    }
  }

  return output;
}

export default next;
