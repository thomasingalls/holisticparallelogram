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

  setDummyPlaces() {
    this.props.places = 
       [ { name: 'Louis\' Restaurant',
           address: '902 Point Lobos Ave, San Francisco, CA 94121, United States',
           googlePlaceId: 'ChIJtd6mCbWHhYARIo8wsDGnrYs',
           lat: 37.7792657,
           lng: -122.512765,
           url: 'https://farm8.staticflickr.com/7072/7294435744_a50f8efaeb.jpg' },
         { name: 'Hana Zen',
           address: 'PIER 39, M209, San Francisco, CA 94133, United States',
           googlePlaceId: 'ChIJHSGzi_yAhYAR9JTvMsplz0Q',
           lat: 37.8111411,
           lng: -122.410579,
           url: 'https://farm9.staticflickr.com/8371/8501523416_1d51b23d04.jpg' },
         { name: 'Port View Park',
           address: '7th St, Oakland, CA 94607, United States',
           googlePlaceId: 'ChIJOZ-ygd1_hYARqKy_gKoK8dQ',
           lat: 37.8055566,
           lng: -122.3332487,
           url: 'https://farm6.staticflickr.com/5042/5345109103_005ec5b7da.jpg' },
         { name: 'The Caprice',
           address: '2000 Paradise Dr, Tiburon, CA 94920, United States',
           googlePlaceId: 'ChIJexdCzH6EhYAR0NobIKKFfyg',
           lat: 37.8721968,
           lng: -122.4504067,
           url: 'https://farm9.staticflickr.com/8084/8315550038_a396b6e1b1.jpg' },
         { name: 'Fog Harbor Fish House',
           address: '39 Pier 39 Concourse, San Francisco, CA 94133, United States',
           googlePlaceId: 'ChIJHSGzi_yAhYARptfivXk-Qlo',
           lat: 37.80898699999999,
           lng: -122.41026,
           url: 'https://farm5.staticflickr.com/4008/4327948137_ff180847c3.jpg' },
         { name: 'Leatherneck Steakhouse',
           address: '609 Sutter St, San Francisco, CA 94102, United States',
           googlePlaceId: 'ChIJgzCJeY6AhYARTA0ae8nAwh0',
           lat: 37.7887585,
           lng: -122.4105466,
           url: 'https://farm6.staticflickr.com/5054/5533672694_0518216149.jpg' },
         { name: 'Butterfly Restaurant',
           address: 'Pier 33, The Embarcadero, San Francisco, CA 94133, United States',
           googlePlaceId: 'ChIJucz6Vl6AhYARxadnREn6w3c',
           lat: 37.8068226,
           lng: -122.4054098,
           url: 'https://farm7.staticflickr.com/6070/6066150462_74f5b831be.jpg' },
         { name: 'Beach Chalet Brewery & Restaurant',
           address: '1000 Great Hwy, San Francisco, CA 94121, United States',
           googlePlaceId: 'ChIJ1ShzE7mHhYARnIi1rffKeVc',
           lat: 37.76951469999999,
           lng: -122.5102119,
           url: 'https://farm9.staticflickr.com/8519/8580937391_a4b324159e.jpg' },
         { name: 'Neptune\'s Waterfront Grill & Bar',
           address: '2 Beach St, San Francisco, CA 94133, United States',
           googlePlaceId: 'ChIJHSGzi_yAhYARpv2WH5U4KN4',
           lat: 37.810988,
           lng: -122.410893,
           url: 'https://farm8.staticflickr.com/7312/11541305436_c1406a33f2.jpg' },
         { name: 'Greens Restaurant',
           address: 'A, Fort Mason, 2 Marina Blvd, San Francisco, CA 94123, United States',
           googlePlaceId: 'ChIJceeAXt6AhYARur0rWLmvt1A',
           lat: 37.8067965,
           lng: -122.4321689,
           url: 'https://farm6.staticflickr.com/5192/13938189649_b2ee5c08dc.jpg' },
         { name: 'EPIC Steak',
           address: '369 The Embarcadero, San Francisco, CA 94105, United States',
           googlePlaceId: 'ChIJJVhdD3CAhYARw2KuKNaUCEg',
           lat: 37.7908379,
           lng: -122.3893566,
           url: 'https://farm6.staticflickr.com/5011/5510819611_8365fe1aea.jpg' },
         { name: 'Corona Heights Park',
           address: 'Roosevelt Way & Museum Way, San Francisco, 94114, United States',
           googlePlaceId: 'ChIJX3DWQgJ-j4ARxWqSTDOy_CU',
           lat: 37.7653122,
           lng: -122.4385846,
           url: 'https://farm8.staticflickr.com/7514/16158064311_c5e022c497.jpg' },
         { name: 'Scoma\'s Sausalito',
           address: '588 Bridgeway, Sausalito, CA 94965, United States',
           googlePlaceId: 'ChIJ0b_p20WEhYAReF9zY3zyRXA',
           lat: 37.8539961,
           lng: -122.478653,
           url: 'https://farm5.staticflickr.com/4055/4713406811_c3d2265a43.jpg' },
         { name: 'The Spinnaker',
           address: '100 Spinnaker Dr, Sausalito, CA 94965, United States',
           googlePlaceId: 'ChIJi9kLxVqEhYARy-i8llgk7KA',
           lat: 37.8590135,
           lng: -122.4781557,
           url: 'https://farm9.staticflickr.com/8490/8247110365_22abccb4c8.jpg' },
         { name: 'Sutro’s',
           address: '1090 Point Lobos Ave, San Francisco, CA 94121, United States',
           googlePlaceId: 'ChIJ7dtznbWHhYARpQcOH3G6-xA',
           lat: 37.77843129999999,
           lng: -122.513982,
           url: 'https://farm5.staticflickr.com/4085/5001992834_892b6f3150.jpg' } 
       ];
  }

  sortPlacesBy(attribute) {
    console.log('Sort by this attribute: ', attribute);

    // this.props.places.sort(function(a, b) {
    //   return a.name.charCodeAt(0) - b.name.charCodeAt(0);
    // });
    this.props.places.sort(function(a, b) {
      return b[attribute] - a[attribute];
    });
    console.log('Sorted places: ', this.props.places);

    this.forceUpdate();
  }

  render() {
    return (
      <div>
      this.setDummyPlaces();
      { console.log('PLACES: ', this.props.places)}
        <div className='col-2-12'></div>

        <div className='sortPlacesBy'>
          <p className='saved-place-entry-link'>Sort by: rating</p>
          <a className='saved-place-entry-link' onClick={this.sortPlacesBy.bind(this, 'rating')}>desc</a>
          <span className='place-entry-link-divider'>&middot;</span>
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
