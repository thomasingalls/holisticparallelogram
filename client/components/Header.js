import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Header extends Component {

  handleClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <header>
        <div className='grid'>
          <div className='col-2-12'>
            <object type='image/svg+xml' className='ninja' data='./../assets/ninja.svg' />
          </div>
          <div className='col-10-12'>
            <h1>SCENIC<span className='black'>.NINJA</span></h1>
            <p>Press the button to find scenic views near your location.</p>
            <button
            onClick={ this.handleClick.bind(this) }
            type="submit">Find Views
            </button>
            <a className='logout' href='/auth/logout'>Logout</a>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Header;
