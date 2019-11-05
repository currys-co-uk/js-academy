export function countLiveNeighbours(board, row, col) {
    let count = 0;
    for (let x = row - 1; x <= row + 1; x += 1) {
        if (x < 0 || x >= board.length) { continue; } // eslint-disable-line no-continue
        for (let y = col - 1; y <= col + 1; y += 1) {
            if (y < 0 || y >= board[x].length) { continue; } // eslint-disable-line no-continue
            if (x === row && y === col) { continue; } // eslint-disable-line no-continue
            count += board[x][y]["state"];
        }
    }
    return count;
}

export default function next(input) {
  let output = [];
  //rows
  for (let i = 0; i < input.length; i += 1) {
    output[i] = [];
    //cols
    for (let j = 0; j < input[i].length; j += 1) {
      output[i][j] = []
      output[i][j]["state"] = input[i][j]["state"];
      output[i][j]["x"] = i;
      output[i][j]["y"] = j;
      const liveNeighbours = countLiveNeighbours(input, i, j);
      if (input[i][j]["state"] === 1 && liveNeighbours < 2) {
        output[i][j]["state"] = 0;
      }
      if (input[i][j]["state"] === 1 && (liveNeighbours === 2 || liveNeighbours === 3)) {
        output[i][j]["state"] = 1;
      }
      if (input[i][j]["state"] === 1 && liveNeighbours > 3) {
        output[i][j]["state"] = 0;
      }
      if (input[i][j]["state"] === 0 && liveNeighbours === 3) {
        output[i][j]["state"] = 1;
      }
    }
  }
  return output;
}

