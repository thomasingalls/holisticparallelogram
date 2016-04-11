import React from 'react';
import ReactDOM from 'react-dom';
import PlaceEntry from './PlaceEntry';

var PlaceContainer = (props) => (
    <div>
    { props.placeEntries.map((place) => (
      <div>
        <PlaceEntry place={ place }></PlaceEntry>
      </div>
    ))}
    </div>
  );

export default PlaceContainer;
