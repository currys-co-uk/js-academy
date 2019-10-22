import React from "react";

export default class InputCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: props.row + ' - ' + props.cell,
      row: parseInt(props.row),
      cell : parseInt(props.cell),
      value : 0
    };
    this.onInputChangeCallback = props.onChange;
  }

  render() {
    return (
      <input type="number" name={this.state.name} data-row={this.state.row} data-cell={this.state.cell} min="0" max="1" value={this.state.value} onChange={this.handleOnChange} aria-label="input-cell" />
    )
  }

  handleOnChange = event => {
    event.preventDefault();

    const value = parseInt(event.target.value);

    this.setState(currentState => {
      return {
        ...currentState,
        value: value
      }
    });

    if (this.onInputChangeCallback) {
      this.onInputChangeCallback({
        row : this.state.row,
        cell : this.state.cell,
        value: value
      });
    }
  }
}
