import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameOfLife from './GameOfLife';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameOfLife/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders input dimensions as a default state', () => {
  const {getByText} = render(<GameOfLife/>);

  expect(getByText('Zadej počet řádků:')).toBeInTheDocument();
  expect(getByText('Zadej počet sloupců:')).toBeInTheDocument();
});

it('renders input form when input dimensions are specified and submitted', () => {
  const {getByText, getByLabelText, getAllByLabelText} = render(<GameOfLife/>);

  expect(getByText('Zadej počet řádků:')).toBeInTheDocument();
  expect(getByText('Zadej počet sloupců:')).toBeInTheDocument();

  fireEvent.change(getByLabelText('input-dimension-rows'), {target: { value: 3}});
  fireEvent.change(getByLabelText('input-dimension-cells'), {target: { value: 2}});
  fireEvent.click(getByText('Vygeneruj herní plán'));

  const cells = getAllByLabelText('input-cell');

  expect(cells[0]).toBeVisible();
  expect(cells[1]).toBeVisible();
  expect(cells[2]).toBeVisible();
  expect(cells[3]).toBeVisible();
  expect(cells[4]).toBeVisible();
  expect(cells[5]).toBeVisible();
  expect(getByText('Začni Hru!')).toBeInTheDocument();
  expect(getByText('Začni novou hru!')).toBeInTheDocument();
});

it('renders game of life board when input dimensions are specified and initial state is submitted', () => {
  const {getByText, getByLabelText, baseElement} = render(<GameOfLife/>);

  expect(getByText('Zadej počet řádků:')).toBeInTheDocument();
  expect(getByText('Zadej počet sloupců:')).toBeInTheDocument();

  fireEvent.change(getByLabelText('input-dimension-rows'), {target: { value: 3}});
  fireEvent.change(getByLabelText('input-dimension-cells'), {target: { value: 2}});
  fireEvent.click(getByText('Vygeneruj herní plán'));
  fireEvent.click(getByText('Začni Hru!'));

  expect(getByText('Další generace!')).toBeInTheDocument();
  expect(getByText('Resetovat')).toBeInTheDocument();
  expect(getByText('Začni novou hru!')).toBeInTheDocument();
  expect(baseElement).toHaveTextContent('00000Další generace!Resetovat');
});

it('renders initial game of life state when the "Start new game" button is clicked', () => {
  const {getByText, getByLabelText} = render(<GameOfLife/>);

  expect(getByText('Zadej počet řádků:')).toBeInTheDocument();
  expect(getByText('Zadej počet sloupců:')).toBeInTheDocument();

  fireEvent.change(getByLabelText('input-dimension-rows'), {target: { value: 3}});
  fireEvent.change(getByLabelText('input-dimension-cells'), {target: { value: 2}});
  fireEvent.click(getByText('Vygeneruj herní plán'));
  fireEvent.click(getByText('Začni Hru!'));
  fireEvent.click(getByText('Začni novou hru!'));

  expect(getByText('Zadej počet řádků:')).toBeInTheDocument();
  expect(getByText('Zadej počet sloupců:')).toBeInTheDocument();
});
