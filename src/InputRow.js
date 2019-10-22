import React from "react";
import InputCell from './InputCell';

export default class InputRow extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      row: props.row,
      cells : props.cells,
    };

    this.onInputCellChangeCallback = this.props.onChange;
  }

  render() {

    const cells = [];

    for (let cell=0; cell < this.state.cells; cell++) {
      cells.push(
        <td key={"row-" + this.state.row + "-" + cell} aria-label="table-cell">
          <InputCell key={this.state.row + "-" + cell} row={this.state.row} cell={cell} onChange={this.onInputCellChangeCallback}/>
        </td>
      )
    }

    return (
      <tr aria-label="table-row" >
        {cells}
      </tr>
    )
  }
}
