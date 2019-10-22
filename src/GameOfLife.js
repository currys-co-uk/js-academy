import React from "react";
import InputForm from './InputForm';
import InputDimensions from './InputDimensions';
import GameOfLifeBoard from './GameOfLifeBoard';
import Button from "./Button";

class GameOfLife extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInputDimensionVisible : true,
      isInputFormVisible: false,
      isGameOfLifeVisible : false,
      boardDimensions: {
        rows : 0,
        cells: 0,
      },
      boardState : []
    };
  }

  onInputDimensionCompleted = event => {
    this.setState(currentState => {
      return {
        ...currentState,
        isInputDimensionVisible: false,
        isInputFormVisible: true,
        isGameOfLifeVisible : false,
        boardDimensions: {
          rows : event.rows,
          cells : event.cells
        }
      }
    });
  };

  onInputFormCompleted = event => {
    this.setState(currentState => {
      return {
        ...currentState,
        isInputDimensionVisible: false,
        isInputFormVisible: false,
        isGameOfLifeVisible : true,
        boardState : event
      }
    });
  };

  onResetClicked = event => {
    event.preventDefault();
    this.setState(currentState => {
      return {
        ...currentState,
        isInputDimensionVisible : true,
        isInputFormVisible: false,
        isGameOfLifeVisible : false,
        boardDimensions: {
          rows : 0,
          cells: 0,
        },
        boardState : []
      }
    })
  };

  render() {
    return (<div>
      {this.state.isInputDimensionVisible && <InputDimensions onSubmitted={this.onInputDimensionCompleted}/>}
      {this.state.isInputFormVisible && <InputForm name="input-form" rows={this.state.boardDimensions.rows} cells={this.state.boardDimensions.cells} onSubmitted={this.onInputFormCompleted}/>}
      {this.state.isGameOfLifeVisible && <GameOfLifeBoard boardState={this.state.boardState}/>}
      {!this.state.isInputDimensionVisible && <Button onClick={this.onResetClicked} title="Začni novou hru!"/>}
    </div>)
  }
}

export default GameOfLife;
