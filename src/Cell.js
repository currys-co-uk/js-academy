export default class Cell
{
	/**
	 * @param {boolean} isAlive
	 */
	constructor(isAlive) {
		this.alive = isAlive;
	}

	/**
	 * @return {boolean}
	 */
	isAlive()
	{
		return this.alive;
	}
}