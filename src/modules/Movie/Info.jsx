import React from "react";
import { render } from "react-dom";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import Genre from "./Genre";
import Release from "./Release";


class Info extends React.Component {

  render() {
    return <React.Fragment>
      <div>
        <Thumbnail info={this.props.info.id}/>
      </div>
      <Title info={this.props.info.title}/>
      <Genre info={this.props.info.genre}/>
      <Release info={this.props.info.release}/>
    </React.Fragment>;
  }
}

export default Info;
