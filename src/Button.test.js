import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('passes button title from props', () => {
  const {baseElement} = render(
    <Button title="Click me!"/>
  );

  expect(baseElement).toHaveTextContent('Click me!');
});
