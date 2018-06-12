import React from 'react';

class Search extends React.Component {
  componentDidMount(){
    this.input.focus();
  }

  render() {
    return <form>Find your movie <input name="search"
                                        defaultValue={this.props.value}
                                        onChange={this.props.onSearch}
                                        ref={(input) => { this.input = input; }} />
    </form>;
  }
}

export default Search;
