export const countLiveNeighbours = (input, i, j) => {
  let count = 0;

  for (let x = -1; x < 2; x += 1) {
    for (let y = -1; y < 2; y += 1) {
      if (input[i + x] !== undefined && input[i + x][j + y] !== undefined && (x !== 0 || y !== 0)) {
        count += input[i + x][j + y];
      }
    }
  }

  return count;
};

const next = (input) => {
  const output = input.map((row) => row.map((cell) => cell));

  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < input[i].length; j += 1) {
      const liveNeighbours = countLiveNeighbours(input, i, j);
      // Check if live cell should die
      if (output[i][j] === 1) {
        if (liveNeighbours < 2 || liveNeighbours > 3) {
          output[i][j] = 0;
        }
      // Check if dead cell should become alive
      } else if (liveNeighbours === 3) {
        output[i][j] = 1;
      }
    }
  }

  return output;
};

export default next;
