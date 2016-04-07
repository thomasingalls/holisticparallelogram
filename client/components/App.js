import React from 'react';
import ReactDOM from 'react-dom';

import Search from './Search';
import ViewContainer from './ViewContainer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Search/>
        <ViewContainer/>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
