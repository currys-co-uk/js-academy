import next, { countLiveNeighbours } from './gol';

it('return that function next exists', () => {
  expect(typeof next)
    .toBe('function');
});

it('return array of array', () => {
  const input = [[]];
  const output = next(input);
  expect(Array.isArray(output))
    .toBe(true);
  expect(Array.isArray(output[0]))
    .toBe(true);
});

it('check that 1 cell dies', () => {
  const input = [[1]];
  const expectedOutput = [[0]];
  const output = next(input);
  expect(output)
    .toEqual(expectedOutput);
});

it('check that it works on matrix', () => {
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
  expect(output)
    .toEqual(expectedOutput);
});

test('all rules works', () => {
  const input = [
    [0, 1, 1],
    [0, 0, 1],
    [1, 0, 1],
  ];
  const expectedOutput = [
    [0, 1, 1],
    [0, 0, 1],
    [0, 1, 0],
  ];

  const output = next(input);
  expect(output)
    .toEqual(expectedOutput);
});

test('all rules works', () => {
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
  expect(output)
    .toEqual(expectedOutput);
});

test('all rules works', () => {
  const input = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const expectedOutput = [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ];

  const output = next(input);
  expect(output)
    .toEqual(expectedOutput);
});

describe('countLiveNeighbours', () => {
  test('return 8 for center cell when all cells are alive', () => {
    const input = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 8;
    expect(countLiveNeighbours(input, 1, 1))
      .toBe(expectedOutput);
  });

  test('return 8 for corner cell when all cells are alive', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 0, 0))
      .toBe(expectedOutput);
  });

  test('return 8 when all cells are alive', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const expectedOutput = 3;
    expect(countLiveNeighbours(input, 3, 2))
      .toBe(expectedOutput);
  });

  test('test the matrix', () => {
    const input = [
      [1, 0, 1],
      [0, 1, 1],
      [1, 1, 1],
    ];
    expect(countLiveNeighbours(input, 0, 0))
      .toBe(1);
    expect(countLiveNeighbours(input, 0, 1))
      .toBe(4);
    expect(countLiveNeighbours(input, 0, 2))
      .toBe(2);
    expect(countLiveNeighbours(input, 1, 0))
      .toBe(4);
    expect(countLiveNeighbours(input, 1, 1))
      .toBe(6);
    expect(countLiveNeighbours(input, 1, 2))
      .toBe(4);
    expect(countLiveNeighbours(input, 2, 0))
      .toBe(2);
    expect(countLiveNeighbours(input, 2, 1))
      .toBe(4);
    expect(countLiveNeighbours(input, 2, 2))
      .toBe(3);
  });
});
