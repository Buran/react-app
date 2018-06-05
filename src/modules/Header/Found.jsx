import React from "react";
import { render } from "react-dom";

class Found extends React.Component {

  plural(numbers, one, two) {

  }

  render() {
    let amount;
    if (!this.props.value) {
      return null;
    }
    return <div>{this.props.value} {this.props.value === 1 ? 'movie' : 'movies'} found</div>;
  }
}

export default Found;
