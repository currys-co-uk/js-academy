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

test('one live cell will die', () => {
  const input = [[1]];
  const expectedOutput = [[0]];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

test('Any live cell with fewer than two live neighbours dies, as if by underpopulation', () => {
  const input = [[1, 0], [1, 0]];
  const expectedOutput = [[0, 0], [0, 0]];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

test('Any live cell with fewer than two live neighbours dies, as if by underpopulation && any live cell with two live neighbours lives on to the next generation', () => {
  const input = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
  const expectedOutput = [[0, 0, 0], [1, 1, 1], [0, 0, 0]];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

test('Any live cell with three live neighbours lives on to the next generation', () => {
  const input = [[1, 1], [1, 1]];
  const expectedOutput = [[1, 1], [1, 1]];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

test('Any live cell with fewer than two live neighbours dies, as if by underpopulation && any live cell with two or three live neighbours lives on to the next generation && any dead cell with exactly three live neighbours becomes a live cell', () => {
  const input = [[0, 1, 0], [0, 0, 1], [0, 1, 0]];
  const expectedOutput = [[0, 0, 0], [0, 1, 1], [0, 0, 0]];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

test('Any live cell with more than three live neighbours dies, as if by overpopulation', () => {
  const input = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
  const expectedOutput = [[1, 0, 1], [0, 0, 0], [1, 0, 1]];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

test('Any dead cell with exactly three live neighbours becomes a live cell', () => {
  const input = [[0, 1], [1, 1]];
  const expectedOutput = [[1, 1], [1, 1]];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});
test('it will work', () => {
  const input = [[0, 1, 1], [1, 0, 1], [1, 0, 1]];
  const expectedOutput = [[0, 1, 1], [1, 0, 1], [0, 0, 0]];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

describe('countLiveNeighbours', () => {
  test('return 8 when all cells are live', () => {
    const input = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
    const expectedOutput = 8;
    expect(countLiveNeighbours(input, 1, 1)).toBe(expectedOutput);
  });
  test('return 8 when all cells are live', () => {
    const input = [[0, 1, 1], [1, 1, 1], [1, 1, 1]];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 0, 0)).toBe(expectedOutput);
  });
  test('return 8 when all cells are live', () => {
    const input = [[0, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 3, 2)).toBe(expectedOutput);
  });
});
