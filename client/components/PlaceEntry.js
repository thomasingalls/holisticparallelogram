import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

var placeEntryClasses = classNames('place-entry', 'animated', 'fadeInUp');

var PlaceEntry = (props) => (
  <div className={placeEntryClasses}>
    <div className='place-info' >
      <h4>{ props.place.name }</h4>
      <p>{ props.place.address }</p>
    </div>
    <div className='place-entry-favorite'>
      <span className='icon-heart' aria-hidden='true'></span>
    </div>
  </div>
);

export default PlaceEntry;
