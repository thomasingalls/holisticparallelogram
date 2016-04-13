import React, {Component} from 'react';
import SavedPlaceEntry from './SavedPlaceEntry.js';

class SavedPlaceContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.savedPlaces.length === 0) {
      return (
        <div className='col-4-12'></div>
      );
    } else {
      return (
        <div className='col-4-12'>
          <h3>Your Saved Places</h3>
          { this.props.savedPlaces.map((savedPlace) => (
            <div>
              <SavedPlaceEntry savedPlace={savedPlace} />
            </div>
          ))}
        </div>
      );
    }
  }
}

export default SavedPlaceContainer;
