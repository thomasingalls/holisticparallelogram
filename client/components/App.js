import React from 'react';

import Search from './Search';
import ViewContainer from './ViewContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewEntries: ['View 1', 'View 2', 'View 3']
    };
  }
  render() {
    return (
      <div>
        <Search/>
        <ViewContainer viewEntries={this.state.viewEntries} />
      </div>
    );
  }
};

export default App;
