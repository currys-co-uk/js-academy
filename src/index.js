import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import next from "./gol.js";

import "./styles.css";

class Row extends React.PureComponent {
  drawCell(evt) {
    if (this.props.row[evt.target.dataset.y]["state"] === 1) {
      this.props.row[evt.target.dataset.y]["state"] = 0;
      evt.target.className = "mycell_dead";
      return
    }
    this.props.row[evt.target.dataset.y]["state"] = 1;
    evt.target.className = "mycell_live";
    this.render();
  }

  render() {
    return (
      <tr>
        {this.props.row.map(cell => {
          if (cell.state === 1) {
           return <td className="mycell_live" onClick={evt => this.drawCell(evt)} data-x={cell.x} data-y={cell.y}></td>;
          }
          return <td className="mycell_dead" onClick={evt => this.drawCell(evt)} data-x={cell.x} data-y={cell.y}></td>;
        })}
      </tr>
    );
  }
}

const tableStyles = {
  background: "darkgrey",
  color: "white"
};

function Board(props) {
  return (
    <table style={tableStyles}>
      <tbody>
        {props.boardState.map(row => (
          <Row row={row} />
        ))}
      </tbody>
    </table>
  );
}

Board.propTypes = {
  boardState: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired
};

function Button(props) {
  return <button onClick={props.onClick}>{props.title}</button>;
}

class GolApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      boardState: [],
      cols: 20,
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
      this.render();
     }
   }

  reset = () => {
    this.setState(currentState => {
      var board = [];
      for (var i = 0; i < currentState.rows; i++) {
        board[i] = [];
        for (var j = 0; j < currentState.cols; j++) {
          board[i][j] = [];
          board[i][j]["state"] = Math.round(Math.random()*0.8);
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
        {this.state.boardState && <Board boardState={this.state.boardState} />}
        <br></br>
        Board: 
        <input type="edit" name="cols" title="Width" value={this.state.cols} size="3" onChange={evt =>this.updateInput(evt)}/> x 
        <input type="edit" name="rows" title="Height" value={this.state.rows} size="3" onChange={evt =>this.updateInput(evt)}/>
        <br></br>
        <Button onClick={this.reset} title="Random game" />
        <Button onClick={this.clear} title="Clear board" />
        <Button onClick={this.handleNextClick} title="Next state" />
        <Button onClick={this.animation} title="Start animation" />
        <Button onClick={this.logs} title="LOG" />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<GolApp />, rootElement);
