import next, { countLiveNeighbours } from './gol';

describe('Test countLiveNeighbours', () => {
  test('return 8 when all cells are live', () => {
    const input = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
    const expectedOutput = 8;
    expect(countLiveNeighbours(input, 1, 1)).toBe(expectedOutput);
  });
  test('return 3 for a corner cell', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 0, 0)).toBe(expectedOutput);
  });
  test('return 3 for a corner cell with non-square grid', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 3, 2)).toBe(expectedOutput);
  });
});

const getNeighbours = (grid, i, j) => {
  const neighbours = [];

  for (let x = -1; x < 2; x += 1) {
    for (let y = -1; y < 2; y += 1) {
      if (grid[i + x] !== undefined && grid[i + x][j + y] !== undefined && (x !== 0 || y !== 0)) {
        neighbours.push([[i + x], [j + y]]);
      }
    }
  }

  return neighbours;
};

const generateLiveNeighbours = (grid, i, j, liveNeighbours) => {
  const newGrid = grid;
  const neighbours = getNeighbours(grid, i, j);
  if (liveNeighbours > neighbours.length) {
    return null;
  }
  for (let x = 0; x < liveNeighbours; x += 1) {
    newGrid[neighbours[x][0]][neighbours[x][1]] = 1;
  }

  return newGrid;
};

const generateTestData = (size, i, j, liveNeighbours, status) => {
  const grid = Array(size).fill(0).map(() => Array(size).fill(0));

  grid[i][j] = status;

  return generateLiveNeighbours(grid, i, j, liveNeighbours);
};

describe('Test generateTestData', () => {
  test('3x3 grid, left top corner cell with 3 neighbours', () => {
    const size = 3;
    const i = 0;
    const j = 0;
    const liveNeighbours = 3;
    const expectedOutput = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const output = generateTestData(size, i, j, liveNeighbours, 1);
    expect(output).toEqual(expectedOutput);
  });
  test('3x3 grid, right bottom corner cell with 3 neighbours', () => {
    const size = 3;
    const i = 2;
    const j = 2;
    const liveNeighbours = 3;
    const expectedOutput = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1],
    ];
    const output = generateTestData(size, i, j, liveNeighbours, 1);
    expect(output).toEqual(expectedOutput);
  });
  test('3x3 grid, middle cell with 8 neighbours', () => {
    const size = 3;
    const i = 1;
    const j = 1;
    const liveNeighbours = 8;
    const expectedOutput = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const output = generateTestData(size, i, j, liveNeighbours, 1);
    expect(output).toEqual(expectedOutput);
  });
});

test('function next exist', () => {
  expect(typeof next).toBe('function');
});

test('next return array of array', () => {
  const input = [[]];
  const output = next(input);
  expect(Array.isArray(output)).toBe(true);
  expect(Array.isArray(output[0])).toBe(true);
});

describe('Test rule 1', () => {
  test('one live cell will die', () => {
    const input = [[1]];
    const expectedOutput = [[0]];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('manual test', () => {
    const input = [
      [0, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
    ];
    const expectedOutput = [
      [0, 1, 1],
      [1, 0, 1],
      [0, 0, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('grid size 3, 1 live neighbour, cell will die', () => {
    const size = 3;
    const liveNeighbours = 1;
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const cellThatShouldDie = { x, y };
        const input = generateTestData(size, cellThatShouldDie.x, cellThatShouldDie.y, liveNeighbours, 1);
        if (input !== null) {
          const output = next(input);
          expect(input[cellThatShouldDie.x][cellThatShouldDie.y]).toEqual(1);
          expect(output[cellThatShouldDie.x][cellThatShouldDie.y]).toEqual(0);
        }
      }
    }
  });
  test('grid size 8, 1 live neighbour, cell will die', () => {
    const size = 8;
    const liveNeighbours = 1;
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const cellThatShouldDie = { x, y };
        const input = generateTestData(size, cellThatShouldDie.x, cellThatShouldDie.y, liveNeighbours, 1);
        if (input !== null) {
          const output = next(input);
          expect(input[cellThatShouldDie.x][cellThatShouldDie.y]).toEqual(1);
          expect(output[cellThatShouldDie.x][cellThatShouldDie.y]).toEqual(0);
        }
      }
    }
  });
});

describe('Test rule 2', () => {
  test('grid size 3, live neighbours 4, cell will die', () => {
    const size = 3;
    const liveNeighbours = 4;
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const cellThatShouldDie = { x, y };
        const input = generateTestData(size, cellThatShouldDie.x, cellThatShouldDie.y, liveNeighbours, 1);
        if (input !== null) {
          const output = next(input);
          expect(input[cellThatShouldDie.x][cellThatShouldDie.y]).toEqual(1);
          expect(output[cellThatShouldDie.x][cellThatShouldDie.y]).toEqual(0);
        }
      }
    }
  });
  test('grid size 4, live neighbours 5, cell will die', () => {
    const size = 3;
    const liveNeighbours = 4;
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const cellThatShouldDie = { x, y };
        const input = generateTestData(size, cellThatShouldDie.x, cellThatShouldDie.y, liveNeighbours, 1);
        if (input !== null) {
          const output = next(input);
          expect(input[cellThatShouldDie.x][cellThatShouldDie.y]).toEqual(1);
          expect(output[cellThatShouldDie.x][cellThatShouldDie.y]).toEqual(0);
        }
      }
    }
  });
});

describe('Test rule 3', () => {
  test('grid size 3, live neighbours 2, cell will not die', () => {
    const size = 3;
    const liveNeighbours = 2;
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const cellThatShouldStayAlive = { x, y };
        const input = generateTestData(size, cellThatShouldStayAlive.x, cellThatShouldStayAlive.y, liveNeighbours, 1);
        if (input !== null) {
          const output = next(input);
          expect(input[cellThatShouldStayAlive.x][cellThatShouldStayAlive.y]).toEqual(1);
          expect(output[cellThatShouldStayAlive.x][cellThatShouldStayAlive.y]).toEqual(1);
        }
      }
    }
  });
  test('grid size 3, live neighbours 3, cell will not die', () => {
    const size = 3;
    const liveNeighbours = 3;
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const cellThatShouldStayAlive = { x, y };
        const input = generateTestData(size, cellThatShouldStayAlive.x, cellThatShouldStayAlive.y, liveNeighbours, 1);
        if (input !== null) {
          const output = next(input);
          expect(input[cellThatShouldStayAlive.x][cellThatShouldStayAlive.y]).toEqual(1);
          expect(output[cellThatShouldStayAlive.x][cellThatShouldStayAlive.y]).toEqual(1);
        }
      }
    }
  });
});

describe('Test rule 4', () => {
  test('grid size 3, live neighbours 3, cell becomes live', () => {
    const size = 3;
    const liveNeighbours = 3;
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const cellThatShouldBecomeAlive = { x, y };
        const input = generateTestData(size, cellThatShouldBecomeAlive.x, cellThatShouldBecomeAlive.y, liveNeighbours, 0);
        if (input !== null) {
          const output = next(input);
          expect(input[cellThatShouldBecomeAlive.x][cellThatShouldBecomeAlive.y]).toEqual(0);
          expect(output[cellThatShouldBecomeAlive.x][cellThatShouldBecomeAlive.y]).toEqual(1);
        }
      }
    }
  });
});
