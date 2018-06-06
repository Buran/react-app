import React from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
import NoResult from './Search/NoResult';
import List from './Search/List';
import Search from './Header/Search';
import Criteria from './Header/Criteria';
import Found from './Header/Found';

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      criteria: 'title',
      search: props.match.params.search || '',
      movies: []
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      error: {
        type: error,
        info: info
      }
    });
  }

  search(event) {
    console.log(event.target.value)
    const search = event.target.value;
    this.props.history.push('/search/' + search + '/');

    if (search === 'stop-word') {
      throw new Error('You entered a word from stop list, application crashed!');
    }

    this.setState({
      search: search
    });
    this.searchMovies();
  }

  setCriteria(value) {
    console.log(this.state)
    this.setState({
      criteria: value
    });
    this.searchMovies();
  }

  searchMovies() {
    if (!this.state.search) {
      this.setState({
        movies: []
      });
      return;
    }

    let qs = [];
    let params = {
      search: this.state.search,
      searchBy: this.state.criteria,
      limit: 50
    };

    this.loading = true;

    for (let name in params) {
      if (params.hasOwnProperty(name)) {
        qs.push(name + '=' + encodeURIComponent(params[name]));
      }
    }

    fetch('http://react-cdp-api.herokuapp.com/movies/?' + qs.join('&')).then(data => {
      return data.json();
    }).then(json => {
      this.loading = false;
      console.log(json);
      this.setState({
        movies: json
      });
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.search !== nextState.search || this.state.criteria !== nextState.criteria;
  // }
  componentDidMount() {
    this.searchMovies();
  }

  render() {
    if (this.state.error) {
      return <React.Fragment>Something went wrong.</React.Fragment>
    }

    return (<React.Fragment>
      <Search onSearch={this.search.bind(this)} value={this.state.search}/>
      <Criteria criteria={this.state.criteria} onChange={this.setCriteria.bind(this)} />
      <Found value={this.state.movies && this.state.movies.total}/>
      {this.state.movies && this.state.movies.total ? <List movies={this.state.movies.data}/> : <NoResult/>}
    </React.Fragment>)

  }
}

export default withRouter(SearchPage);
