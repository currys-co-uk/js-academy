import React from "react";

function Dimension(props) {
    return (
        <>
            <div>
                {props.name}: {props.value}
            </div>
            <button onClick={props.decrease}>{"<"}</button>
            <button onClick={props.increase}>{">"}</button>
        </>
    );
}

export default Dimension;
