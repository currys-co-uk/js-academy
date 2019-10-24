import React from "react";
import Row from "../Row/row";
import styled from 'styled-components';

type BoardData = {
  boardData: Array<Array<number>>
}

const StyledTable = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  margin-right: 0.5em;
  margin-top: 1em;
`

const Board = ({ boardData }: BoardData) => {
  return (
    <StyledTable data-testid="board_table">
      <tbody>
        {boardData.map((row, rowNumber) => <Row key={rowNumber} rowData={row} />  )}
      </tbody>
    </StyledTable>
  )
}

export default Board;