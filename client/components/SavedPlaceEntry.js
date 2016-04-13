import React from 'react';
import classNames from 'classnames';

var savedPlaceClasses = classNames('saved-place-entry', 'animated', 'fadeIn');

var SavedPlaceEntry = (props) => (
  <div className={savedPlaceClasses}>
    <p className='saved-place-name'>{ props.savedPlace.name }</p>
    <p>{ props.savedPlace.address }</p>
  </div>
);

export default SavedPlaceEntry;
