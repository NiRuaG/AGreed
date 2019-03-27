var geocoder;
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();
  // latitude and longitude of Chicago
  var latlng = new google.maps.LatLng(41.8781, -87.6298);
  mapOptions = {
    //default map zoom
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {  
    //pulls address from a hypothetical address input box; will need to have it pull from applicable event
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      // zoom following search
      map.setZoom(12)
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
