import React from "react";
import Button from "./Button";

class InputDimensions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rows: 0,
      cells: 0,
    };

    this.onFormCompleted = props.onSubmitted;
  }

  onRowsChanged = event => {
    event.preventDefault();

    const value = parseInt(event.target.value);

    this.setState(currentState => {
      return {
        ...currentState,
        rows: value
      }
    });

  };

  onCellsChanged = event => {
    event.preventDefault();

    const value = parseInt(event.target.value);

    this.setState(currentState => {
      return {
        ...currentState,
        cells: value
      }
    });
  };

  onFormSubmitted = event => {
    event.preventDefault();

    if (this.onFormCompleted) {
      this.onFormCompleted({
        rows: this.state.rows,
        cells: this.state.cells
      });
    }
  };

  render() {
    return (<div>
      <form>
        <fieldset>
          <label htmlFor="input-dimension-rows">Zadej počet řádků: </label>
          <input type="number" min="0" max="10" id="input-dimension-rows" key="rows" name="rows" aria-label="input-dimension-rows" value={this.state.rows} onChange={this.onRowsChanged}/>
          <br/>
          <label htmlFor="input-dimension-cells">Zadej počet sloupců: </label>
          <input type="number" min="0" max="10" key="cells" name="cells" aria-label="input-dimension-cells" value={this.state.cells} onChange={this.onCellsChanged}/>
          <br/>
          <Button title="Vygeneruj herní plán" onClick={this.onFormSubmitted} />
        </fieldset>
      </form>
    </div>)
  }
}

export default InputDimensions;
