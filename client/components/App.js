import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';

import Search from './Search';
import ViewContainer from './ViewContainer';

class App extends Component {
  render() {
    const { views, onClick } = this.props;
    return (
      <div>
        <Search onClick={ (loc) => onClick(loc) } />
        <ViewContainer viewEntries={views} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    views: state.views
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (loc) => {
      dispatch(actions.updateViews(loc));
    }
  };
};

App.propTypes = {
  views: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
