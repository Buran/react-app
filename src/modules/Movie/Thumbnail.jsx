import React from "react";
import { render } from "react-dom";
import PropTypes from 'prop-types';

class Thumbnail extends React.Component {
    render() {
      const src = `/${this.props.info}.png`;
      return <img src={src} width="175" height="254"/>;
    }
}

Thumbnail.propTypes = {
    info: PropTypes.number
};

export default Thumbnail;
