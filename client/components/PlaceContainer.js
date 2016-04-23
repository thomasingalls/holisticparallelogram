import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PlaceEntry from './PlaceEntry';
import actions from '../actions/index.js';
import $ from 'jquery';

class PlaceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {id:'loading-container'};
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll.bind(this));
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll.bind(this));
  // }

  // handleScroll(event) {
  //   let scrollTop = event.srcElement.body.scrollTop;
  //   if (scrollTop > 280) {
  //     event.preventDefault();
  //     this.setState({id: 'loading-container'});
  //   } else {
  //     this.setState({id: 'loading-container'});
  //   }
  // }

  render() {
    return (
      <div>
        <div className='col-2-12'></div>
        <div id='loading-container' className='col-6-12'>
          { this.props.places.map((place, i) => (
            <div>
              <PlaceEntry onSaveClick={this.props.onSaveClick} place={ place } key={i} actions={actions}></PlaceEntry>
            </div>
          ))}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    places: state.places
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveClick: (place, user) => {
      $.ajax({
        url: '/api/places/saved',
        method: 'POST',
        data: {user: user, place: place}
      });

      var packaged = place;
      packaged['UserPlace'] = {
        PlaceId: place.googlePlaceId,
        UserId: user.googleUserId,
      }
      dispatch(actions.savePlace(packaged));

    }
  };
};

PlaceContainer.propTypes = {
  places: PropTypes.array.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceContainer);
