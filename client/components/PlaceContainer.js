import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PlaceEntry from './PlaceEntry';
import actions from '../actions/index.js';
import $ from 'jquery';

class PlaceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {id:'loading-container'};
    this.getUserCoord(); //get the user coordinate immediately
  }

  getUserCoord() {
    // console.log('Made it to getUserCoord function');
    // navigator.geolocation.getCurrentPosition(
    //   function(position) {
    //     this.props.userCoord = {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude
          
    //     };
    //     console.log('this.props.userCoord: ', this.props.userCoord);
    //   }, 
    //   function(error) {
    //     console.error(error); 
    //   },
    //   {timeout:10000}
    // );
  }

  sortPlacesBy(attribute) {

    if (attribute === 'rating') {
      this.props.places.sort(function(a, b) {
        return b[attribute] - a[attribute];
      });
    } else if (attribute === 'distance') {
      // Add a new distance property to the places array and sort by distance
      var userCoord = {
        latitude: 37.783768,
        longitude: -122.409039
      };

      // navigator.geolocation.getCurrentPosition(
      //   function(position) {
      //     userCoord = {
      //       latitude: position.coords.latitude,
      //       longitude: position.coords.longitude
      //     };
      //     console.log('User coord inside callback: ', userCoord);

      //   }, 
      //   function(error) {
      //     console.error(error); 
      //   },{timeout:10000});

      // console.log('User coord outside callback: ', userCoord);

      this.props.places.forEach(function(value) {
        var deltaLongitude = value.longitude - userCoord.longitude;
        var deltaLatitute = value.latitude - userCoord.latitude;

        value.distance = Math.sqrt( Math.pow(deltaLongitude, 2) + Math.pow(deltaLatitute, 2) );
      });

      this.props.places.sort(function(a, b) {
        return a[attribute] - b[attribute];
      });

    } else if (attribute === 'name') {
      this.props.places.sort(function(a, b) {
        return a[attribute].charCodeAt(0) - b[attribute].charCodeAt(0);
      });
    }
    // console.log('Sorted places: ', this.props.places);

    this.forceUpdate(); //force component to re-render
  }

  render() {
    return (
      <div>
        <div className='col-2-12'></div>
        <div className='sortPlacesBy'>
          <a className='sort-by-text'>Sort by:    </a>
          <a className='sort-by-link' onClick={this.sortPlacesBy.bind(this, 'rating')}>rating</a>
          <span className='place-entry-link-divider'>&middot;</span>

          <a className='sort-by-link' onClick={this.sortPlacesBy.bind(this, 'distance')}>distance</a>
          <span className='place-entry-link-divider'>&middot;</span>

          <a className='sort-by-link' onClick={this.sortPlacesBy.bind(this, 'name')}>name</a>
        </div>

        <div id='loading-container' className='col-6-12'>
          { 
            this.props.places.map((place, i) => (
              <div>
                <PlaceEntry onSaveClick={this.props.onSaveClick} place={ place } key={i} actions={actions}></PlaceEntry>
              </div>
            ))
          }
        </div>
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
    onSaveClick: (place, user) => {
      $.ajax({
        url: '/api/places/saved',
        method: 'POST',
        data: {user: user, place: place}
      });

      var packaged = place;
      packaged['UserPlace'] = {
        PlaceId: place.googlePlaceId,
        UserId: user.googleUserId,
      }
      dispatch(actions.savePlace(packaged));

    }
  };
};

PlaceContainer.propTypes = {
  places: PropTypes.array.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceContainer);
