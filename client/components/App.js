import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';

import Header from './Header';
import MapContainer from './MapContainer';
import PlaceContainer from './PlaceContainer';
import SavedPlaceContainer from './SavedPlaceContainer';
import searchGooglePlaces from '../utils/searchGooglePlaces.js';
import $ from 'jquery';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className='grid'>
          <MapContainer/>
          <PlaceContainer/>
          <SavedPlaceContainer actions={this.props.actions}/>
        </div>
      </div>
    );
  }
}

export default App;
