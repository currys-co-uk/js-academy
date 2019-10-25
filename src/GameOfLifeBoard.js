import React from "react";
import Board from './Board';
import Button from './Button';

class GameOfLifeBoard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      boardState : props.boardState,
      initialBoardState : props.boardState
    };
  }

  handleNextClick = event => {
    this.setState(currentState => { // State Mutation. First argument is always the whole current state
      return { // Function must return the whole New State
        ...currentState, // "..." (spread) is deconstruction of the object adding the change
        boardState : this.props.next(currentState.boardState) // adding new state
      }
    });
  };

  handleResetClick = event => {
    this.setState(currentState => {
      return {
        ...currentState,
        boardState: this.state.initialBoardState
      }
    })
  };

  render() {
    return (<div>
      {this.state.boardState && <Board boardState={this.state.boardState}/>}
      <br />
      <Button onClick={this.handleNextClick} title="Další generace!"/>
      <Button onClick={this.handleResetClick} title="Resetovat"/>
    </div>)
  }
}

GameOfLifeBoard.defaultProps = {
  next : (boardState) => { return boardState; }
};

export default GameOfLifeBoard;
