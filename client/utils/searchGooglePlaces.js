import $ from 'jquery';

var searchGooglePlaces = function(callback, nextPageToken, radius, type, latitude, longitude) {

  radius = radius || 10000;
  type = type || 'restaurant';

  var data = {
    radius: radius,
    type: type,      //only 1 type can be passed in, default to restaurant for now
    keyword: 'view'
  };

  if (nextPageToken) {
    data['next_page_token'] = nextPageToken;
  }


  var makeAjaxRequest = function(longitude, latitude) {
    if (longitude && latitude) {
      data.location = latitude + ',' + longitude;
    }
    $.ajax({         //only returns 20 results per call, needs to pass in pagetoke returned from previous call in order to get the next 20 results
      url: '/api/places',
      method: 'GET',
      data: data,
      success: function(filteredBody) {
        callback(filteredBody);
        // console.log(filteredBody);
      }
    });
  };

  if ((!latitude) || (!longitude)) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //TODO: add logic for when browser fails to retrieve current location
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      makeAjaxRequest(latitude, longitude);
      console.log('here');
    });
  } else {
    makeAjaxRequest(latitude, longitude);
  }
};

export default searchGooglePlaces;
