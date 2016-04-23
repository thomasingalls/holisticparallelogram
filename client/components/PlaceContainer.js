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
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll.bind(this));
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll.bind(this));
  // }

  // handleScroll(event) {
  //   let scrollTop = event.srcElement.body.scrollTop;
  //   if (scrollTop > 280) {
  //     event.preventDefault();
  //     this.setState({id: 'loading-container'});
  //   } else {
  //     this.setState({id: 'loading-container'});
  //   }
  // }

  /* Uncomment this to test code as necessary */
  // setDummyPlaces() {
  //   this.props.places = 
  //      [ { name: 'Louis\' Restaurant',
  //          address: '902 Point Lobos Ave, San Francisco, CA 94121, United States',
  //          googlePlaceId: 'ChIJtd6mCbWHhYARIo8wsDGnrYs',
  //          lat: 37.7792657,
  //          lng: -122.512765,
  //          url: 'https://farm8.staticflickr.com/7072/7294435744_a50f8efaeb.jpg' },
  //        { name: 'Hana Zen',
  //          address: 'PIER 39, M209, San Francisco, CA 94133, United States',
  //          googlePlaceId: 'ChIJHSGzi_yAhYAR9JTvMsplz0Q',
  //          lat: 37.8111411,
  //          lng: -122.410579,
  //          url: 'https://farm9.staticflickr.com/8371/8501523416_1d51b23d04.jpg' },
  //        { name: 'Sutro’s',
  //          address: '1090 Point Lobos Ave, San Francisco, CA 94121, United States',
  //          googlePlaceId: 'ChIJ7dtznbWHhYARpQcOH3G6-xA',
  //          lat: 37.77843129999999,
  //          lng: -122.513982,
  //          url: 'https://farm5.staticflickr.com/4085/5001992834_892b6f3150.jpg' } 
  //      ];
  // }

  sortPlacesBy(attribute) {

    if (attribute === 'rating') {
      this.props.places.sort(function(a, b) {
        return b[attribute] - a[attribute];
      });
    } else if (attribute === 'distance') {
      // Add a new distance property to the places array and sort by distance
      var currCoord = {
        lat: 37.783753,
        lng: -122.409039
      };

      this.props.places.forEach(function(value) {
        var deltaLng = value.lng - currCoord.lng;
        var deltaLat = value.lat - currCoord.lat;

        value.distance = Math.sqrt( Math.pow(deltaLng, 2) + Math.pow(deltaLat, 2) );
        console.log('Value: ', value);
      });

      this.props.places.sort(function(a, b) {
        return a[attribute] - b[attribute];
      });

    } else if (attribute === 'name') {
      this.props.places.sort(function(a, b) {
        return a[attribute].charCodeAt(0) - b[attribute].charCodeAt(0);
      });
    }
    console.log('Sorted places: ', this.props.places);

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
