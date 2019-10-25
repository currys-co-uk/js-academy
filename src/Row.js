import React from "react";

export default class Row extends React.PureComponent {
  render() {
    return (
      <tr>
        {this.props.row.map(function (cell, index) {
          return (
            <td className="cell" key={index}>{cell}</td> // variable is used in accessed with braces {}
          )
        })}
      </tr>
    )
  }
}
