import React from 'react';
import { connect } from 'react-redux';
import updateViews from '../actions';

import Search from './Search';
import ViewContainer from './ViewContainer';

const mapStateToProps = (state) => {
  return {
    views: state.views
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEnter: (loc) => {
      dispatch(updateViews(loc));
    }
  };
};

App.propTypes = {
  views: PropTypes.array.isRequired,
  onEnter: PropTypes.func.isRequired
};

class App extends React.Component {
  render() {
    const { views, onEnter } = this.props;
    return (
      <div>
        <Search onEnter={ (loc) => onEnter(loc) } />
        <ViewContainer viewEntries={views} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
