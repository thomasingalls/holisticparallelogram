// OLD WORKING CODE
// import React from 'react';

// var SavedPlaceEntry = (props) => (
//   <div className='saved-place-entry animated fadeIn'>
//     <p className='saved-place-name'>{ props.savedPlace.name }</p>
//     <p className='saved-place-address'>{ props.savedPlace.address }</p>
//     <div>
//       <a className='saved-place-entry-link' href={'//www.images.google.com/search?q=' + props.savedPlace.name + ' ' + props.savedPlace.address + '&tbm=isch'}
//       target='_blank'>View Images</a>

//       <span className='place-entry-link-divider'>&middot;</span>
//       <a className='saved-place-entry-link' href={'//www.google.com/search?q=' + props.savedPlace.name + ' ' + props.savedPlace.address}
//       target='_blank'>Find on Google</a>

//       <span className='place-entry-link-divider'>&middot;</span>
//     </div>
//   </div>
// );

import React, { Component } from 'react'

class SavedPlaceEntry extends Component {

  handleComplete() {
    // this.props.actions.completeTodo(this.props.todo.id)
  }

  handleDelete() {
    var clickedId = this.props.savedPlace.googlePlaceId;
    // console.log(clickedId);
    // console.log('Props in handleDelete: ', this.props);
    // this.props.actions.deletePlace(clickedId);
    this.props.dispatch(this.props.actions.deletePlace(clickedId));
  }

  render() {
    return (
      <div className='saved-place-entry animated fadeIn'>
        <p className='saved-place-name'>{ this.props.savedPlace.name }</p>
        <p className='saved-place-address'>{ this.props.savedPlace.address }</p>
        <div>
          <a className='saved-place-entry-link' href={'//www.images.google.com/search?q=' + this.props.savedPlace.name + ' ' + this.props.savedPlace.address + '&tbm=isch'}
          target='_blank'>View Images</a>

          <span className='place-entry-link-divider'>&middot;</span>
          <a className='saved-place-entry-link' href={'//www.google.com/search?q=' + this.props.savedPlace.name + ' ' + this.props.savedPlace.address}
          target='_blank'>Find on Google</a>

          <span className='place-entry-link-divider'>&middot;</span>
          <a className='saved-place-entry-link' onClick={this.handleDelete.bind(this)}>Remove Saved Place</a>

        </div>
      </div>
    )
  }

}

export default SavedPlaceEntry;
