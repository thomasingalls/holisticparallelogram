var searchGooglePlaces = function(callback, radius, type, latitude, longitude) {
  
  radius = radius || 50000;
  type = type || 'restaurant';

  var makeAjaxRequest = function() {
    $.ajax({         //only returns 20 results per call, needs to pass in pagetoke returned from previous call in order to get the next 20 results
      url: '/views',
      method: 'GET',
      data: {
        location: latitude + ',' + longitude,
        radius: radius,
        type: type,      //only 1 type can be passed in, default to restaurant for now
        keyword: 'view'
      },
      success: function(filteredBody) {
        // callback(filteredBody);
        console.log(filteredBody);
      }
    });
  };

  if ((!latitude) || (!longitude)) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //TODO: add logic for when browser fails to retrieve current location
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      makeAjaxRequest();
    });
  } else {
    makeAjaxRequest();
  }
};

// export default searchGooglePlaces;