import React from "react";
import Dimension from "./Dimension.js"

function Setup(props) {
    return (
        <div className="setup">
            <div>Dimensions:</div>
            <Dimension
                name="Rows"
                value={props.rows}
                increase={() => props.increaseRow()}
                decrease={() => props.decreaseRow()}
            />

            <Dimension
                name="Columns"
                value={props.columns}
                increase={() => props.increaseColumn()}
                decrease={() => props.decreaseColumn()}
            />
        </div>
    );
}

export default Setup;
