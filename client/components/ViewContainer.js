import React from 'react';
import ReactDOM from 'react-dom';
import ViewEntry from './ViewEntry';

var ViewContainer = (props) => (
    <div>
    { props.viewEntries.map((place => (
      <div>
        <ViewEntry place={place}></ViewEntry>
      </div>
    )))}
    </div>
  );

export default ViewContainer;
