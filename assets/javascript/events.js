// $(document).ready(() => {
  "use strict";
  console.log("EVENTS READY!");
    
    //#region DOM ELEMENTS
    const JQ_IDs = {
      username: null,

      eventName: null,
      eventCode: null,
      eventAddr: null,
      eventDate: null,
      eventNumInvite: null,
      eventDescript: null,

      voteDeadline: null,
    };
    for (let id of Object.keys(JQ_IDs)) {
      JQ_IDs[id] = $(`#${id}`);
    }
    
    const DOM_FIND = {
    }
    
    //// const JQ_CLASSes = {
    //// };
    //// for (let cl of Object.keys(JQ_CLASSes)) {
    ////   JQ_IDs[cl] = $(`.${cl}`);
    //// }
    //#endregion DOM ELEMENTS
    
    // Firebase References
    let database = getFirebaseDB();
    let userNamesRef = database.ref("/usernames");
    let    eventsRef = database.ref("/events");
    let thisEventRef = null;
    
    // Page-local variables
    let thisUsername = "";
    let thisEventID = "";
    let thisEventObj = null;
    let thisUsersCollection = [];

function buildUpEvent(eventID, eventObj) {
  // Page-Local Variables
  thisEventID = eventID.toUpperCase();
  thisEventObj = eventObj;
  console.log("building up event", thisEventID, eventObj);

  // Local Storage
  localStorage.setItem(LOCAL_STORAGE_VARS.eventID, thisEventID);

  // Firebase
  thisEventRef = eventsRef.child(thisEventID);
  thisEventRef.child("submissions").on("child_added"  , listenForAddSubmit   );
  thisEventRef.child("submissions").on("child_removed", listenForRemoveSubmit);
  // thisUsersRef.child("myEvents").on("child_added", listenForAddEvent);
  // thisUsersRef.child("myEvents").on("child_removed", listenForRemoveEvent);

  // DOM Elements
  JQ_IDs.username.text(thisUsername);
  JQ_IDs.eventName.text(eventObj.details.name);
  JQ_IDs.eventCode.text(eventID);
  JQ_IDs.eventAddr.text(eventObj.details.address);
  const m$eventDate = moment(eventObj.details.date);
  JQ_IDs.eventNumInvite.text(eventObj.details.inviteCount);
  JQ_IDs.eventDate     .text(m$eventDate.format("dddd, MMMM Do"));
  JQ_IDs.eventDescript .text(eventObj.details.description);
  JQ_IDs.voteDeadline  .text(m$eventDate.subtract(1, "days").format("ddd MMM Do"));
}

function tearDownEvent() {
  console.log("tearing down event");

  // Firebase
  if (thisEventRef) {
    thisEventRef.child("submissions").off("child_added"  , listenForAddSubmit   );
    thisEventRef.child("submissions").off("child_removed", listenForRemoveSubmit);
  }

  thisUsername = "";
  thisEventID  = "";
  thisEventObj = null;

  // Local Storage
  localStorage.removeItem(LOCAL_STORAGE_VARS.eventID);

  // DOM Elements
  JQ_IDs.username      .empty();
  JQ_IDs.eventCode     .empty();
  JQ_IDs.eventAddr     .empty();
  JQ_IDs.eventDate     .empty();
  JQ_IDs.eventNumInvite.empty();
  JQ_IDs.eventDescript .empty();
  JQ_IDs.voteDeadline  .empty();
}

function fetchUsersCollection() {
  if (!thisUsername) { return; }
  userNamesRef.child(`${thisUsername}/coll`).once("value").then( collSnap => {
    thisUsersCollection = collSnap.val() && Object.values(collSnap.val());
  });
}

// #region SUBMISSIONS
function addSubmissionToEvent(submitObj) {
  thisEventRef.child("submissions").push(submitObj);
}

//* Listeners
function listenForAddSubmit(args) {
  let val = args.val();
  console.log("heard you wanted to add a submission", val);

  //! BUILD CLONE
  // let $clone = JQ_IDs.gameTemplate.clone().contents();
  // if (!val.thumbnailURL) {
  //   val.thumbnailURL = "https://via.placeholder.com/100x100";
  // }
  // $clone.find(DOM_FIND.gameTmp_img).attr({
  //   src: val.thumbnailURL,
  //   alt: val.name,
  // });
  // $clone.find(DOM_FIND.gameTmp_title).text(val.name);
  // $clone.attr({
  //   'data-bggid' : val.id,
  // });

  // JQ_IDs.collectionList.prepend($clone);
}

function listenForRemoveSubmit(args) {
  const val = args.val();
  console.log("heard you wanted to remove a submission", val, val.id);
  //! Search and Destory
  // $(DOM_FIND.gameTmp_listItem).filter(`[data-bggid=${val.id}]`).remove();
}
// #endregion SUBMISSIONS


    //#region SUBMITS & CLICKS
    //#endregion SUBMITS & CLICKS
    

    // #region START OF EXECUTION
    //* Check for valid username and valid event
thisUsername = localStorage.getItem(LOCAL_STORAGE_VARS.username);
if (!thisUsername) {
  console.log("local storage doesnt have user id, send back to profile page");
  //! TODO: visual to say please sign in, by going back to profile page
} else {
  thisUsername = thisUsername.toLowerCase();
  console.log("local storage has username", thisUsername);
  // Check FB for user
  userNamesRef.once("value").then(namesSnap => {
    if (namesSnap.child(thisUsername).exists()) {
      console.log("user exists in FB");

      //* now check for event id in query
      let urlQueries = {};
      $.each(document.location.search.substr(1).split('&'), function(c, q) {
        var i = q.split('=');
        urlQueries[i[0].toString()] = i[1].toString();
      });

      if (!urlQueries.hasOwnProperty('id')) {
        console.log("url does not have event id");
        //! TODO: visual to go back to profile page to select an event
      } else {
        thisEventID = urlQueries.id.toUpperCase();
        console.log("local storage has event id", thisEventID);
        // Check FB for event ID
        eventsRef.once("value").then(snap => {
          if (snap.child(thisEventID).exists()) {
            console.log("event exists in FB");
            // Firebase knows this event
            buildUpEvent(thisEventID, snap.child(thisEventID).val());
            fetchUsersCollection();
          } else {
            console.log("event doesn't exist in FB");
            tearDownEvent();
          }
        });
      }
    } else {
      console.log("user doesn't exist in FB");
      //! todo: visual to say please sign back in on index page
    }
  });
}
    //#endregion START OF EXECUTION
    
    // });


//Ultimate Goal Display Selected Event's Info.

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

// });
