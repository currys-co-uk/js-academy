import Cell from './Cell.js';

export default class Grid
{
	constructor()
	{
		this.width = 0;
		this.height = 0;
		this.cycle = 0;
		this.rows = [];
		this.cyclePositions = [];
	}

	/**
	 * @param {number} xPosition
	 * @param {number} yPosition
	 * @param {Grid}
	 */
	addCell(xPosition, yPosition, cell)
	{
		if (xPosition >= this.width) {
			this.width = xPosition - 1;
		}

		if (yPosition > this.height) {
			this.height = yPosition - 1;
		}

		if (typeof this.rows[xPosition] === 'undefined') {
			this.rows[xPosition] = [];
		}

		if (typeof this.rows[xPosition][yPosition] !== 'undefined') {
			throw new Error(`Unable to add cell '${xPosition}', '${yPosition}'. Cell already exists.`);
		}

		this.rows[xPosition][yPosition] = cell;

		return this;
	}

	/**
	 * @param {number} xPosition
	 * @param {number} yPosition
	 * @returns {Cell}
	 */
	getCell(xPosition, yPosition)
	{
		if (typeof this.rows[xPosition] === 'undefined') {
			this.rows[xPosition] = [];
		}

		if (typeof this.rows[xPosition][yPosition] === 'undefined') {
			this.rows[xPosition][yPosition] = new Cell(false);
		}

		return this.rows[xPosition][yPosition];
	}

	nextCycle()
	{
		let nextCycleRows = [];
		let xIndex = 0;
		let yIndex = 0;
		while (xIndex < this.width) {
			nextCycleRows[xIndex] = [];
			while (yIndex < this.height) {
				nextCycleRows[xIndex][yIndex] = this.getNextCycleCell(xIndex, yIndex);
				yIndex++;
			}
			xIndex++;
		}

		this.cycle++;
		console.log(nextCycleRows);
		this.rows = nextCycleRows;
	}

	/**
	 * @param {number} xPosition
	 * @param {number} yPosition
	 * @returns {number}
	 */
	getAliveNeighbourCount(xPosition, yPosition)
	{
		let aliveNeighbourCount = 0;

		for (let xIndex = xPosition - 1; xIndex <= (xPosition + 1); xIndex++) {
			for (let yIndex = yPosition - 1; yIndex <= (yPosition + 1); yIndex++) {
				if (xIndex === xPosition && yIndex === yPosition) {
					continue;
				}

				let currentCell = this.getCell(xIndex, yIndex);
				if (currentCell.isAlive()) {
					aliveNeighbourCount++;
				}
			}
		}

		return aliveNeighbourCount;
	}

	/**
	 * @param {number} xPosition
	 * @param {number} yPosition
	 * @returns {Cell}
	 */
	getNextCycleCell(xPosition, yPosition)
	{
		let aliveNeighbourCount = this.getAliveNeighbourCount(xPosition, yPosition);
		let currentCell = this.getCell(xPosition, yPosition);

		if (currentCell.isAlive()) {
			if (aliveNeighbourCount < 2 || aliveNeighbourCount > 3) {
				currentCell.kill();
			}

			return currentCell;
		}

		if (aliveNeighbourCount === 3) {
			currentCell.ressurect();
		}

		return currentCell;
	}
}