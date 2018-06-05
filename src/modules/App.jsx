import React from "react";
import { render } from "react-dom";
import NoResult from "./Search/NoResult";
import List from "./Search/List";
import Search from "./Header/Search";
import Criteria from "./Header/Criteria";
import Found from "./Header/Found";
import MovieInfo from "./Movie/WideInfo";
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

class App extends React.Component {
  movies = [];

  state = {
    criteria: 'title',
    search: ''
  };

  componentDidCatch(error, info) {
    this.setState({
        error: {
          type: error,
          info: info
        }
    });
  }

  search(history, event) {
    const search = event.target.value;
    history.push('/search/' + search + '/');

    if (search === 'stop-word') {
      throw new Error('You entered a word from stop list, application crashed!');
    }

    this.setState({
      search: search
    });
  }

  setCriteria(value) {
    this.setState({
      criteria: value
    });
  }

  componentDidMount() {
    this.loading = true;
    let qs = [];
    let params = {
      search: this.state.search,
      searchBy: this.state.criteria,
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
      this.loading = false;
      console.log(json)
      this.setState({
        movies: json
      })
      this.movies = json;
    });
  }

  render() {
    if (this.state.error) {
        return <React.Fragment>Something went wrong.</React.Fragment>
    }

    return (<Router>
      <Switch>

        <Route exact path="/film/:id/" render={props => (<React.Fragment>
            <div><NavLink to="/">Search</NavLink></div>
            <MovieInfo id={props.match.params.id}/>
          </React.Fragment>
        )}/>

        {['/search/:search/', '/search/', '/'].map((path, index) => (
          <Route path={path} key={index} render={props => (
            <React.Fragment>
              <Search onSearch={this.search.bind(this, props.history)} val={props.match.params.search || ''}/>
              <Criteria criteria={this.state.criteria} onChange={this.setCriteria.bind(this)} />
              <Found value={this.movies.length}/>
              {this.movies.length ? <List movies={this.movies}/> : <NoResult/>}
            </React.Fragment>
          )}/>
        ))}

      </Switch>
    </Router>)

  }
}

export default App;
