import React from "react";
import ReactDOM from "react-dom";
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
`;

const Input = styled.input`
  background: "white";
  color: "#c3073F";

  font-size: 1em;
  margin: 5px 5px;
  padding: 5px 5px;
  border: 2px solid #c3073F;
  border-radius: 5px;
`;

const BoardDesk = styled.table`
  background: #1A1A1D;
  border-spacing: 0px;
`;

const CellAlive = styled.td`
  width: 10px;
  height: 10px;
  background: #c3073F;
  color: black;
  border: 1px solid black;

  &:hover {
    background: #6F2232;
    border: 1px solid black;
  }
`;

const CellDead = styled.td`
  width: 10px;
  height: 10px;
  background: #1A1A1D;
  border: 1px solid black;

  &:hover {
    background: gray;
    border: 1px solid black;
  }
`;

class Row extends React.PureComponent {
  drawCell(evt) {
    if (this.props.row[evt.target.dataset.y]["state"] === 1) {
      this.props.row[evt.target.dataset.y]["state"] = 0;
    } else {
      this.props.row[evt.target.dataset.y]["state"] = 1;
    }
    this.forceUpdate();
  }

  render() {
    return (
      <tr>
        {this.props.row.map(cell => {
          if (cell.state === 1) {
           return <CellAlive onClick={evt => this.drawCell(evt)} data-x={cell.x} data-y={cell.y}></CellAlive>;
          }
          return <CellDead onClick={evt => this.drawCell(evt)} data-x={cell.x} data-y={cell.y}></CellDead>;
        })}
      </tr>
    );
  }
}

function Board(props) {
  return (
    <BoardDesk>
      <tbody>
        {props.boardState.map(row => (
          <Row row={row} />
        ))}
      </tbody>
    </BoardDesk>
  );
}

Board.propTypes = {
  boardState: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired
};

class GolApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      boardState: [],
      cols: 50,
      rows: 40,
      animation: false,
    }
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleNextClick() {
    this.setState(currentState => {
      return {
        ...currentState,
        boardState: next(currentState.boardState)
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
      var board = [];
      for (var i = 0; i < currentState.rows; i++) {
        board[i] = [];
        for (var j = 0; j < currentState.cols; j++) {
          board[i][j] = [];
          board[i][j]["state"] = Math.round(Math.random()*0.7);
          board[i][j]["x"] = i;
          board[i][j]["y"] = j;
        }
      }
      return {
        boardState: board
      };
    });
  };

  clear = () => {
    this.setState(currentState => {
      var board = [];
      for (var i = 0; i < currentState.rows; i++) {
        board[i] = [];
        for (var j = 0; j < currentState.cols; j++) {
          board[i][j] = [];
          board[i][j]["state"] = 0;
          board[i][j]["x"] = i;
          board[i][j]["y"] = j;
        }
      }
      return {
        boardState: board
      };
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.boardState && <Board boardState={this.state.boardState} />}
        </div>
        <div>
          Board: 
          <Input type="edit" name="cols" title="Width" value={this.state.cols} size="1" onChange={evt =>this.updateInput(evt)}/> x
          <Input type="edit" name="rows" title="Height" value={this.state.rows} size="1" onChange={evt =>this.updateInput(evt)}/>
          </div>
          <div>
            <Button onClick={this.reset} primary>Random game</Button>
            <Button onClick={this.clear} primary>Clear board</Button>
            <Button onClick={this.handleNextClick}>Next state</Button>
            <Button onClick={this.animation}>Start/Stop animation</Button>
            <Button onClick={this.logs} title="LOG" primary>Logs</Button>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<GolApp />, rootElement);
