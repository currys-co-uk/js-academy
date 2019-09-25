import next, { countLiveNeighbours } from './gol';

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
  test('return 3 when all cells around corner are live', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 0, 0)).toBe(expectedOutput);
  });
  test('return 3 when all cells around corner are live', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 3, 2)).toBe(expectedOutput);
  });
  test('return 1 for corner cell', () => {
    const input = [
      [0, 1, 1],
      [0, 0, 0],
    ];
    const expectedOutput = 1;
    expect(countLiveNeighbours(input, 0, 0)).toBe(expectedOutput);
  });
});

describe('next', () => {
  test('function next exist', () => {
    expect(typeof next).toBe('function');
  });

  test('next return array of array', () => {
    const input = [[]];
    const output = next(input);
    expect(Array.isArray(output)).toBe(true);
    expect(Array.isArray(output[0])).toBe(true);
  });
  test('one live cell will die', () => {
    const input = [[1]];
    const expectedOutput = [[0]];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('it will work', () => {
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
  test('Rule 1: Live cell with fewer than 2 live neighbours dies', () => {
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
  test('Rule 2: Live cell with more than 3 live neighbours dies', () => {
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
  test('Rule 3: Live cell with 2 or 3 live neighbours lives on to the next generation', () => {
    const input = [
      [0, 0, 0],
      [1, 1, 0],
      [1, 1, 0],
    ];
    const expectedOutput = [
      [0, 0, 0],
      [1, 1, 0],
      [1, 1, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('Rule 4: Dead cell with exactly 3 live neighbours becomes live', () => {
    const input = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 0],
    ];
    const expectedOutput = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('All rules #1', () => {
    const input = [
      [0, 0, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 0],
    ];
    const expectedOutput = [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
  test('All rules #2', () => {
    const input = [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    const expectedOutput = [
      [0, 0, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });
});