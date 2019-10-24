import React from "react";
import styled from 'styled-components';

type RowData = {
  rowData: Array<number>
};

const StyledCell = styled.td`
  border: 1px solid black;
  padding: 1em;
`

const Row = ({ rowData }: RowData) => {
  return (
    <tr>
      {rowData.map((cellState: number, cellNumber: number) => {
        return (
          <StyledCell key={cellNumber}>
            {cellState}
          </StyledCell>
        );
      })}
    </tr>
  )
}

export default Row;