import next, { countLiveNeighbours } from './gol';

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
  describe('Four rules of live and die', () => {
    test('Normal case of underpopulation', () => {
      const input = [
        [0, 0, 0],
        [0, 1, 1],
        [0, 0, 0],
      ];
      const expectedOutput = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Corner case of underpopulation', () => {
      const input = [
        [1, 1],
        [0, 0],
      ];
      const expectedOutput = [
        [0, 0],
        [0, 0],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Edge case of underpopulation', () => {
      const input = [
        [0, 0],
        [1, 1],
        [0, 0],
      ];
      const expectedOutput = [
        [0, 0],
        [0, 0],
        [0, 0],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Corner case of underpopulation, 0 neighbours', () => {
      const input = [
        [0, 0],
        [1, 0],
      ];
      const expectedOutput = [
        [0, 0],
        [0, 0],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Normal case of overcrowding', () => {
      const input = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];
      const expectedOutput = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Edge case of overcrowding', () => {
      const input = [
        [0, 1],
        [1, 1],
        [1, 1],
      ];
      const expectedOutput = [
        [1, 1],
        [0, 0],
        [1, 1],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Corner case of overcrowding', () => {
      const input = [
        [1, 1],
        [1, 1],
      ];
      const expectedOutput = [
        [1, 1],
        [1, 1],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Normal case of surviving', () => {
      const input = [
        [1, 1, 0],
        [1, 1, 1],
        [0, 1, 1],
      ];
      const expectedOutput = [
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Edge case of surviving', () => {
      const input = [
        [1, 1],
        [1, 1],
        [1, 1],
      ];
      const expectedOutput = [
        [1, 1],
        [0, 0],
        [1, 1],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Corner case of surviving', () => {
      const input = [
        [1, 1, 1],
        [0, 1, 1],
      ];
      const expectedOutput = [
        [1, 0, 1],
        [1, 0, 1],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Normal case of becoming live', () => {
      const input = [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
      ];
      const expectedOutput = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Edge case of becoming live', () => {
      const input = [
        [1, 0],
        [0, 1],
        [1, 1],
      ];
      const expectedOutput = [
        [0, 0],
        [0, 1],
        [1, 1],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
    test('Corner case of becoming live', () => {
      const input = [
        [1, 0, 1],
        [0, 1, 0],
      ];
      const expectedOutput = [
        [0, 1, 0],
        [0, 1, 0],
      ];
      expect(next(input)).toEqual(expectedOutput);
    });
  });
  describe('Ability to work with big arrays, (website example)', () => {
    test('Big array, next generation', () => {
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
      expect(next(input)).toEqual(expectedOutput);
    });
  });
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
