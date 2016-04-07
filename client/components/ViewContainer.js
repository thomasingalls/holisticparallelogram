import React from 'react';
import ReactDOM from 'react-dom';
import ViewEntry from './ViewEntry';

var ViewContainer = (props) => (
    <div>
    {props.viewEntries.map((viewEntry => (
      <ViewEntry viewName={viewEntry}></ViewEntry>
    )))}
    </div>
  );

export default ViewContainer;
