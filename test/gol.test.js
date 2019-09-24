import getNextBoardState, { countLiveNeighbours } from '../src/gol';

test('function next exist', () => {
  expect(typeof getNextBoardState).toBe('function');
});

test('next return array of array', () => {
  const input = [[]];
  const output = getNextBoardState(input);
  expect(Array.isArray(output)).toBe(true);
  expect(Array.isArray(output[0])).toBe(true);
});

test('one live cell will die', () => {
  const input = [[1]];
  const expectedOutput = [[0]];
  const output = getNextBoardState(input);
  expect(output).toEqual(expectedOutput);
});

test('it will work', () => {
  const input = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ];
  const expectedOutput = [
    [1, 1, 1],
    [1, 0, 1],
    [0, 0, 0],
  ];

  const output = getNextBoardState(input);

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
