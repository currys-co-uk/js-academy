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

test('next evaluates game of life for 3 x 3 matrix having 5 live cells', () => {
  const input = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ];
  const expectedOutput = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

test('next evaluates game of life for 3 x 3 matrix having all live cells', () => {
  const input = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ];
  const expectedOutput = [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1]
  ];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});


test('next evaluates game of life for 5 x 5 matrix having some live cells', () => {
  const input = [
    [1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [1, 0, 1, 1, 0],
    [1, 0, 0, 0, 1]
  ];
  const expectedOutput = [
    [0, 1, 0, 1, 1],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 1, 0, 1, 0]
  ];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

test('next evaluates game of life for 3x3 matrix having 3 live cells', () => {
  const input = [
    [0, 1, 0],
    [0, 0, 1],
    [0, 1, 0]
  ];
  const expectedOutput = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0]
  ];
  const output = next(input);
  expect(output).toEqual(expectedOutput);
});

test('next evaluates game of life for 3x3 matrix having 6 live cells', () => {
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
