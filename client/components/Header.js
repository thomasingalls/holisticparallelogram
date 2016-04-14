import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';

class Header extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.onFindClick();
  }

  render() {

    // Create the navigation element here. If there is no user logged in, then display a
    // login button. Otherwise, display the logout and saved places buttons.
    var nav;
    if (_.isEmpty(this.props.user)) {
      nav =
        <ul><li><a className='link' href='/auth/login'>Login</a></li></ul>;
    } else {
      nav =
        <ul>
          <li><a className='link'>My Saved Places</a></li>
          <li><a className='link' href='/auth/logout'>Logout</a></li>
        </ul>;
    }

    return (
      <header>
        <nav className='col-12-12'>
          {nav}
        </nav>
        <div className='grid'>
          <div className='col-2-12'>
            <object type='image/svg+xml' className='ninja' data='./../assets/ninja.svg' />
          </div>
          <div className='col-10-12'>
            <h1>SCENIC<span className='black'>.NINJA</span></h1>
            <p className='description'>After years spent scouring Google Places, Scenic Ninja is ready to share his wisdom with you.</p>
            <button
            onClick={ this.handleClick.bind(this) }
            type="submit">Find Views
            </button>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  onFindClick: PropTypes.func.isRequired
};

export default Header;
