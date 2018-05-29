import React from "react";
import { render } from "react-dom";

class Release extends React.Component {
    render() {
        return <strong>{this.props.info}</strong>;
    }
}

export default Release;
