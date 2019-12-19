import nextFlat, {
    countLiveNeighbours,
    next,
    getTwoDimensionalArrayFromFlat,
    getFlatFromTwoDimensionalArray
} from "./gol";

test("nextFlat function exists", () => {
    expect(typeof nextFlat).toBe("function");
});

test("nextFlat function returns array", () => {
    const input = [];
    const output = nextFlat(input, 0);
    expect(Array.isArray(output)).toBe(true);
    expect(Array.isArray(output[0])).toBe(false);
});

test("one live cell will die", () => {
    const input = [1];
    const output = nextFlat(input, 1);
    const expectedOutput = [0];
    expect(output).toEqual(expectedOutput);
});

test("cell with one neighbour will die", () => {
    const input = [1, 1];
    const expectedOutput = [0, 0];
    const output = nextFlat(input, 1);
    expect(output).toEqual(expectedOutput);
});

test("cells with less than two neighbours will die", () => {
    const input = [1, 1, 1];
    const output = nextFlat(input, 3);
    const expectedOutput = [0, 1, 0];
    expect(output).toEqual(expectedOutput);
});

test("cells with 3 neighbours will survive", () => {
    const input = [1, 1, 1, 1];
    const output = nextFlat(input, 2);
    const expectedOutput = [1, 1, 1, 1];
    expect(output).toEqual(expectedOutput);
});

test("cells with 3 neighbours will become alive", () => {
    const input = [1, 1, 1, 0];
    const output = nextFlat(input, 2);
    const expectedOutput = [1, 1, 1, 1];
    expect(output).toEqual(expectedOutput);
});

test("cells with 4 neighbours will die", () => {
    const input = [1, 1, 1, 1, 1, 0];
    const output = nextFlat(input, 3);
    const expectedOutput = [1, 0, 1, 1, 0, 1];
    expect(output).toEqual(expectedOutput);
});

test("cells with 5 and more neighbours will die", () => {
    const input = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    const output = nextFlat(input, 3);
    const expectedOutput = [1, 0, 1, 0, 0, 0, 1, 0, 1];
    expect(output).toEqual(expectedOutput);
});

