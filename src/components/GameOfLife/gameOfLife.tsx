import * as React from 'react'
import Board from "../Board/board";
import styled from 'styled-components';

const boardWidth = 6;
const boardHeight = 6;

export const countLiveNeighbours = (input: Array<Array<number>>, i: number, j: number) : number => {
  let count = 0;

  for (let x = -1; x < 2; x += 1) {
    for (let y = -1; y < 2; y += 1) {
      if (input[i + x] !== undefined && input[i + x][j + y] !== undefined && (x !== 0 || y !== 0)) {
        count += input[i + x][j + y];
      }
    }
  }

  return count;
};

export const next = (input: Array<Array<number>>) : Array<Array<number>> => {
  const output = input.map((row) => row.map((cell) => cell));

  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < input[i].length; j += 1) {
      const liveNeighbours = countLiveNeighbours(input, i, j);
      // Check if live cell should die
      if (output[i][j] === 1) {
        if (liveNeighbours < 2 || liveNeighbours > 3) {
          output[i][j] = 0;
        }
      // Check if dead cell should become alive
      } else if (liveNeighbours === 3) {
        output[i][j] = 1;
      }
    }
  }

  return output;
};

export const areIterationsIdentical = (iteration1: Array<Array<number>>, iteration2: Array<Array<number>>) : boolean => {
  for(let x = 0; x < iteration1.length; x++) {
    for(let y = 0; y < iteration1[x].length; y++) {
      if (iteration1[x][y] !== iteration2[x][y]) {
        return false;
      }
    }
  }

  return true;
}

export const generateRandomBoard = (width: number, height: number) : Array<Array<number>> => {
 return [...Array(height)].map(rows => [...Array(width)].map(cell => Math.round(Math.random())));
}

const GameOfLifeContainer = styled.div`
  font-size: 1em;
  font-family: sans-serif
`

const StyledButton = styled.button`
  font-size: 1em;
  margin-right: 0.5em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 3px;
`

type BoardData = {
  boardData: Array<Array<number>>
}

const GameOfLife = ({ boardData }: BoardData) => {
  const [iterations, setIterations] = React.useState(Array.isArray(boardData) ? [boardData] : [generateRandomBoard(boardWidth, boardHeight)]);
  const [currentIterationIndex, setCurrentIterationIndex] = React.useState(0);
  const [evolutionInProgress, setEvolutionInProgress] = React.useState(true);

  const handleNextButtonClick = () => {
    const currentIteration = iterations[currentIterationIndex];
    const nextIteration = next(currentIteration);
    if(areIterationsIdentical(currentIteration, nextIteration) === false) {
      setIterations([...iterations, nextIteration]);
      setCurrentIterationIndex(currentIterationIndex + 1);
    } else {
      setEvolutionInProgress(false);
    }
    
  }

  const handleBackButtonClick = () => {
    if (currentIterationIndex >= 1) {
      setEvolutionInProgress(true);
      setCurrentIterationIndex(currentIterationIndex -1);
    }
  };

  const handleResetButtonClick = () => {
    setEvolutionInProgress(true);
    setCurrentIterationIndex(0);
    setIterations([generateRandomBoard(boardWidth, boardHeight)]);
  };

  return (
    <GameOfLifeContainer>
      <h1>Game of Life</h1>
      <div>
        <label>Iteration:</label>
        <span data-testid="iteration_counter">{currentIterationIndex}</span>
      </div>
      {!evolutionInProgress && <div>This is the end.</div>}
      <StyledButton
        onClick={handleBackButtonClick} 
        disabled={currentIterationIndex < 1}
        data-testid="back_button"
      >
        &lt; Back 
      </StyledButton>
      <StyledButton
        onClick={handleNextButtonClick}
        disabled={!evolutionInProgress}
        data-testid="next_button"
      >
        Next &gt;
      </StyledButton>
      <StyledButton 
        onClick={handleResetButtonClick}
        data-testid="reset_button"
      >
        Reset
      </StyledButton>
      <Board boardData={iterations[currentIterationIndex]} />
    </GameOfLifeContainer>
  );
}

export default GameOfLife;