import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';

import Search from './Search';
import PlaceContainer from './PlaceContainer';

class App extends Component {
  render() {
    const { places, onClick } = this.props;
    return (
      <div>
        <Search onClick={ (loc) => onClick(loc) } />
        <PlaceContainer placeEntries={places} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.places
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (loc) => {
      dispatch(actions.updatePlaces(loc));
    }
  };
};

App.propTypes = {
  places: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
