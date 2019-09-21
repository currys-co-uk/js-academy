import Cell from './Cell'

test('isAlive being true', () => {
	let cell = new Cell(true);
	expect(cell.isAlive()).toBe(true);
});

test('isAlive being false', () => {
	let cell = new Cell(false);
	expect(cell.isAlive()).toBe(false);
});

