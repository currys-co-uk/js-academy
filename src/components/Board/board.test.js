import React from 'react';
import TestRenderer from 'react-test-renderer';
import Board from './board';
import Row from '../Row/row';

describe('Test Board component', () => {
    test('Board contains correct number of Rows with correct props', () => {
    const boardData = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    const renderer = TestRenderer.create(<Board boardData={boardData} />);
    const instance = renderer.root;
    const rows = instance.findAllByType(Row)
    expect(rows.length).toEqual(3);
    rows.forEach((row, i) => {
      expect(row.props.rowData).toEqual(boardData[i]);
    });
  });
});