describe("getTwoDimensionalArrayFromFlat", () => {
    test("getTwoDimensionalArrayFromFlat function exists", () => {
        expect(typeof getTwoDimensionalArrayFromFlat).toBe("function");
    });

    test("getTwoDimensionalArrayFromFlat function returns array", () => {
        const input = [1];
        const output = getTwoDimensionalArrayFromFlat(input, 1);
        expect(Array.isArray(output)).toBe(true);
        expect(Array.isArray(output[0])).toBe(true);
    });

    test("empty array", () => {
        expect([]).toEqual(getTwoDimensionalArrayFromFlat([], 0));
    });

    test("one row", () => {
        expect([[1, 2, 3]]).toEqual(getTwoDimensionalArrayFromFlat([1, 2, 3], 3));
    });

    test("one column", () => {
        expect([[1], [2], [3]]).toEqual(
            getTwoDimensionalArrayFromFlat([1, 2, 3], 1)
        );
    });

    test("2 times 3 array", () => {
        expect(getTwoDimensionalArrayFromFlat([1, 2, 3, 4, 5, 6], 3)).toEqual([
            [1, 2, 3],
            [4, 5, 6]
        ]);
    });

    test("3 times 2 array", () => {
        expect(getTwoDimensionalArrayFromFlat([1, 2, 3, 4, 5, 6], 2)).toEqual([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);
    });
});

describe("getFlatFromTwoDimensionalArray", () => {
    test("getFlatFromTwoDimensionalArray function exists", () => {
        expect(typeof getFlatFromTwoDimensionalArray).toBe("function");
    });

    test("getFlatFromTwoDimensionalArray function returns array", () => {
        const input = [1];
        const output = getFlatFromTwoDimensionalArray(input, 1);
        expect(Array.isArray(output)).toBe(true);
        expect(Array.isArray(output[0])).toBe(false);
    });

    test("empty array", () => {
        expect([]).toEqual(getFlatFromTwoDimensionalArray([]));
    });

    test("one row", () => {
        expect([1, 2, 3]).toEqual(getFlatFromTwoDimensionalArray([[1, 2, 3]]));
    });

    test("one column", () => {
        expect([1, 2, 3]).toEqual(getFlatFromTwoDimensionalArray([[1], [2], [3]]));
    });

    test("2 times 3 array", () => {
        expect(getFlatFromTwoDimensionalArray([[1, 2, 3], [4, 5, 6]])).toEqual([
            1,
            2,
            3,
            4,
            5,
            6
        ]);
    });

    test("3 times 2 array", () => {
        expect(getFlatFromTwoDimensionalArray([[1, 2], [3, 4], [5, 6]])).toEqual([
            1,
            2,
            3,
            4,
            5,
            6
        ]);
    });
});

describe("next", () => {
    test("function next exists", () => {
        expect(typeof next).toBe("function");
    });

    test("next return array of array", () => {
        const input = [[]];
        const output = next(input);
        expect(Array.isArray(output)).toBe(true);
        expect(Array.isArray(output[0])).toBe(true);
    });

    test("one live cell will die", () => {
        const input = [[1]];
        const expectedOutput = [[0]];
        const output = next(input);
        expect(output).toEqual(expectedOutput);
    });

    test("cell with one neighbour will die", () => {
        const input = [[1, 1]];
        const expectedOutput = [[0, 0]];
        const output = next(input);
        expect(output).toEqual(expectedOutput);
    });

    test("cell with less than two neighbours will die", () => {
        const input = [[1, 1, 1]];
        const expectedOutput = [[0, 1, 0]];
        const output = next(input);
        expect(output).toEqual(expectedOutput);
    });

    test("cells with 3 neighbours will survive", () => {
        const input = [[1, 1], [1, 1]];
        const expectedOutput = [[1, 1], [1, 1]];
        const output = next(input);
        expect(output).toEqual(expectedOutput);
    });

    test("cells with 3 neighbours will become alive", () => {
        const input = [[1, 1], [1, 0]];
        const expectedOutput = [[1, 1], [1, 1]];
        const output = next(input);
        expect(output).toEqual(expectedOutput);
    });

    test("cells with 4 neighbours will die", () => {
        const input = [[1, 1, 1], [1, 1, 0]];
        const expectedOutput = [[1, 0, 1], [1, 0, 1]];
        const output = next(input);
        expect(output).toEqual(expectedOutput);
    });

    test("cells with 5 neighbours will die", () => {
        const input = [[1, 1, 1], [1, 1, 1]];
        const expectedOutput = [[1, 0, 1], [1, 0, 1]];
        const output = next(input);
        expect(output).toEqual(expectedOutput);
    });
});

test("it will work", () => {
    const input = [[0, 1, 1], [1, 0, 1], [1, 0, 1]];
    const expectedOutput = [[0, 1, 1], [1, 0, 1], [0, 0, 0]];
    const output = next(input);
    expect(output).toEqual(expectedOutput);
});

describe("countLiveNeighbours", () => {
    test("return 8 when all cells are live", () => {
        const input = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
        const expectedOutput = 8;
        expect(countLiveNeighbours(input, 1, 1)).toBe(expectedOutput);
    });
    test("return 3 when all neighbours of corner cell are live", () => {
        const input = [[0, 1, 1], [1, 1, 1], [1, 1, 1]];
        const expectedOutput = 3;
        expect(countLiveNeighbours(input, 0, 0)).toBe(expectedOutput);
    });
    test("return 5 when all surrounding cells of a boarder cell are live", () => {
        const input = [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]];
        const expectedOutput = 5;
        expect(countLiveNeighbours(input, 3, 1)).toBe(expectedOutput);
    });
});
