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

    // Set the login and logout depending on whether the user is logged in.
    var logInOut;
    if (_.isEmpty(this.props.user)) {
      logInOut = <a className='link' href='/auth/login'>Login</a>;
    } else {
      logInOut = <a className='link' href='/auth/logout'>Logout</a>;
    }

    return (
      <header>
        <nav className='col-12-12'>
          <ul>
            <li>{logInOut}</li>
          </ul>
        </nav>
        <div className='grid'>
          <div className='col-2-12'>
            <img className='ninja' src='./../assets/ninja.svg' />
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
