window.searchGooglePlaces = function(longitude, latitude, radius, type, callback) {
  $.ajax({         //only returns 20 results per call, needs to pass in pagetoke returned from previous call in order to get the next 20 results
    url: '/getAll',
    method: 'GET',
    data: {
      location: longitude + ',' + latitude,
      radius: radius,
      type: 'restaurant',      //only 1 type can be passed in, default to restaurant for now
      keyword: 'view'
    },
    success: function(filteredBody) {
      callback(filteredBody);
    }
  });
};