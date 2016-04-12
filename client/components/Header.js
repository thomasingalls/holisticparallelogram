import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class Header extends Component {

  handleClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <header>
        <div className='grid'>
          <h1>SCENIC.NINJA</h1>
          <p>Press the button to find scenic views near your location.</p>
          <button
          onClick={ this.handleClick.bind(this) }
          type="submit">Find Views
          </button>
          <button type="submit">Log Out</button>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Header;
