import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputForm from './InputForm';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('does not contain any input field when cells are set to zero', () => {
  const {queryByLabelText} = render(<InputForm name="input-form" cells={0} rows={0}/>);

  expect(queryByLabelText('input-cell')).toBeNull();
});

it('contains submit button with a defined text', () => {
  const {baseElement} = render(<InputForm name="input-form" cells={0} rows={0}/>);

  expect(baseElement).toHaveTextContent('Začni Hru!');
});


it('contain exactly 9 input fields when cells are set to 3 and rows to 3', () => {
  const {queryAllByLabelText} = render(<InputForm name="input-form" cells={3} rows={3}/>);

  expect(queryAllByLabelText('table-row')).toHaveLength(3);
  expect(queryAllByLabelText('table-cell')).toHaveLength(9);
  expect(queryAllByLabelText('input-cell')).toHaveLength(9);
});

it('contain exactly 20 input fields when cells are set to 4 and rows to 5', () => {
  const {queryAllByLabelText} = render(<InputForm name="input-form" cells={4} rows={5}/>);

  expect(queryAllByLabelText('table-row')).toHaveLength(5);
  expect(queryAllByLabelText('table-cell')).toHaveLength(20);
  expect(queryAllByLabelText('input-cell')).toHaveLength(20);
});

it('contains input field with default value based on the cells attribute', () => {
  const {getByLabelText} = render(<InputForm name="input-form" cells={1} rows={1}/>);

  expect(getByLabelText('input-cell')).toHaveValue(0);
});

it('triggers the callback passed values of all inputs in props when the submit button is clicked', () => {
  const onSubmitted = function(values) {
    expect(values).toStrictEqual([[0]]);
  };

  const {getByText} = render(<InputForm name="input-form" cells={1} rows={1} onSubmitted={onSubmitted} />);

  fireEvent.click(getByText('Začni Hru!'));
});

it('triggers the callback passed values of all inputs in props for bigger board when submit button is clicked', () => {
  const onSubmitted = function(values) {
    expect(values).toStrictEqual(
      [
        [0, 0, 0],
        [0, 0, 0]
      ]
    );
  };

  const {getByText} = render(<InputForm name="[0]" cells={3} rows={2} onSubmitted={onSubmitted} />);

  fireEvent.click(getByText('Začni Hru!'));
});

it('triggers the callback passed values of all inputs when one input has been changed in props for bigger board when submit button is clicked', () => {
  const onSubmitted = function(values) {
    expect(values).toStrictEqual(
      [
        [0, 0, 0],
        [1, 0, 0]
      ]
    );
  };

  const {getByText, container} = render(<InputForm name="[0]" cells={3} rows={2} onSubmitted={onSubmitted} />);

  fireEvent.change(container.querySelector('[data-row="1"][data-cell="0"]'), {target: { value: 1}});
  fireEvent.click(getByText('Začni Hru!'));
});


it('triggers the callback passed values of all inputs when multiple inputs have been changed in props for bigger board when submit button is clicked', () => {
  const onSubmitted = function(values) {
    expect(values).toStrictEqual(
      [
        [0, 0, 0],
        [1, 1, 1]
      ]
    );
  };

  const {getByText, container} = render(<InputForm name="[0]" cells={3} rows={2} onSubmitted={onSubmitted} />);

  fireEvent.change(container.querySelector('[data-row="1"][data-cell="0"]'), {target: { value: 1}});
  fireEvent.change(container.querySelector('[data-row="1"][data-cell="1"]'), {target: { value: 1}});
  fireEvent.change(container.querySelector('[data-row="1"][data-cell="2"]'), {target: { value: 1}});
  fireEvent.change(container.querySelector('[data-row="0"][data-cell="0"]'), {target: { value: 1}});
  fireEvent.change(container.querySelector('[data-row="0"][data-cell="0"]'), {target: { value: 0}});

  fireEvent.click(getByText('Začni Hru!'));
});

