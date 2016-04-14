import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';

import Header from './Header';
import PlaceContainer from './PlaceContainer';
import SavedPlaceContainer from './SavedPlaceContainer';
import searchGooglePlaces from '../utils/searchGooglePlaces.js';
import $ from 'jquery';

class App extends Component {
  render() {
    const { places, savedPlaces, user, onFindClick, onSaveClick } = this.props;
    return (
      <div>
        <Header
          user={user}
          onFindClick={ (loc) => onFindClick(loc) } />
        <div className='grid'>
          <PlaceContainer onSaveClick={(place, user) => onSaveClick(place, user)} placeEntries={places}/>
          <SavedPlaceContainer savedPlaces={savedPlaces}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.places,
    savedPlaces: state.savedPlaces,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFindClick: () => {
      searchGooglePlaces(function(data) {
        dispatch(actions.updatePlaces(data.places));
      });
    },
    onSaveClick: (place, user) => {
      console.log(user);
      $.ajax({
        url: '/api/places/saved',
        method: 'POST',
        data: {user: user, place: place}
      });
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
