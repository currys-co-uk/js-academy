import next, { countLiveNeighbours } from './game_of_life';

describe('Game of life', () => {
  test('Function next exists', () => {
    expect(typeof next).toBe('function');
  });

  test('next returns array of array', () => {
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

  test('underpopulation', () => {
    const input = [
      [0, 1, 1],
      [0, 0, 0],
      [1, 1, 0],
    ];

    const output = next(input);
    expect(output[0][1]).toEqual(0);
    expect(output[0][2]).toEqual(0);
    expect(output[2][0]).toEqual(0);
    expect(output[2][1]).toEqual(0);
  });

  test('overcrowding', () => {
    const input = [
      [0, 1, 1],
      [1, 1, 1],
      [0, 0, 0],
    ];
    const output = next(input);
    expect(output[1][1]).toEqual(0);
  });

  test('live cell survives with 2 or 3 neighbours', () => {
    const input = [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ];
    const output = next(input);
    expect(output[0][2]).toEqual(0);
    expect(output[2][0]).toEqual(1);
    expect(output[1][1]).toEqual(1);
  });

  test('cell is born with exactly three neighbours', () => {
    const input = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ];
    const output = next(input);
    expect(output[0][2]).toEqual(1);
  });

  test('given example from the webpage', () => {
    const input = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const expectedOutput = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
  });

  test('still alive', () => {
    const input = [
      [0, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 0],
    ];

    const output = next(input);
    expect(output).toEqual(input);
  });
});

describe('countLiveNeighbours', () => {
  test('all cells are alive', () => {
    const input = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];

    expect(countLiveNeighbours(input, 0, 0)).toBe(3);
    expect(countLiveNeighbours(input, 0, 1)).toBe(5);
    expect(countLiveNeighbours(input, 0, 2)).toBe(3);
    expect(countLiveNeighbours(input, 1, 0)).toBe(5);
    expect(countLiveNeighbours(input, 1, 1)).toBe(8);
    expect(countLiveNeighbours(input, 1, 2)).toBe(5);
    expect(countLiveNeighbours(input, 2, 0)).toBe(3);
    expect(countLiveNeighbours(input, 2, 1)).toBe(5);
    expect(countLiveNeighbours(input, 2, 2)).toBe(3);
  });

  test('middle cell is death', () => {
    const input = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];

    expect(countLiveNeighbours(input, 0, 0)).toBe(2);
    expect(countLiveNeighbours(input, 0, 1)).toBe(4);
    expect(countLiveNeighbours(input, 0, 2)).toBe(2);
    expect(countLiveNeighbours(input, 1, 0)).toBe(4);
    expect(countLiveNeighbours(input, 1, 1)).toBe(8);
    expect(countLiveNeighbours(input, 1, 2)).toBe(4);
    expect(countLiveNeighbours(input, 2, 0)).toBe(2);
    expect(countLiveNeighbours(input, 2, 1)).toBe(4);
    expect(countLiveNeighbours(input, 2, 2)).toBe(2);
  });

  test('non square play board', () => {
    const input = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];

    expect(countLiveNeighbours(input, 0, 0)).toBe(2);
    expect(countLiveNeighbours(input, 0, 1)).toBe(4);
    expect(countLiveNeighbours(input, 0, 2)).toBe(2);
    expect(countLiveNeighbours(input, 1, 0)).toBe(4);
    expect(countLiveNeighbours(input, 1, 1)).toBe(8);
    expect(countLiveNeighbours(input, 1, 2)).toBe(4);
    expect(countLiveNeighbours(input, 2, 0)).toBe(4);
    expect(countLiveNeighbours(input, 2, 1)).toBe(7);
    expect(countLiveNeighbours(input, 2, 2)).toBe(4);
    expect(countLiveNeighbours(input, 3, 0)).toBe(3);
    expect(countLiveNeighbours(input, 3, 1)).toBe(5);
    expect(countLiveNeighbours(input, 3, 2)).toBe(3);
  });
});
