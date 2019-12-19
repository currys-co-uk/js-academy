import React from "react";

class Control extends React.Component {
    render() {
        return (
            <div>
                <button
                    onClick={() => {
                        this.props.nextIteration();
                    }}
                >
                    {"Next >>"}
                </button>
                <button
                    onClick={() => {
                        this.props.reset();
                    }}
                >
                    {"Reset"}
                </button>
                <button
                    onClick={() => {
                        this.props.play();
                    }}
                >
                    {"Play"}
                </button>
                <button
                    onClick={() => {
                        this.props.stop();
                    }}
                >
                    {"Stop"}
                </button>
            </div>
        );
    }
}

export default Control;
