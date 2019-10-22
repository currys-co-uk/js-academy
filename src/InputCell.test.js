import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputCell from './InputCell';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputCell row="0" cell="0" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('contains input field with default value', () => {
  const {getByLabelText} = render(<InputCell row="0" cell="0" />);

  expect(getByLabelText('input-cell')).toHaveValue(0);
});

it('triggers the callback passed in props when the input value is changed', () => {
  const onChange = jest.fn();
  const {getByLabelText} = render(<InputCell row="0" cell="0" onChange={onChange} />);

  fireEvent.change(getByLabelText('input-cell'), {target: { value: 1}});

  expect(onChange).toHaveBeenCalled();
  expect(getByLabelText('input-cell')).toHaveValue(1);
});

it('triggers the callback with appropriate value passed in props when the input value is changed', () => {
  const onChange = function (event) {
    expect(event).toStrictEqual({row : 0, cell : 1, value: 1});
  };

  const {getByLabelText} = render(<InputCell row="0" cell="1'" onChange={onChange} />);

  fireEvent.change(getByLabelText('input-cell'), {target: { value: 1}});

  expect(getByLabelText('input-cell')).toHaveValue(1);
});

