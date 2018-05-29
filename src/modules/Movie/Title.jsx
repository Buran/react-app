import React from "react";
import { render } from "react-dom";

class Title extends React.Component {
    render() {
        return <h2>{this.props.info}</h2>;
    }
}

export default Title;
