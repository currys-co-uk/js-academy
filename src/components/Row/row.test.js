import React from 'react';
import TestRenderer from 'react-test-renderer';
import Row from './row';

describe('Test Row component', () => {
    test('Row contains correct number of cells, cells data are correct.', () => {
    const rowData = [0, 1, 0];
    const renderer = TestRenderer.create(<Row rowData={rowData} />);
    const instance = renderer.root;
    const cells = instance.findAllByType('td')
    expect(cells.length).toEqual(3);
    cells.forEach((cell, i) => {
      expect(cell.props.children).toEqual(rowData[i]);
    });
  });
});