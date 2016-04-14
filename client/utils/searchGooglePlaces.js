import $ from 'jquery';

var searchGooglePlaces = function(callback, nextPageToken, radius, type, latitude, longitude) {

  radius = radius || 10000;
  // type = type || 'restaurant';

  var data = {
    radius: radius,
    type: 'park|restaurant',      //only 1 type can be passed in, default to restaurant for now
    keyword: 'view',
    rankby: 'distance'
  };

  if (nextPageToken) {
    data.pagetoken = nextPageToken;
  }


  var makeAjaxRequest = function(latitude, longitude) {
    data.location = latitude + ',' + longitude;
    $.ajax({
      url: '/api/places',
      method: 'GET',
      data: data,
      success: function(filteredBody) {
        callback(filteredBody);
      }
    });
  };

  if ((!latitude) || (!longitude)) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //TODO: add logic for when browser fails to retrieve current location
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      makeAjaxRequest(latitude, longitude);
    });
  } else {
    makeAjaxRequest(latitude, longitude);
  }
};

export default searchGooglePlaces;
