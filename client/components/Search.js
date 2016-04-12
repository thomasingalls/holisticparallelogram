import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class Search extends Component {

  handleClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <div>
        <h1>SCENIC.NINJA</h1>
        <p>Press the button to find scenic views near your location.</p>
        <button
          onClick={ this.handleClick.bind(this) }
          type="submit">Find Views
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Search;
