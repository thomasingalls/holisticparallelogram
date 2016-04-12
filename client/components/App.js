import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';

import Search from './Search';
import PlaceContainer from './PlaceContainer';
import SavedPlaceContainer from './SavedPlaceContainer';
import searchGooglePlaces from '../utils/searchGooglePlaces.js';

class App extends Component {
  render() {
    const { places, savedPlaces, onFindClick, onSaveClick } = this.props;
    return (
      <div>
        <Search onClick={ (loc) => onFindClick(loc) } />
        <PlaceContainer placeEntries={places}/>
        <SavedPlaceContainer savedPlaces={savedPlaces}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.places,
    savedPlaces: state.savedPlaces
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFindClick: () => {
      searchGooglePlaces(function(data) {
        dispatch(actions.updatePlaces(data.places));
      });
    },
    onSaveClick: (place) => {
      dispatch(actions.savePlace(place));
    }
  };
};

App.propTypes = {
  places: PropTypes.array.isRequired,
  savedPlaces: PropTypes.array.isRequired,
  onFindClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
