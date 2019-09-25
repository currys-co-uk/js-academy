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

describe('countLiveNeighbours', () => {
  test('return 8 when all cells are live', () => {
    const input = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
    const expectedOutput = 8;
    expect(countLiveNeighbours(input, 1, 1)).toBe(expectedOutput);
  });
  test('return 8 when all cells are live', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 0, 0)).toBe(expectedOutput);
  });
  test('return 8 when all cells are live', () => {
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

describe('next', () => {
  test('1x1 - 1 neighbours alive', () => {
    const input = [[1]];
    const expectedOutput = [[0]];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });

  test('2x2 - 3 neighbours alive + new alive', () => {
    const input = [[0, 1], [1, 1]];
    const expectedOutput = [[1, 1], [1, 1]];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });

  test('2x2 - 3 neighbours alive', () => {
    const input = [[1, 1], [1, 1]];
    const expectedOutput = [[1, 1], [1, 1]];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });

  test('3x3 - mixed', () => {
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

  test('3x3 - mixed2', () => {
    const input = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
});
