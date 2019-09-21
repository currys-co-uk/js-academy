import Cell from './Cell.js';

export default class Grid
{
	constructor()
	{
		this.cycle = 0;
		this.cells = [];
		this.cyclePositions = [];
	}

	/**
	 * @param {number} xPosition
	 * @param {number} yPosition
	 * @return {string}
	 */
	getCellKey(xPosition, yPosition)
	{
		return `${xPosition},${yPosition}`;
	}

	/**
	 * @param {number} xPosition
	 * @param {number} yPosition
	 * @param {Cell} cell
	 * @param {Grid}
	 */
	setCell(xPosition, yPosition, cell)
	{
		let cellKey = this.getCellKey(xPosition, yPosition);
		this.cells[cellKey] = cell;

		if (!cell.isAlive()) {
			return this;
		}

		for (let xIndex = xPosition - 1; xIndex <= (xPosition + 1); xIndex++) {
			for (let yIndex = yPosition - 1; yIndex <= (yPosition + 1); yIndex++) {
				cellKey = this.getCellKey(xIndex, yIndex);
				if (typeof this.cells[cellKey] === 'undefined') {
					this.cells[cellKey] = new Cell(false);
				}
			}
		}

		return this;
	}

	/**
	 * @param {number} xPosition
	 * @param {number} yPosition
	 * @returns {Cell}
	 */
	getCell(xPosition, yPosition)
	{
		let cellKey = this.getCellKey(xPosition, yPosition);
		if (typeof this.cells[cellKey] === 'undefined') {
			return new Cell(false);
		}

		return this.cells[cellKey];
	}

	nextCycle()
	{
		let nextCycleCellsArguments = [];

		for (var key in this.cells) {
			let [xPosition, yPosition] = key.split(',').map((value) => parseInt(value));
			let nextCycleCell = this.getNextCycleCell(xPosition, yPosition);
			if (nextCycleCell.isAlive()) {
				nextCycleCellsArguments.push([xPosition, yPosition, nextCycleCell]);
			}
		};

		this.cycle++;

		this.cells = [];
		nextCycleCellsArguments.forEach(function(setCellArguments) {
			this.setCell(...setCellArguments);
		}.bind(this));
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
				return new Cell(false);
			}

			return new Cell(true);
		}

		if (aliveNeighbourCount === 3) {
			return new Cell(true);
		}

		return new Cell(false);
	}
}