// $(document).ready(() => {
  console.log("EVENTS READY!");
  initFB();


//Ultimate Goal Display Selected Event's Info.

//From Local Storage, Obtain reference to appropriate firebase key

//using obtained key, pull applicable information from Firebase

//pull down and display thumbnail for 

// Google Maps API
var geocoder;
var map;

function codeAddress() {  
  geocoder = new google.maps.Geocoder();
  var latlng = null;
  mapOptions = {
    zoom: 4,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
   //pulls address from a hypothetical address input box; will need to have it pull from applicable event
  var address = document.getElementById('address').value; // var address = address of event
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
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


  //   const events = {
  //     create_eventName: null,
  //     create_eventDate: null,
  //     create_eventAddressFul: null,
  //     create_submit: null
  //   };
  //   for (let id of Object.keys(events)) {
  //     events[id] = $(`#${id}`);
  //   }

  //   events.create_submit.on("click", function(event) {
  //     event.preventDefault();

  //     // Grab user input
  //     var eventName = events.create_eventName.val().trim();
  //     var eventDate = events.create_eventDate.val().trim();
  //     var eventAddressFull = events.create_eventAddressFull.val().trim();

  //     // Create local object

  //     let newRef = eventsRef.child(eventName);
  //     newRef.set({
  //       date: eventDate,
  //       Address: eventAddressFull,
  //     });

  //     // Logs everything to console
  //     // console.log(newUser.username);
  //     // console.log(newUser.bgg);

  //     // Clears all of the text-boxes
  //     events.create_eventName.val("");
  //     events.create_eventDate.val("");
  //     events.create_eventAddressFull.val("");

// });
