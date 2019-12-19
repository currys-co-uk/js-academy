import React from "react";
import Square from "./Square.js";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: props.boardSquares
        };
    }

    renderSquare(i) {
        return (
            <Square
                value={this.props.boardSquares[i] & 1 ? "o" : ""} //Is the value odd or even
                onClick={() => this.props.handleClick(i)}
            />
        );
    }

    renderRow(startIndex, columnsNumber) {
        let allSquares = Array(this.props.columns)
            .fill(0)
            .map((item, index) => this.renderSquare(startIndex + index));
        return <div className="board-row">{allSquares}</div>;
    }

    render() {
        let allRows = Array(this.props.rows)
            .fill(0)
            .map((item, index) =>
                this.renderRow(index * this.props.columns, this.props.columns)
            );
        return (
            <div>
                <div>Board</div>
                {allRows}
            </div>
        );
    }
}

export default Board;
