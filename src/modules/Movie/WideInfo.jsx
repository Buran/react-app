import React from "react";
import { render } from "react-dom";
import { withRouter } from 'react-router';
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import Genre from "./Genre";
import Release from "./Release";
import List from '../Search/List';

class Info extends React.Component {
  state = {};

  searchSameGenre(genres) {
    let qs = [];
    let params = {
      search: genres[0],
      searchBy: 'genre',
      limit: 50
    };

    for (let name in params) {
      if (params.hasOwnProperty(name)) {
        qs.push(name + '=' + encodeURIComponent(params[name]));
      }
    }

    fetch('http://react-cdp-api.herokuapp.com/movies/?' + qs.join('&')).then(data => {
      return data.json();
    }).then(json => {
      json.data = json.data.filter(info => info.id != this.props.id);
      this.setState({
        movies: json
      });
    });

  }

  loadMovieInfo() {
    fetch('http://react-cdp-api.herokuapp.com/movies/' + this.props.id).then(data => {
      return data.json();
    }).then(json => {
      this.setState(json);
      this.searchSameGenre(json.genres);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.loadMovieInfo();
    }
  }

  componentDidMount() {
    this.loadMovieInfo();
  }

  render() {
    if (this.state.id) {
      let info = this.state;
      return <React.Fragment>
        <div><Thumbnail path={info.poster_path}/></div>
        <Title info={info.title}/>
        <Genre info={info.genres.join(', ')}/>
        <Release info={info.release}/>
        {this.state.movies && this.state.movies.total ? <List movies={this.state.movies.data}/> : ''}
      </React.Fragment>;
    }

    return null;
  }
}

export default withRouter(Info);
