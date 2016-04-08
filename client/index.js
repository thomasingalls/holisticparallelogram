// this is the main entry point for the app
// it renders the App component after wrapping it in the Provider from Redux

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import zip from './reducers';

import App from './components/App.js';

import $ from 'jquery';

// the store manages the state of our app
// createStore accepts a single reducer or a collection of reducers
const store = createStore(zip);

var render = function() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
};

render();
store.subscribe(render);
