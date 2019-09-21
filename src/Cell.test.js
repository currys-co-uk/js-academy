import Cell from './Cell'

test('isAlive being true', () => {
	let cell = new Cell(true);
	expect(cell.isAlive()).toBe(true);
});

test('isAlive being false', () => {
	let cell = new Cell(false);
	expect(cell.isAlive()).toBe(false);
});

test('kill living cell', () => {
	let cell = new Cell(true);
	cell.kill();
	expect(cell.isAlive()).toBe(false);
});

test('kill dead cell', () => {
	let cell = new Cell(false);
	cell.kill();
	expect(cell.isAlive()).toBe(false);
});

test('ressurect living cell', () => {
	let cell = new Cell(true);
	cell.ressurect();
	expect(cell.isAlive()).toBe(true);
});

test('ressurect dead cell', () => {
	let cell = new Cell(false);
	cell.ressurect();
	expect(cell.isAlive()).toBe(true);
});