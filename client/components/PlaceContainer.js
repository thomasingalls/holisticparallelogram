import React from 'react';
import ReactDOM from 'react-dom';
import PlaceEntry from './PlaceEntry';

var PlaceContainer = (props) => (
    <div className='col-8-12'>
    { props.placeEntries.map((place) => (
      <div>
        <PlaceEntry onClick={props.onClick} place={ place }></PlaceEntry>
      </div>
    ))}
    </div>
  );

export default PlaceContainer;
