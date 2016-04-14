import $ from 'jquery';

var searchGooglePlaces = function(callback, nextPageToken, radius, type, latitude, longitude) {

  radius = radius || 10000;

  var data = {
    radius: radius,
    types: 'park|restaurant',      //"types" will be deprecated in 2017. "type" will have to be used instead, which only allows one type per search
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
