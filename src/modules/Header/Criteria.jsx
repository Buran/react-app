import React from "react";
import { render } from "react-dom";

class Criteria extends React.Component {

  state = {
    criteria: this.props.criteria
  }

  onChange(event) {
    this.setState({
      criteria: event.target.value
    });
    this.props.onChange(event.target.value);
  }

  render() {
    return <React.Fragment>Search By
      {
        ['title', 'genres'].map(name => (<label key={name}>
              <input type="radio" value={name} onChange={this.onChange.bind(this)} checked={this.state.criteria === name}/>
              {name}
            </label>)
        )
      }
      </React.Fragment>;
  }
}

export default Criteria;
