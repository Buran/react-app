import React from "react";
import { render } from "react-dom";

class Search extends React.Component {
  render() {
    return <form>Find your movie <input name="search" onChange={this.props.onSearch}/></form>;
  }
}

export default Search;
