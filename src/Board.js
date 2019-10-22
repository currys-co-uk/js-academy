import React from "react";
import Row from "./Row.js";
import PropTypes from "prop-types";

const tableStyles = { // inline style attributes for Board
  border: "2px solid white",
  fontStyle: "bold"
};

function Board(props) { // destructuralisation
  return (
    <table style={tableStyles}>
      <tbody>
      {props.boardState.map(function(row, index) {
        return (<Row row={row} key={index} />)
      })}
      </tbody>
    </table>
  )
}

Board.propTypes = {
  boardState: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired
};

export default Board;
