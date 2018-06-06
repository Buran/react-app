import React from "react";
import { render } from "react-dom";
import MovieInfo from "../Movie/Info";

class List extends React.Component {

  render() {
    return <ol>{this.props.movies.map(info => (<li key={info.id}><MovieInfo info={info}/></li>))}</ol>;
  }
}

export default List;
