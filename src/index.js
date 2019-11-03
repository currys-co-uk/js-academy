import React from "react";
import ReactDOM from "react-dom";
import {Bounce,Flip} from 'react-reveal'
import PropTypes from "prop-types";
import next from "./gol.js";
import styled from 'styled-components'

import "./styles.css";

const Button = styled.button`
  background: ${props => props.primary ? "#c3073F" : "white"};
  color: ${props => props.primary ? "white" : "#c3073F"};

  font-size: 1em;
  margin: 5px;
  padding: 5px 10px;
  border: 2px solid #c3073F;
  border-radius: 5px;

  &:hover {
    border: 2px solid black;
  }
`;

const Input = styled.input`
  background: "white";
  color: "#c3073F";

  font-size: 1em;
  margin: 5px 5px;
  padding: 5px 5px;
  border: 2px solid #c3073F;
  border-radius: 5px;

  &:hover {
    border: 2px solid black;
  }
`;

const BoardDesk = styled.div`
  background: #1A1A1D;
  display: inline-block;
`;

const RowClass = styled.div`
  min-height: 10px;
`;

const CellAlive = styled.div`
  display: inline-block;
  width: 10px;
  background: #c3073F;
  color: black;
  border: 1px solid black;

  &:hover {
    background: #6F2232;
    border: 1px solid black;
  }
`;

const CellDead = styled.div`
  display: inline-block;
  width: 10px;
  background: #1A1A1D;
  border: 1px solid black;

  &:hover {
    background: gray;
    border: 1px solid black;
  }
`;

const CounterLeft = styled.div`
  float: left;
  color: #c3073F;
  font-size: 12pt;
  font-weight: bold;
  border: 1px solid black;
  padding: 5px;
  margin: 0px 50px 10px 0px;
`;

const CounterRight = styled.div`
  float: right;
  color: black;
  font-size: 12pt;
  font-weight: bold;
  border: 1px solid black;
  padding: 5px;
  margin: 0px 0px 10px 50px;
`;

function generateBoard(rows, cols, random) {
  var board = [];
  for (var i = 0; i < rows; i++) {
    board[i] = [];
    for (var j = 0; j < cols; j++) {
      board[i][j] = [];
      if (random) {
        board[i][j]["state"] = Math.round(Math.random()*0.7);
      } else {
        board[i][j]["state"] = 0;
      }
      board[i][j]["x"] = i;
      board[i][j]["y"] = j;
    }
  }
  return board;
}

function countBoardCells(board)
{
  var liveCells = 0;
  var deadCells = 0;
  for (var i = 0; i < board.length; i++) {
    var counts = countRowCells(board[i]);
    liveCells += counts.liveCells;
    deadCells += counts.deadCells;
  }
  return {liveCells: liveCells, deadCells: deadCells};
}

function countRowCells(row)
{
  var liveCells = 0;
  var deadCells = 0;
  for (var i = 0; i < row.length; i++) {
    if (row[i]["state"] === 1) {
        liveCells++;
        continue;
    }
    deadCells++;
  }
  return {liveCells: liveCells, deadCells: deadCells};
}

class Row extends React.PureComponent {
  drawCell(evt) {
    if (this.props.row[evt.target.dataset.y]["state"] === 1) {
      this.props.row[evt.target.dataset.y]["state"] = 0;
    } else {
      this.props.row[evt.target.dataset.y]["state"] = 1;
    }

    this.props.counterHandler(countBoardCells(this.props.board.boardState));
    this.forceUpdate();
  }

  render() {
    return (
      <RowClass>
        {this.props.row.map(cell => {
          if (cell.state === 1) {
           return <CellAlive onClick={evt => this.drawCell(evt)} data-x={cell.x} data-y={cell.y} key={cell.y} >&nbsp;</CellAlive>;
          }
          return <CellDead onClick={evt => this.drawCell(evt)} data-x={cell.x} data-y={cell.y} key={cell.y} >&nbsp;</CellDead>;
        })}
      </RowClass>
    );
  }
}

class Board extends React.PureComponent {
  render () {
    const rows = [];
    var i = 0;
    for (const row of this.props.board.boardState) {
      rows.push(<Row board={this.props.board} row={row} key={i} counterHandler={this.props.counterHandler} />)
      i++;
    }
    return (
      <BoardDesk>
            {rows}
      </BoardDesk>
    );
  };
}

Board.propTypes = {
  board: PropTypes.object.isRequired
};

class GolApp extends React.PureComponent {
  constructor(props) {
    super(props);
    var defaultRows = 40;
    var defaultCols = 50;
    var defaultBoard = generateBoard(defaultRows, defaultCols, true);
    var count = countBoardCells(defaultBoard);
    this.state = {
      rows: defaultRows,
      cols: defaultCols,
      animation: false,
      boardState: defaultBoard,
      cellCounts: count
    }
    this.handleNextClick = this.handleNextClick.bind(this);
    this.counterHandler = this.counterHandler.bind(this);
  }

  counterHandler(counts) {
    this.setState({
      cellCounts: counts
    })
  }

  handleNextClick() {
    var newBoard = next(this.state.boardState);
    this.setState(currentState => {
      return {
        ...currentState,
        boardState: newBoard,
        cellCounts: countBoardCells(newBoard)
      };
    });
  }

  updateInput(evt) {
    this.setState(
      {
        [evt.target.name]: evt.target.value
      }
    );
  }

  logs = () => {
    console.log(this.state);
   }

  animation = () => {
    for(let i = 0; i<10; i++)
    {
      this.handleNextClick();
      this.forceUpdate();
    }
  }

  reset = () => {
    this.setState(currentState => {
      var board = generateBoard(currentState.rows, currentState.cols, true);
      var cellsCount = countBoardCells(board); 
      return {
        boardState: board,
        cellCounts: cellsCount
      };
    });
  };

  clear = () => {
    this.setState(currentState => {
      var board = generateBoard(currentState.rows, currentState.cols, false);
      var cellsCount = countBoardCells(board);
      return {
        boardState: board,
        cellCounts: cellsCount
      };
    });
  };

  render() {
    return (
      <center>
      <div>
          <div>
          <Bounce top>
            <h1>G.A.M.E of L.I.F.E</h1>
          </Bounce>
        </div>
        <div>
          <Flip bottom>
            <div>
              <div style={{'display': 'inline-block'}}>
                <CounterLeft>{this.state.cellCounts.liveCells}</CounterLeft>
                <CounterRight>{this.state.cellCounts.deadCells}</CounterRight>
              </div>
              <div>
                <Board board={this.state} counterHandler={this.counterHandler} />
              </div>
            </div>
          </Flip>
        </div>
        <div>
          <Bounce bottom>
          <div>
            Board: 
            <Input type="edit" name="cols" title="Width" value={this.state.cols} size="1" onChange={evt =>this.updateInput(evt)}/> x
            <Input type="edit" name="rows" title="Height" value={this.state.rows} size="1" onChange={evt =>this.updateInput(evt)}/>
          </div>
          </Bounce>
          <Bounce bottom>
            <div>
              <Button onClick={this.reset} primary>Random game</Button>
              <Button onClick={this.clear} primary>Clear board</Button>
              <Button onClick={this.handleNextClick}>Next state</Button>
              <Button onClick={this.animation}>Start/Stop animation</Button>
              <Button onClick={this.logs} primary>Logs</Button>
            </div>
          </Bounce>
      </div>
      </div>
      </center>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<GolApp />, rootElement);
