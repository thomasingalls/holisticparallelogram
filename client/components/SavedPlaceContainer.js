import React from 'react';
import SavedPlaceEntry from './SavedPlaceEntry.js';

var SavedPlaceContainer = (props) => (
  <div className='col-4-12'>
    <h2>Your Saved Places</h2>
    { props.savedPlaces.map((savedPlace) => (
      <div>
        <SavedPlaceEntry savedPlace={savedPlace} />
      </div>
    ))}
  </div>
);

export default SavedPlaceContainer;
