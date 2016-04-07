import React from 'react';
import ReactDOM from 'react-dom';

import Search from './Search';
import ViewContainer from './ViewContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewEntries: ['View 1','View 2','View 3']
    }
  }
  render() {
    return (
      <div>
        <Search/>
        <ViewContainer viewEntries={this.state.viewEntries}/>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
