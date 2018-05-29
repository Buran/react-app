import React from "react";
import { render } from "react-dom";
import NoResult from "./Search/NoResult";
import List from "./Search/List";
import Search from "./Header/Search";
import Criteria from "./Header/Criteria";
import Found from "./Header/Found";
import MovieInfo from "./Movie/Info";
import movies from "../data/movies.json";

class App extends React.Component {
  state = {
    currentMovie: 4,
    movies: movies,
    criteria: 'title',
    search: ''
  }

  componentDidCatch(error, info) {
    this.setState({
        error: {
          type: error,
          info: iinfo
        }
    });
  }

  search(event) {
    const search = event.target.value;

    if (search === 'stop-word') {
      throw new Error('You entered a word from stop list, application crashed!');
    }

    this.setState({
      search: search,
      movies: movies.filter(info => info[this.state.criteria].toLowerCase().indexOf(search.toLowerCase()) !== -1)
    });
  }

  setCriteria(value) {
    this.setState({
      criteria: value,
      movies: movies.filter(info => info[value].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
    });
  }

  followMainPage() {
    this.setState({
      currentMovie: false
    });
  }

  render() {
    if (this.state.error) {
        return <React.Fragment>Something went wrong.</React.Fragment>
    }

    if (this.state.currentMovie) {
      const movieInfo = movies.reduce((prev, curr) => (curr.id === this.state.currentMovie) ? curr : prev);
      return <React.Fragment>
          <div onClick={this.followMainPage.bind(this)}>Search</div>
          <MovieInfo info={movieInfo}/>
          <List movies={movies.filter(info => info.genre === movieInfo.genre && info.id !== movieInfo.id)}/>
        </React.Fragment>
    }

    return <React.Fragment>
        <Search onSearch={this.search.bind(this)} />
        <Criteria criteria={this.state.criteria} onChange={this.setCriteria.bind(this)} />
        <Found value={this.state.movies.length}/>
        <List movies={this.state.movies}/>
      </React.Fragment>;
  }
}

export default App;
