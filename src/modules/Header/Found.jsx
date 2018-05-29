import React from "react";
import { render } from "react-dom";

class Found extends React.Component {

  plural(numbers, one, two) {

  }

  render() {
    let amount;
    if (!this.props.value) {
      amount = 'No';
    } else {
      amount = this.props.value;
    }
    return <div>{amount} {this.props.value === 1 ? 'movie' : 'movies'} found</div>;
  }
}

export default Found;
