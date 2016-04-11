import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class Search extends Component {

  handleClick(e) {
    e.preventDefault();
    var loc = {
      latitude: 37.774929, // Replace hardcoded loc with browser loc
      longitude: -122.419416
    };
    this.props.onClick(loc);
  }

  render() {
    return (
      <form>
        <div id='header'>
          <h1>Welcome to View Finder</h1>
          <p>Press the button to find scenic views near your location.</p>
        </div>
        <button
          onClick={ this.handleClick.bind(this) }
          type="submit">Find Views
        </button>
      </form>
    );
  }
}

Search.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Search;
