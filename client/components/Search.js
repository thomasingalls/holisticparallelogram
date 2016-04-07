import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  render() {
    return (
    <form>
      <input type="text" placeholder="Zip code"/>
      <button type="submit">Search</button>
    </form>
  )}
}

ReactDOM.render(
  <Search/>,
  document.getElementById('app')
);
