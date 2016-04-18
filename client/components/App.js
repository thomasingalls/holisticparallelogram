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
      // Append the body with loading spinner and text
      var ele = '<div id="spinner">Ninjas are scouting for your views...</div>';
      var gif = '<img id="spin-gif" src="../assets/spiffygif_36x36.gif">';
      $('#target').append(ele);
      $('#target').append(gif);
      searchGooglePlaces(function(data) {
        // Remove loading spinner and text now that places have been returned
        $('#spinner').remove();
        $('#spin-gif').remove();
        dispatch(actions.updatePlaces(data.places));
      });
    },
    onSaveClick: (place, user) => {
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
