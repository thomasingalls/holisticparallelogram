import React from 'react';

var SavedPlaceEntry = (props) => (
  <div className='saved-place-entry'>
    <p className='saved-place-name'>{ props.savedPlace.name }</p>
    <p>{ props.savedPlace.address }</p>
  </div>
);

export default SavedPlaceEntry;
