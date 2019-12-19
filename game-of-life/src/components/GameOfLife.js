import React from "react";
import nextFlat from "../gol.js";
import Setup from "./Setup.js";
import Board from "./Board.js";
import Control from "./Control.js";

const defaultRows = 15;
const defaultColumns = 15;

class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: defaultRows,
            columns: defaultColumns,
            boardSquares: Array(defaultRows * defaultColumns).fill(0),
            generation: 0,
            timer: 0
        };
    }

    increaseRows() {
        let value = this.state.rows;
        value++;
        this.setState({ rows: value });
        this.setState({ boardSquares: Array(value * this.state.columns).fill(0) });
    }

    decreaseRows() {
        let value = this.state.rows;
        value--;
        this.setState({ rows: value });
        this.setState({ boardSquares: Array(value * this.state.columns).fill(0) });
    }

    increaseColumns() {
        let value = this.state.columns;
        value++;
        this.setState({ columns: value });
        this.setState({ boardSquares: Array(this.state.rows * value).fill(0) });
    }

    decreaseColumns() {
        let value = this.state.columns;
        value--;
        this.setState({ columns: value });
        this.setState({ boardSquares: Array(this.state.rows * value).fill(0) });
    }

    handleClick(i) {
        const squares = this.state.boardSquares.slice();
        if (squares[i] === 0) {
            squares[i] = 1;
        } else {
            squares[i] = 0;
        }
        this.setState({ boardSquares: squares });
    }

    nextIteration() {
        this.setState({
            boardSquares: nextFlat(this.state.boardSquares, this.state.columns)
        });
        this.setState({ generation: this.state.generation + 1 });
    }

    reset() {
        this.setState({ generation: 0 });
        this.setState({ rows: defaultRows });
        this.setState({ columns: defaultColumns });
        this.setState({
            boardSquares: Array(defaultRows * defaultColumns).fill(0)
        });
    }

    play() {
        if (this.state.timer === 0) {
            let timerId = setInterval(() => this.nextIteration(), 1000);
            this.setState({ timer: timerId });
        }
    }

    stop() {
        clearInterval(this.state.timer, 0);
        this.setState({ timer: 0 });
    }

    renderSetup() {
        return (
            <Setup
                rows={this.state.rows}
                columns={this.state.columns}
                increaseRow={() => this.increaseRows()}
                decreaseRow={() => this.decreaseRows()}
                increaseColumn={() => this.increaseColumns()}
                decreaseColumn={() => this.decreaseColumns()}
            />
        );
    }

    renderBoard() {
        return (
            <Board
                rows={this.state.rows}
                columns={this.state.columns}
                boardSquares={this.state.boardSquares}
                handleClick={i => this.handleClick(i)}
            />
        );
    }

    render() {
        return (
            <div className="gameOfLife">
                <div className="game-setup">{this.renderSetup()}</div>
                <div className="game-board">{this.renderBoard()}</div>
                <div className="game-control">
                    <Control
                        nextIteration={() => this.nextIteration()}
                        reset={() => this.reset()}
                        play={() => this.play()}
                        stop={() => this.stop()}
                    />
                </div>
                <div>Generation: {this.state.generation}</div>
            </div>
        );
    }
}

export default GameOfLife;
