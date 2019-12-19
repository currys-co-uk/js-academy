export function countLiveNeighbours(board, i, j) {
    let count = 0;
    for (let x = i - 1; x <= i + 1; x += 1) {
        if (x < 0 || x >= board.length) {
            continue;
        } // eslint-disable-line no-continue
        for (let y = j - 1; y <= j + 1; y += 1) {
            if (y < 0 || y >= board[x].length) {
                continue;
            } // eslint-disable-line no-continue
            if (x === i && y === j) {
                continue;
            } // eslint-disable-line no-continue
            count += board[x][y];
        }
    }
    return count;
}

export function next(input) {
    const output = input.map(row => row.map(cell => cell));

    for (let i = 0; i < input.length; i += 1) {
        for (let j = 0; j < input[i].length; j += 1) {
            const liveNeighbours = countLiveNeighbours(input, i, j);
            if (liveNeighbours < 2) {
                output[i][j] = 0;
            } else if (liveNeighbours === 3) {
                output[i][j] = 1;
            } else if (liveNeighbours >= 4) {
                output[i][j] = 0;
            } else {
                output[i][j] = input[i][j];
            }
        }
    }

    return output;
}

export default function nextFlat(flatInput, columns) {
    const input = getTwoDimensionalArrayFromFlat(flatInput, columns);
    const output = next(input);
    return getFlatFromTwoDimensionalArray(output);
}

export function getTwoDimensionalArrayFromFlat(flatInput, columns) {
    let input = [];
    let i = 0;
    let j = 0;
    let row = [];

    for (let k = 0; k < flatInput.length; k += 1) {
        row[j] = flatInput[k];
        j++;
        if (j >= columns) {
            j = 0;
            input[i] = row;
            row = [];
            i++;
        }
    }
    return input;
}

export function getFlatFromTwoDimensionalArray(output) {
    let flatOutput = [];
    let k = 0;
    for (let i = 0; i < output.length; i++) {
        for (let j = 0; j < output[i].length; j++) {
            flatOutput[k] = output[i][j];
            k++;
        }
    }
    return flatOutput;
}
