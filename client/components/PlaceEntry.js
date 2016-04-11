import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

var placeEntryClassNames = classNames('grid', 'place-entry');

var PlaceEntry = (props) => (
  <div className={placeEntryClassNames}>
    <div className='col-2-8'>
      <span className="icon-heart" aria-hidden="true"></span>
    </div>
    <div className='col-6-8'>
      <h3>{ props.place.name }</h3>
      <p>{ props.place.address }</p>
    </div>
  </div>
);

export default PlaceEntry;
