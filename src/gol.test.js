import next, { countLiveNeighbours } from './gol';

test('function next exist', () => {
  expect(typeof next).toBe('function');
});

test('next return array of array', () => {
  const input = [[]];
  const output = next(input);
  expect(Array.isArray(output)).toBe(true);
  expect(Array.isArray(output[0])).toBe(true);
});

describe('Any live cell with fewer than two live neighbours dies', () => {

  test('live cell with exactly one neigbor will die', () => {
    const input = [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];

    const output = next(input);
    const testedOutputCell = output[1][1];
    expect(testedOutputCell).toEqual(0);
  });
  test('live cell with no neigbors will die', () => {
    const input = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];

    const output = next(input);
    const testedOutputCell = output[1][1];
    expect(testedOutputCell).toEqual(0);
  });
});

describe('Any live cell with more than three live neighbours dies', () => {
  test('live cell with with four neigbors will die', () => {
    const input = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];

    const output = next(input);
    const testedOutputCell = output[1][1];
    expect(testedOutputCell).toEqual(0);
  });
  test('live cell with with five neigbors will die', () => {
    const input = [
      [1, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];

    const output = next(input);
    const testedOutputCell = output[1][1];
    expect(testedOutputCell).toEqual(0);
  });
  test('live cell with with six neigbors will die', () => {
    const input = [
      [1, 1, 0],
      [1, 1, 1],
      [1, 1, 0],
    ];

    const output = next(input);
    const testedOutputCell = output[1][1];
    expect(testedOutputCell).toEqual(0);
  });
});

describe('Any live cell with two or three live neighbours lives on to the next generation.', () => {
  test('Live cell with two live neighbors will continue to live', () => {
    const input = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 1],
    ];

    const output = next(input);
    const testedOutputCell = output[1][1];
    expect(testedOutputCell).toEqual(1);
  });
  test('Live cell with three live neighbors will continue to live', () => {
    const input = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ];

    const output = next(input);
    const testedOutputCell = output[1][1];
    expect(testedOutputCell).toEqual(1);
  });
});


describe('Any dead cell with exactly three live neighbours becomes a live cell.', () => {
  test('Live cell with three live neighbors become a live cell', () => {
    const input = [
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 1],
    ];

    const output = next(input);
    const testedOutputCell = output[1][1];
    expect(testedOutputCell).toEqual(1);
  });
});

describe('countLiveNeighbours', () => {
  test('return 8 when all cells are live', () => {
    const input = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 8;
    expect(countLiveNeighbours(input, 1, 1)).toBe(expectedOutput);
  });
  test('return 0 when no cells are live', () => {
    const input = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const expectedOutput = 0;
    expect(countLiveNeighbours(input, 1, 1)).toBe(expectedOutput);
  });
  test('return 3 when all cells on the edge of board are live', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 0, 0)).toBe(expectedOutput);
  });
  //  TODO change title
  test('return 3 when all cells are live', () => {
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
