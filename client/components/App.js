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
    const { places, savedPlaces, onFindClick, onSaveClick } = this.props;
    return (
      <div>
        <Header onClick={ (loc) => onFindClick(loc) } />
        <div className='grid'>
          <PlaceContainer onClick={(place) => onSaveClick(place)} placeEntries={places}/>
          <SavedPlaceContainer savedPlaces={savedPlaces}/>
        </div>
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
      var results = [];
      console.log('results (should be array)', results);
      var nextPageToken;
      var minResultCount = 10;
      searchGooglePlaces(function(data) {
        console.log(data);
      });
      // var recursiveSearch = function(nextPageToken) {
      //   console.log('searching');
      //   searchGooglePlaces(function(data) {
      //     console.log.call(console, 'inside search');
      //     results.push(data.places);
      //     nextPageToken = data['next_page_token'];
      //     dispatch(actions.updatePlaces(data.places));
      //     console.log('results length', results.length);
      //     if (results.length < minResultCount) {
      //       console.log(results);
      //       recursiveSearch(nextPageToken);
      //     }
      //   }, nextPageToken);
      // };
      // recursiveSearch(nextPageToken);

    },
    onSaveClick: (place) => {
      $.ajax({
        url: '/api/places/saved',
        dataType: 'json',
        data: JSON.stringify(place) // this doesn't really render yet...
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