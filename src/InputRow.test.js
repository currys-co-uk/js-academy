import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputRow from './InputRow';
import InputCell from './InputCell';

afterEach(cleanup);

it('renders without crashing', () => {
  const tableBody = createTableBodyElement();
  ReactDOM.render(<InputRow />, tableBody);
  ReactDOM.unmountComponentAtNode(tableBody);
});

it('does not contain any input field when cells are set to zero', () => {
  const tableBody = createTableBodyElement();

  const {queryByLabelText} = render(<InputRow name="[0]" cells={0}/>, {
    container : document.body.appendChild(tableBody)
  });

  expect(queryByLabelText('input-cell')).toBeNull();
});

it('contain exactly 3 input fields when cells are set to 3', () => {
  const tableBody = createTableBodyElement();

  const {queryAllByLabelText} = render(<InputRow row="0" cells={3}/>, {
    container : document.body.appendChild(tableBody)
  });

  expect(queryAllByLabelText('input-cell')).toHaveLength(3);
});

it('contains input field with default value based on the cells attribute', () => {
  const tableBody = createTableBodyElement();

  const {getByLabelText} = render(<InputRow row="0" cells={1}/>, {
    container : document.body.appendChild(tableBody)
  });

  expect(getByLabelText('input-cell')).toHaveValue(0);
});

it('triggers the callback passed in props when the underlying input value is changed', () => {
  const onChange = jest.fn();
  const tableBody = createTableBodyElement();
  const {getByLabelText} = render(<InputRow row="0" cells={1} onChange={onChange} />, {
    container : document.body.appendChild(tableBody)
  });

  fireEvent.change(getByLabelText('input-cell'), {target: { value: 1}});

  expect(onChange).toHaveBeenCalled();
  expect(getByLabelText('input-cell')).toHaveValue(1);
});

it('triggers the callback with appropriate value passed in props when the input value is changed', () => {
  const onChange = function (event) {
    expect(event).toStrictEqual({row : 0, cell: 0, value: 1});
  };

  const tableBody = createTableBodyElement();
  const {getByLabelText} = render(<InputRow row="0" cells={1} onChange={onChange} />, {
    container : document.body.appendChild(tableBody)
  });

  fireEvent.change(getByLabelText('input-cell'), {target: { value: 1}});

  expect(getByLabelText('input-cell')).toHaveValue(1);
});

function createTableBodyElement() {
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  return tableBody;
}

