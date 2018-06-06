import React from "react";
import { render } from "react-dom";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import Genre from "./Genre";
import Release from "./Release";
import { NavLink } from 'react-router-dom';

class Info extends React.Component {

  render() {
      let info = this.props.info;

      return (<React.Fragment>
        <div>
          <NavLink to={{ pathname: `/film/${info.id}/`}}>
            <Thumbnail path={info.poster_path}/>
          </NavLink>
        </div>
        <Title info={info.title}/>
        <Genre info={info.genres.join(', ')}/>
        <Release info={info.release}/>
      </React.Fragment>);
  }
}

export default Info;
