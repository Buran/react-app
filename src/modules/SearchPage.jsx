import React from 'react';
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
      search: '',
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
    const search = event.target.value;
    this.props.history.push(search ? ('/search/' + search + '/') : '');

    if (search === 'stop-word') {
      throw new Error('You entered a word from stop list, application crashed!');
    }

    this.searchMovies(search, this.state.criteria);
  }

  setCriteria(value) {
    console.log(value)
    this.searchMovies(this.state.search, value);
  }

  searchMovies(search, criteria) {
    if (!search) {
      this.setState({
        search: '',
        criteria: criteria,
        movies: { total: 0 }
      });
      return;
    }

    let qs = [];
    let params = {
      search: search,
      searchBy: criteria,
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
      this.setState({
        search: search,
        criteria: criteria,
        movies: json
      });
    });
  }

  componentDidMount() {
    this.searchMovies(this.props.match.params.search, this.state.criteria);
  }

  render() {
    if (this.state.error) {
      return <React.Fragment>Something went wrong.</React.Fragment>
    }

    return (<React.Fragment>
      <Search onSearch={this.search.bind(this)} value={this.props.match.params.search}/>
      <Criteria criteria={this.state.criteria} onChange={this.setCriteria.bind(this)} />
      <Found value={this.state.movies && this.state.movies.total}/>
      {this.state.movies && this.state.movies.total ? <List movies={this.state.movies.data}/> : <NoResult/>}
    </React.Fragment>)

  }
}

export default withRouter(SearchPage);
