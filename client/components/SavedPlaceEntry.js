<<<<<<< HEAD
import React, { Component } from 'react';
import $ from 'jquery';

class SavedPlaceEntry extends Component {

  handleDelete() {
    console.log(this.props.savedPlace.UserPlace);
    var clickedId = this.props.savedPlace.googlePlaceId;
    var userId = this.props.savedPlace.UserPlace.UserId;
    var placeId = this.props.savedPlace.UserPlace.PlaceId;

    // console.log(clickedId);
    // console.log('Props in handleDelete: ', this.props);
    this.props.dispatch(this.props.actions.deletePlace(clickedId));

    $.ajax({
      url: '/api/places/saved',
      method: 'DELETE',
      data: {userId: userId, placeId: placeId}
    });
  }

  render() {
    console.log('firing on', this.props.savedPlace.name);
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
=======
import React from 'react';

var SavedPlaceEntry = (props) => (
  <div className='saved-place-entry animated fadeIn'>
    <img className='saved-place-image' src={props.savedPlace.url} height ="50" width="50"/>
    <p className='saved-place-name'>{ props.savedPlace.name }</p>
    <p className='saved-place-address'>{ props.savedPlace.address }</p>
    <div>
      <a className='saved-place-entry-link' href={'//www.images.google.com/search?q=' + props.savedPlace.name + ' ' + props.savedPlace.address + '&tbm=isch'}
      target='_blank'>More Views</a>
      <span className='place-entry-link-divider'>&middot;</span>
      <a className='saved-place-entry-link' href={'//www.google.com/search?q=' + props.savedPlace.name + ' ' + props.savedPlace.address}
      target='_blank'>Find on Google</a>
    </div>
  </div>
);
>>>>>>> 992ca35c21c7d9876646c4c2a6bc9b155cc404a2

export default SavedPlaceEntry;
