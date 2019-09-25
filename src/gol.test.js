import next, { countLiveNeighbours } from './gol';

describe('countLiveNeighbours', () => {
  test('return 8 when all cells are live', () => {
    const input = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
    const expectedOutput = 8;
    expect(countLiveNeighbours(input, 1, 1)).toBe(expectedOutput);
  });
  test('return 3 for corner cell', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 0, 0)).toBe(expectedOutput);
  });
  test('return 3 for corner cell in rectangle', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 3, 2)).toBe(expectedOutput);
  });
  test('return 5 for border cell', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 5;
    expect(countLiveNeighbours(input, 1, 2)).toBe(expectedOutput);
  });
});

describe('next', () => {
  test('next return array of array', () => {
    const input = [[]];
    const output = next(input);
    expect(Array.isArray(output)).toBe(true);
    expect(Array.isArray(output[0])).toBe(true);
  });
  test('Rule 1: fewer than two live neighbours -> dies', () => {
    const input = [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ];
    const expectedOutput = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('Rule 2: more than three live neighbours -> dies', () => {
    const input = [
      [1, 1, 1],
      [1, 0, 1],
      [0, 0, 0],
    ];
    const expectedOutput = [
      [1, 0, 1],
      [1, 0, 1],
      [0, 0, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('Rule 3: two or three live neighbours -> lives', () => {
    const input = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const expectedOutput = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('Rule 4: dead cell has exactly three live neighbours -> lives', () => {
    const input = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const expectedOutput = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('All rules together', () => {
    const input = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];
    const expectedOutput = [
      [0, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
});
