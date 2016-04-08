import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import updateViews from '../actions';

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
      dispatch(updateViews(loc));
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
