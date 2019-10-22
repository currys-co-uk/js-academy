import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Board from './Board';

afterEach(cleanup);


it('renders without crashing', () => {
  const boardState = [[0, 1, 0], [1, 0, 1], [1, 1, 0]];
  const div = document.createElement('div');
  ReactDOM.render(<Board boardState={boardState}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('contains table with board state', () => {
  const boardState = [[0, 1, 0], [1, 0, 1], [1, 1, 0]];
  const {baseElement} = render(
    <Board boardState={boardState}/>
  );

  expect(baseElement).toHaveTextContent('010101110');
});
