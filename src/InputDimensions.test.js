import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputDimensions from './InputDimensions';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputDimensions />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('contains input fields with default value', () => {
  const {getByLabelText} = render(<InputDimensions />);

  expect(getByLabelText('input-dimension-rows')).toHaveValue(0);
  expect(getByLabelText('input-dimension-cells')).toHaveValue(0);
});

it('contains input field labels', () => {
  const {getByText} = render(<InputDimensions />);

  expect(getByText('Zadej počet řádků:')).toBeInTheDocument();
  expect(getByText('Zadej počet sloupců:')).toBeInTheDocument();
});

it('triggers the callback passed in props when the submit button is clicked', () => {
  const onChange = jest.fn();
  const {getByText} = render(<InputDimensions onSubmitted={onChange} />);

  fireEvent.click(getByText('Vygeneruj herní plán'));

  expect(onChange).toHaveBeenCalled();
});

it('triggers the callback passed with changed value when inputs have been changed and the submit button is clicked', () => {
  const onChange = function (event) {
    expect(event).toStrictEqual({cells: 4, rows: 5});
  };

  const {getByText, getByLabelText} = render(<InputDimensions onSubmitted={onChange} />);

  fireEvent.change(getByLabelText('input-dimension-rows'), {target: { value: 5}});
  fireEvent.change(getByLabelText('input-dimension-cells'), {target: { value: 4}});

  fireEvent.click(getByText('Vygeneruj herní plán'));
});
