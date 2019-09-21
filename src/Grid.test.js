import Grid from './Grid';
import Cell from './Cell';

test('add living cell', () => {
	let grid = new Grid();
	grid.setCell(1, 3, new Cell(true));
	expect(grid.getCell(1, 3).isAlive()).toBe(true);
});

test('add dead cell', () => {
	let grid = new Grid();
	grid.setCell(1, 3, new Cell(false));
	expect(grid.getCell(1, 3).isAlive()).toBe(false);
});

test('get inexisting cell', () => {
	let grid = new Grid();
	let cell = grid.getCell(1, 1);
	expect(cell.isAlive()).toBe(false);
});

test('get existing cell', () => {
	let grid = new Grid();
	grid.setCell(1, 1, new Cell(true));
	let cell = grid.getCell(1, 1);
	expect(cell.isAlive()).toBe(true);
});

test('get alive neighbour count with two alive neighbours', () => {
	let grid = new Grid();
	grid.setCell(1, 1, new Cell(true))
		.setCell(1, 2, new Cell(false))
		.setCell(2, 3, new Cell(true));
	expect(grid.getAliveNeighbourCount(1, 2)).toBe(2);
});

test('get alive neighbour count with no cell defined', () => {
	let grid = new Grid();
	expect(grid.getAliveNeighbourCount(3, 3)).toBe(0);
});

test('get alive neighbour count with eight alive neighbours', () => {
	let grid = new Grid();
	grid.setCell(0, 0, new Cell(true))
		.setCell(1, 0, new Cell(true))
		.setCell(2, 0, new Cell(true))
		.setCell(0, 1, new Cell(true))
		.setCell(1, 1, new Cell(true))
		.setCell(2, 1, new Cell(true))
		.setCell(0, 2, new Cell(true))
		.setCell(1, 2, new Cell(true))
		.setCell(2, 2, new Cell(true));
	expect(grid.getAliveNeighbourCount(1, 1)).toBe(8);
});

test('get next cycle cell - live cell with fewer than two live neighbours dies, as if by underpopulation', () => {
	let grid = new Grid();
	grid.setCell(0, 0, new Cell(true));
	expect(grid.getNextCycleCell(0, 0).isAlive()).toBe(false);
});

test('get next cycle cell - live cell with two live neighbours lives on to the next generation', () => {
	let grid = new Grid();
	grid.setCell(0, 0, new Cell(true))
		.setCell(1, 0, new Cell(true))
		.setCell(1, 1, new Cell(true));
	expect(grid.getNextCycleCell(0, 0).isAlive()).toBe(true);
});

test('get next cycle cell - live cell with three live neighbours lives on to the next generation', () => {
	let grid = new Grid();
	grid.setCell(0, 0, new Cell(true))
		.setCell(1, 0, new Cell(true))
		.setCell(1, 1, new Cell(true))
		.setCell(0, 1, new Cell(true));
	expect(grid.getNextCycleCell(0, 0).isAlive()).toBe(true);
});

test('get next cycle cell - live cell with more than three live neighbours dies, as if by overpopulation', () => {
	let grid = new Grid();
	grid.setCell(0, 0, new Cell(true))
		.setCell(1, 0, new Cell(true))
		.setCell(1, 1, new Cell(true))
		.setCell(1, 2, new Cell(true))
		.setCell(0, 1, new Cell(true));
	expect(grid.getNextCycleCell(1, 1).isAlive()).toBe(false);
});

test('get next cycle cell - dead cell with exactly three live neighbours becomes a live cell, as if by reproduction', () => {
	let grid = new Grid();
	grid.setCell(0, 0, new Cell(false))
		.setCell(1, 0, new Cell(true))
		.setCell(1, 1, new Cell(true))
		.setCell(0, 1, new Cell(true));
	expect(grid.getNextCycleCell(0, 0).isAlive()).toBe(true);
});

test('get next cycle', () => {
	/**
	 * [0, 1, 0]
	 * [1, 0, 0]
	 * [0, 1, 0]
	 */
	let grid = new Grid();
	grid.setCell(0, 1, new Cell(true))
		.setCell(1, 0, new Cell(true))
		.setCell(1, 2, new Cell(true));
	/**
	 * [0, 0, 0]
	 * [1, 1, 0]
	 * [0, 0, 0]
	 */
	grid.nextCycle();
	expect(grid.getCell(0, 0).isAlive()).toBe(false);
	expect(grid.getCell(1, 0).isAlive()).toBe(false);
	expect(grid.getCell(2, 0).isAlive()).toBe(false);
	expect(grid.getCell(0, 1).isAlive()).toBe(true);
	expect(grid.getCell(1, 1).isAlive()).toBe(true);
	expect(grid.getCell(2, 1).isAlive()).toBe(false);
	expect(grid.getCell(0, 2).isAlive()).toBe(false);
	expect(grid.getCell(1, 2).isAlive()).toBe(false);
	expect(grid.getCell(2, 2).isAlive()).toBe(false);
});