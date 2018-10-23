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

          myVotedList : null,
      submissionsList : null,

          votingModal : null,
       collectionList : null,
          chosenGames : null,
          doneSubmit  : null,

      submissionTemplate: null,
    };
    for (let id of Object.keys(JQ_IDs)) {
      JQ_IDs[id] = $(`#${id}`);
    }
    
    const DOM_FIND = {
      gameTmp_listItem : ".gameTmp_listItem",
      gameTmp_title: ".gameTmp_title",
      gameTmp_img: ".gameTmp_img",
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
    let thisUsersRef = null;
    
    // Page-local variables
    let thisUsername = "";
    let thisEventID = "";
    let thisEventObj = null;
    let thisUsersCollection = [];

    let myVoteCount = 0;
    //// let mySubmitCount = 0;

function buildUpEvent(eventID, eventObj) {
  // Page-Local Variables
  thisEventID = eventID.toUpperCase();
  thisEventObj = eventObj;
  console.log("building up event", thisEventID, eventObj);
  myVoteCount = 0;

  // Local Storage
  localStorage.setItem(LOCAL_STORAGE_VARS.eventID, thisEventID);

  // Firebase
  thisEventRef = eventsRef.child(thisEventID);
  thisEventRef.child("submissions").on("child_added"  , listenForAddSubmit   );
  thisEventRef.child("submissions").on("child_removed", listenForRemoveSubmit);
  thisUsersRef = userNamesRef.child(thisUsername);

  // DOM Elements
  JQ_IDs.username.text(thisUsername);

  JQ_IDs.eventName.text(thisEventObj.details.name);
  JQ_IDs.eventCode.text(eventID);
  JQ_IDs.eventAddr.text(thisEventObj.details.address);
  const m$eventDate = moment(thisEventObj.details.date);
  JQ_IDs.eventNumInvite.text(thisEventObj.details.inviteCount);
  JQ_IDs.eventDate     .text(m$eventDate.format("dddd, MMMM Do"));
  JQ_IDs.eventDescript .text(thisEventObj.details.description);

  JQ_IDs.voteDeadline  .text(m$eventDate.subtract(1, "days").format("ddd MMM Do"));
  codeAddress();
}

function tearDownEvent() {
  console.log("tearing down event");

  // DOM Elements
  //? JQ_IDs.username      .empty();

  JQ_IDs.eventCode     .empty();
  JQ_IDs.eventAddr     .empty();
  JQ_IDs.eventDate     .empty();
  JQ_IDs.eventNumInvite.empty();
  JQ_IDs.eventDescript .empty();

  JQ_IDs.voteDeadline  .empty();

  // Firebase
  if (thisEventRef) {
    thisEventRef.child("submissions").off("child_added"  , listenForAddSubmit   );
    thisEventRef.child("submissions").off("child_removed", listenForRemoveSubmit);
  }
  thisEventRef = null;
  thisUsersRef = null;

  // Local Storage
  localStorage.removeItem(LOCAL_STORAGE_VARS.eventID);

  // Page-Local Variables
  thisUsername = "";
  thisEventID  = "";
  thisEventObj = null;
  myVoteCount = 0;
  mySubmitCount = 0;
}


function buildGameClone(gameObj) {
  let $clone = JQ_IDs.submissionTemplate.clone().contents();
  if (!gameObj.thumbnailURL) {
    gameObj.thumbnailURL = "https://via.placeholder.com/100x100";
  }
  $clone.find(DOM_FIND.gameTmp_img).attr({
    src: gameObj.thumbnailURL,
    alt: gameObj.name,
  });
  $clone.find(DOM_FIND.gameTmp_title).text(gameObj.name);
  $clone.attr({
    'data-bggid' : gameObj.id,
  });

  return $clone;
}

function fetchUsersCollection() {
  if (!thisUsername) { return; }
  userNamesRef.child(`${thisUsername}/coll`).once("value").then( collSnap => {
    thisUsersCollection = collSnap.val() && Object.values(collSnap.val());
    thisUsersCollection.forEach( gameObj => {
      JQ_IDs.collectionList.prepend(buildGameClone(gameObj));
    });
  });
}

// #region SUBMISSIONS
function addSubmissionToEvent(submitObj) {
  let exampleObj1 = thisUsersCollection[0];
  let exampleObj2 = thisUsersCollection[1];
  let exampleObj3 = thisUsersCollection[2];
  let exampleObj4 = thisUsersCollection[3];
  console.log(exampleObj1);
  thisEventRef.child("submissions").push(exampleObj1);
  thisEventRef.child("submissions").push(exampleObj2);
  thisEventRef.child("submissions").push(exampleObj3);
  thisEventRef.child("submissions").push(exampleObj4);
}

//* Listeners
function listenForAddSubmit(args) {
  const val = args.val();
  console.log("heard you wanted to add a submission", val);
  JQ_IDs.submissionsList.prepend(buildGameClone(val));
}

function listenForRemoveSubmit(args) {
  const val = args.val();
  console.log("heard you wanted to remove a submission", val, val.id);
  $(DOM_FIND.gameTmp_listItem).filter(`[data-bggid=${val.id}]`).remove();
}
// #endregion SUBMISSIONS


    //#region SUBMITS & CLICKS
    //* Votings
$(document).on("click", `#myVotedList ${DOM_FIND.gameTmp_listItem}`, function(event) {
  let $this = $(this);
  console.log("clicking to REMOVE vote on:", $this);
  --myVoteCount;
  JQ_IDs.submissionsList.prepend(this);

});
$(document).on("click", `#submissionsList ${DOM_FIND.gameTmp_listItem}`, function(event) {
  let $this = $(this);
  console.log("clicking to vote on:", $this);

  if (myVoteCount >= 3) { 
    console.log("can't vote more than 3");
    //TODO: visual alert of not more than 3
    return; 
  }
  JQ_IDs.myVotedList.append(this);
  ++myVoteCount;
});

//* Submissions
$(document).on("click", `#collectionList ${DOM_FIND.gameTmp_listItem}`, function(event) {
  console.log("adding a game of mine as submission");
  JQ_IDs.chosenGames.append(this);
  //? TODO: limit submission count
});

$(document).on("click", `#chosenGames ${DOM_FIND.gameTmp_listItem}`, function(event) {
  console.log("removing a game of mine as submission");
  JQ_IDs.collectionList.prepend(this);
});

JQ_IDs.doneSubmit.click(function(event) {
  console.log("done submitting");
  
  JQ_IDs.chosenGames.find(DOM_FIND.gameTmp_listItem).each( (index_, value) => {
    const $value = $(value);
    console.log($value.data('bggid'));
    // addSubmissionToEvent()
  });
  JQ_IDs.votingModal.foundation('close');
});
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
  
  //* check this name with firebase
  userNamesRef.once("value").then(namesSnap => {
    if (namesSnap.child(thisUsername).exists()) {
      console.log("user exists in FB");
      checkForEvent()
    } else {
      console.log("user doesn't exist in FB");
      //! todo: visual to say please sign back in on index page
    }
  });
}

function checkForEvent() {
  //* check for event id in query
  let urlQueries = {};
  $.each(document.location.search.substr(1).split('&'), function (c, q) {
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
        //? TODO: check that user has joined this event
        buildUpEvent(thisEventID, snap.child(thisEventID).val());
        fetchUsersCollection();
      } else {
        console.log("event doesn't exist in FB");
        tearDownEvent();
      }
    });
  }
}
    //#endregion START OF EXECUTION
    
    // });


//Ultimate Goal Display Selected Event's Info.

//using obtained key, pull applicable information from Firebase

//pull down and display thumbnail for 


var geocoder;
var map;

function codeAddress() {  
  let geocoder = new google.maps.Geocoder();
  var latlng = null;
  let mapOptions = {
    zoom: 4,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
   //pulls address from a hypothetical address input box; will need to have it pull from applicable event 
  var address = `${thisEventObj.details.address} chicago, il`;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      map.setZoom(16)
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
