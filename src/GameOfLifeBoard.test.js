import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameOfLifeBoard from './GameOfLifeBoard';

afterEach(cleanup);

it('renders without crashing', () => {
  const boardState = [
    [1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [1, 0, 1, 1, 0],
    [1, 0, 0, 0, 1]
  ];
  const div = document.createElement('div');
  ReactDOM.render(<GameOfLifeBoard boardState={boardState}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('contains table with board state and buttons for next generation and reset', () => {
  const boardState = [
    [1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [1, 0, 1, 1, 0],
    [1, 0, 0, 0, 1]
  ];
  const {baseElement} = render(
    <GameOfLifeBoard boardState={boardState} />
  );

  expect(baseElement).toHaveTextContent('1001001111000101011010001Další generace!Resetovat');
});

it('is able to generate next generation when "Next Generation!" button is clicked', () => {
  const boardState = [
    [1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [1, 0, 1, 1, 0],
    [1, 0, 0, 0, 1]
  ];
  const {baseElement, getByText} = render(
    <GameOfLifeBoard boardState={boardState} />
  );

  fireEvent.click(getByText('Další generace!'));
  expect(baseElement).toHaveTextContent('0101101001000000111101010Další generace!Resetovat');
});

it('is able to reset initial board state when "reset" button is clicked', () => {
  const boardState = [
    [1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [1, 0, 1, 1, 0],
    [1, 0, 0, 0, 1]
  ];
  const {baseElement, getByText} = render(
    <GameOfLifeBoard boardState={boardState} />
  );

  fireEvent.click(getByText('Další generace!'));
  expect(baseElement).toHaveTextContent('0101101001000000111101010Další generace!Resetovat');

  fireEvent.click(getByText('Další generace!'));
  expect(baseElement).toHaveTextContent('0011100111010010101101011Další generace!Resetovat');

  fireEvent.click(getByText('Resetovat'));
  expect(baseElement).toHaveTextContent('1001001111000101011010001Další generace!Resetovat');
});
