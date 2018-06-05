import React from "react";
import { render } from "react-dom";

class Thumbnail extends React.Component {
    render() {
      return <img src={this.props.path} width="175"/>;
    }
}

export default Thumbnail;
