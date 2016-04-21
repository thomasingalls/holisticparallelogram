import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
// import PlaceEntry from './PlaceEntry';
import actions from '../actions/index.js';
import $ from 'jquery';

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  initMap() {
    var myLatLng = {lat: -25.363, lng: 131.044};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }

  test(){
    console.log('1');
  }

  render() {
    return (
      <div id="map">
        1234
        { this.test() }
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3MVzYGCrJC4D3-s0MO-fo761Q8Qj949k&callback=initMap">
        </script>
      </div>
    );
  }
}

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(MapContainer);
