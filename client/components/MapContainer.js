import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleFetchCoordinate() {
    console.log(this.props);
    this.props.dispatch(this.props.actions.fetchCoordinate());
  }

  render() {
    return (
      <div>
        {this.handleFetchCoordinate.bind(this)}
        MapContainer
      </div>
    );
  }
}

export default MapContainer;
