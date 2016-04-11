import React from 'react';
import ReactDOM from 'react-dom';

var ViewEntry = (props) => (
  <div>
    <h3>{props.place.name}</h3>
    <p>{props.place.address}</p>
  </div>
);

export default ViewEntry;
