import React from "react";
import { render } from "react-dom";
import MovieInfo from "./Movie/WideInfo";
import SearchPage from "./SearchPage";
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

class App extends React.Component {

  state = {};

  componentDidCatch(error, info) {
    this.setState({
        error: {
          type: error,
          info: info
        }
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
          <Route path={path} key={index} component={SearchPage}/>
        ))}

      </Switch>
    </Router>)

  }
}

export default App;
