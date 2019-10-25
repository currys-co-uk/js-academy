import React from "react";
import InputRow from './InputRow';
import Button from "./Button";

class InputForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      rows: props.rows,
      cells: props.cells,
      values : this.createEmptyValuesState(props.rows, props.cells)
    };
  }

  createEmptyValuesState(rows, cells) {
    const values = [];
    for (let i=0; i < rows; i++) {
      values[i] = [];
      for (let j=0; j < cells; j++) {
        values[i][j] = 0;
      }
    }

    return values;
  }

  render() {

    const rows = [];

    for (let row=0; row < this.state.rows; row++) {

      rows.push(
        <InputRow key={row} row={row} cells={this.state.cells} onChange={this.handleOnChange} />
      )
    }

    return (
      <form name={this.state.name}>
        <fieldset>
          <table>
            <tbody>
              {rows}
            <tr>
              <td colSpan={this.state.cells}>
                <Button onClick={this.handleFormSubmit} title="Začni Hru!"/>
              </td>
            </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    )
  }

  handleOnChange = event => {
    this.setState(currentState => {
      currentState.values[parseInt(event.row)][parseInt(event.cell)] = event.value;

      return currentState;
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmitted(this.state.values);
  }
}

InputForm.defaultProps = {
  onSubmitted : () => {}
};

export default InputForm;
