import React, {Component} from 'react';

class PlaceEntry extends Component {
  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault;
    this.props.onSaveClick(this.props.place);
  }

  render() {
    return (
      <div className='place-entry animated fadeInUp'>
        <div className='place-info' >
          <h4>{ this.props.place.name }</h4>
          <p>{ this.props.place.address }</p>
        </div>
        <div className='place-entry-favorite'>
          <span onClick={this.handleClick.bind(this)} className='icon-heart' aria-hidden='true'></span>
        </div>
      </div>
    );
  }
}

export default PlaceEntry;
