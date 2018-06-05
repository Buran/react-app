import React from "react";
import { render } from "react-dom";

class Search extends React.Component {
  render() {
    return <form>Find your movie <input name="search" defaultValue={this.props.value} onChange={this.props.onSearch}/></form>;
  }
}

export default Search;
