import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import actions from '../actions/index.js';

import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {

  handleMapClick (e) {
    e.preventDefault();
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              backgroundColor: 'blue',
              height: '400px',
              position: 'absolute'
            }}
            className='col-1-3'
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => (this._googleMapComponent = map) && console.log(map.getZoom())}
            defaultZoom={3}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            onClick={this.handleMapClick}
            style={{
              height: '400px',
              width: '400px',
              position: 'absolute',
              top: '0',
              left: '0'
            }}
          >
            {console.log('yep', this.props)}
            {this.props.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onRightclick={this.handleMarkerRightclick.bind(this, index)}
                />
              );
            })}
          </GoogleMap>
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    markers: state.places
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //method: () => {},
    //mapRightClick: () => {},
    //mapLeftClick: () => {}
  };
};

Map.propTypes = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
