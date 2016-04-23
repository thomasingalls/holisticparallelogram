import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleFetchCoordinate() {
    // console.log('Map props: ', this.props);
    this.props.dispatch(this.props.actions.fetchCoordinate());
    var coord = this.props.coordinate[0];
    console.log('COORD: ', coord);
  }

  render() {
    return (
      <div>
        { this.handleFetchCoordinate() }
        MapContainer
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coordinate: state.coordinate
  };
};

MapContainer.propTypes = {
  coordinate: PropTypes.array,
};

export default connect(
  mapStateToProps
)(MapContainer);