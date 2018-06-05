import React from "react";
import { render } from "react-dom";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import Genre from "./Genre";
import Release from "./Release";
import movies from "../../data/movies.json";

class Info extends React.Component {
  state = {};

  componentWillMount() {
    this.loading = true;
    fetch('http://react-cdp-api.herokuapp.com/movies/' + this.props.id).then(data => {
      return data.json();
    }).then(json => {
      this.loading = false;
      this.setState({data: json});
    });
  }

  componentWillUnmount() {
    //cancel request
  }

  render() {
    if (this.state.data) {
      let info = this.state.data[0];
      console.log(info)
      return <React.Fragment>
        <div><Thumbnail path={info.poster_path}/></div>
        <Title info={info.title}/>
        <Genre info={info.genres.join(', ')}/>
        <Release info={info.release}/>
      </React.Fragment>;
    }

    return null;
  }
}

export default Info;
