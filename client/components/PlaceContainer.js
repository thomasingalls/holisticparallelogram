import React from 'react';
import ReactDOM from 'react-dom';
import PlaceEntry from './PlaceEntry';

var PlaceContainer = (props) => (
    <div>
      <div className='col-2-12'></div>
      <div id='target' className='col-6-12'>
        { props.placeEntries.map((place) => (
          <div>
            <PlaceEntry onSaveClick={props.onSaveClick} place={ place }></PlaceEntry>
          </div>
        ))}
      </div>
    </div>
  );

export default PlaceContainer;
