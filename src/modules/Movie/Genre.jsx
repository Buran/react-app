import React from "react";
import { render } from "react-dom";

class Genre extends React.Component {
    render() {
        return <em>{this.props.info}</em>;
    }
}

export default Genre;
