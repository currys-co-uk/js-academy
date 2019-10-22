import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Row from './Row';

afterEach(cleanup);

it('renders without crashing', () => {
  const row = [0, 0, 1];
  const tableBody = createTableBodyElement();
  ReactDOM.render(<Row row={row}/>, tableBody);
  ReactDOM.unmountComponentAtNode(tableBody);
});

it('contains table row with board state', () => {
  const row = [0, 0, 1];
  const tableBody = createTableBodyElement();
  const {baseElement} = render(
    <Row row={row}/>,
    {
      container: document.body.appendChild(tableBody)
    }
  );

  expect(baseElement).toHaveTextContent('001');
});


function createTableBodyElement() {
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  return tableBody;
}
