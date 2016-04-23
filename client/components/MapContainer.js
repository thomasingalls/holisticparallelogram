import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleFetchCoordinate() {
    // console.log('Map props: ', this.props);
    this.props.dispatch(this.props.actions.fetchCoordinate());

    this.clickedCoord = this.props.coordinate[0];
    console.log('Clicked coordinate: ', this.clickedCoord);
  }

  render() {
    { this.handleFetchCoordinate() }
    return (
      <div>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              style={{
                height: '400px',
              }}
              className='col-4-12 saved-places'
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => (this._googleMapComponent = map) && console.log(map.getZoom())}
            defaultZoom={10}
            defaultCenter={ { lat: 37.80898699999999, lng: -122.41026} }
            onClick={this.handleMapClick}
            style={{
              height: '400px',
              width: '400px',
              position: 'absolute',
              top: '0',
              left: '0'
            }}
          >
            {this.props.markers.map((marker, index) => {
              {console.log('Marker: ', marker)}
              {console.log('Index: ', index)}
              return (
                <Marker
                    // position= {{
                    //   lat: 37.78,
                    //   lng: -122.512
                    // }}
                    position={this.clickedCoord}
                    key={marker.name}
                    defaultAnimation={2}
                />
              );
            })}
          </GoogleMap>
        }
      />
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    coordinate: state.coordinate,
    markers: state.places
  };
};

MapContainer.propTypes = {
  coordinate: PropTypes.array,
  markers: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps
)(MapContainer);