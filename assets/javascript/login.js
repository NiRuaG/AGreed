// $(document).ready(() => {
"use strict";
console.log("LOGIN READY!");

//#region DOM ELEMENTS
const JQ_IDs = {
  username   : null,
  signin_btn : null,
  signout_btn: null,

  loginModal     : null,
  loginForm      : null,
  login_userName : null,
  login_submit   : null,

  eventModal : null,
  eventForm  : null,
  eventName  : null,
  eventDate  : null,
  eventAddressFull : null,
  event_submit: null,

  collectionList : null,
      eventsList : null,

    gameTemplate : null,
   eventTemplate : null,
};
for (let id of Object.keys(JQ_IDs)) {
  JQ_IDs[id] = $(`#${id}`);
}

const DOM_FIND = {
  gameTmp_listItem : ".gameTmp_listItem",
  gameTmp_title    : ".gameTmp_title",
  gameTmp_img      : ".gameTmp_img",

  eventTmp_title : ".eventTmp_title",
  eventTmp_date  : ".eventTmp_date",
  eventTmp_addr  : ".eventTmp_addr",
}

// const JQ_CLASSes = {
// };
// for (let cl of Object.keys(JQ_CLASSes)) {
//   JQ_IDs[cl] = $(`.${cl}`);
// }
//#endregion DOM ELEMENTS

// Firebase References
let database = getFirebaseDB();
let userNamesRef = database.ref("/usernames");
let    eventsRef = database.ref("/events");
let thisUsersRef = null;

eventsRef.on("child_removed", removedChild => {
  console.log("event from main list removed", removedChild);
  //TODO: look through my events to see if they need removing
});

// Page-local variables
let username = "";
let collection = [];

function buildUpUser(username) {
  // Page-Local Variables
  username = username.toLowerCase();
  console.log("building up user", username)

  // Local Storage
  localStorage.setItem(LOCAL_STORAGE_VARS.username, username);

  // Firebase
  thisUsersRef = userNamesRef.child(username);
  thisUsersRef.child("coll"    ).on("child_added"  , listenForAddGame    );
  thisUsersRef.child("coll"    ).on("child_removed", listenForRemoveGame );
  thisUsersRef.child("myEvents").on("child_added"  , listenForAddEvent   );
  thisUsersRef.child("myEvents").on("child_removed", listenForRemoveEvent);

  // DOM Elements
  JQ_IDs.username.text(username);
  JQ_IDs.signin_btn.hide();
  JQ_IDs.signout_btn.show();
}

function tearDownUser() {
  console.log("tearing down user");

  // Firebase
  if (thisUsersRef) {
    thisUsersRef.child("coll"    ).off("child_added"  , listenForAddGame    );
    thisUsersRef.child("coll"    ).off("child_removed", listenForRemoveGame );
    thisUsersRef.child("myEvents").off("child_added"  , listenForAddEvent   );
    thisUsersRef.child("myEvents").off("child_removed", listenForRemoveEvent);
  }

  // Local Storage
  thisUsersRef = null;
  localStorage.removeItem(LOCAL_STORAGE_VARS.username);
  username = "";

  // DOM Elements
  JQ_IDs.username.empty();
  JQ_IDs.signin_btn.show();
  JQ_IDs.signout_btn.hide();
}

function checkFBforName(name) {
  name = name.toLowerCase();
  return userNamesRef.once("value").then(snap => {
    return snap.child(name).exists();
  });
}

//#region SIGN-IN/OUT
//* Login / Sign-up
function signIn(name) {
  name = name.toLowerCase();
  console.log("Sign in/up as", name);
  checkFBforName(name).then(doesExist => {
    // Regardless if this is a previous user, we need the FB user node
    buildUpUser(name);
    if (doesExist) {
      // Firebase knows this name
      console.log("user already has account on FB");
      console.log("should see events and collection");
    } else {
      // Firebase does not have this name
      console.log("adding user to FB")
      // Sign them up!
      thisUsersRef.set({signUpAt: firebase.database.ServerValue.TIMESTAMP }); // give them a persistent data node to make sure they stay in the db
      console.log("Visual: make sure events and collections show +add+ entries")
    }
  });
}

//* Signout
function signOut() {
  // Remove name & collection from local storage
  localStorage.clear();
  tearDownUser();
  collection = [];

  // TODO: Clear elements on page
  //  - profile image
  //  - collection list
  JQ_IDs.collectionList.empty();
  //  - events list
  JQ_IDs.eventsList.empty();
}
//#endregion SIGN-IN/OUT


//#region BGG-LINK
let BGGAccount = "";
// Link to BG
function linkToBGG() {
  console.log("linking to BGG");
  localStorage.setItem(LOCAL_STORAGE_VARS.bggname, BGGAccount);
  thisUsersRef.update({ BGG: BGGAccount });
  // TODO: what else?
}
// Resync with BGG
function resyncWithBGG() {
  console.log("resyncing with BGG");
  localStorage.setItem(LOCAL_STORAGE_VARS.bggname, BGGAccount);
  thisUsersRef.update({ BGG: BGGAccount });
  // TODO: clear FB and local storage coll
  // TODO: API call 
}
//#endregion BGG-LINK


//#region GAMES COLLECTION
//* Fetch Firebase Collection
function populateCollectionFromFB(userRef) {
  console.log("populating collection from firebase refkey=", userRef.key);
  userRef.child("coll").once("value").then(function(dataSnap) {
    const val = dataSnap.val();
    if (!val){
      console.log("user has no collection on FB");
      console.log("VISUAL?: show where to add games, or link bgg")
      return;
    } else {
      console.log("user has collection on FB", val);
      console.log("show already be shown on screen by child_added");
    }
  });
}

//* Search BGG for game, to add to Collection
function searchBGG(gameTitle) {
  console.log("searching bgg for", gameTitle);
  console.log("VISUAL: clear previous search results");
  BGG_API.searchForGameByName(gameTitle).then( results => {
    console.log("search results", results);
    if (results.length === 0) {
      console.log("no results found");
    }
    else {
      // TODO: visuals
      console.log("VISUAL: add results to screen");
      //! TODO: add data attr for bggid
    }
  });
}

//* Add to Game Collection
function addGameToCollectionByID(id) {
  console.log("add game to collection by id", id);

  BGG_API.getGameInfoById(id).then(gameObjArray => {
    const gameObj = gameObjArray[0];
    // Add to Firebase 
    thisUsersRef.child("coll").push(gameObj);
    // Update local var 
    collection.push(gameObj);
    // Update local storage 
    localStorage.setItem(LOCAL_STORAGE_VARS.collection, JSON.stringify(collection));
  });
}

//* Manual Add to Collection
function manualAddGameToCollection() {
  //TODO: get data from FORM
  console.log("manual add game to collection");

  // const gameObj = gameObjArray[0];
  // Add to Firebase 
  let newGameRef = thisUsersRef.child("coll").push();
  const gameObj = {
    id: newGameRef.key, // use firebase's push() key for the id instead
  };
  newGameRef.set(gameObj);
  // Update local var 
  collection.push(gameObj);
  // Update local storage 
  localStorage.setItem(LOCAL_STORAGE_VARS.collection, JSON.stringify(collection));

  // let testManualGameObj = {
    // id          : item.$.id,
    // description : item.description,
    // thumbnailURL: item.thumbnail,
    // minage      : item.minage.$.value,
    // minplayers  : item.minplayers.$.value,
    // maxplayer   : item.maxplayers.$.value,
    // minplaytime : item.minplaytime.$.value,
    // maxplaytime : item.maxplaytime.$.value,
    // playingtime : item.playingtime.$.value,
    // weight      : item.statistics.ratings.averageweight.$.value,
  // };
}

//* Remove Game from Collection
function removeGameFromCollectionByID(id) {
  console.log("removing game from collection with id", id);
  thisUsersRef.child('coll')
    .orderByChild('id').equalTo(id)
    .once("value").then(snap => { 
      const val = snap.val();
      // console.log("snap val", Object.keys(val)[0]);
      thisUsersRef.child(`coll/${Object.keys(val)[0]}`).remove()
      .then( remvRes => {
        console.log("remove succeeded", remvRes);
      });
    });
}

//* Listeners
function listenForAddGame(args) {
  const val = args.val();
  console.log("heard you wanted to add a game", val);

  // Build clone
  let $clone = JQ_IDs.gameTemplate.clone().contents();
  $clone.find(DOM_FIND.gameTmp_img).attr({
    src: val.thumbnailURL,
  });
  $clone.find(DOM_FIND.gameTmp_title).text(val.name);
  $clone.attr({"data-bggid" : val.id});

  JQ_IDs.collectionList.prepend($clone);
}
function listenForRemoveGame(args) {
  const val = args.val();
  console.log("heard you wanted to remove a game", val, val.id);
  $(DOM_FIND.gameTmp_listItem).filter(`[data-bggid=${val.id}]`).remove();
}
//#endregion GAMES COLLECTION


//#region EVENTS
//* Fetch Firebase Events
function populateEventsFromFB(userRef) {
  console.log("populating events from firebase refkey=", userRef.key);
  userRef.child("myEvents").once("value").then(function(dataSnap) {
    const val = dataSnap.val();
    if (!val) {
      console.log("user has no events on FB");
      console.log("VISUAL?: show where to add/join events");
      return;
    } else {
      console.log("user has events on FB", val, "events should be on screen");
    }
  });
}

//* Create an Event
function creatEvent(eventObj) {
  console.log("create event from obj", eventObj);

  // Add to Firebase 
  let newEventRef = thisUsersRef.child("myEvents").push();
  const eventUID = newEventRef.key.slice(-6).toUpperCase(); //consider making our own UID generator and 'reducer'
  newEventRef.remove();
  eventObj.created = firebase.database.ServerValue.TIMESTAMP,
  eventsRef.child(eventUID).set(eventObj);
  thisUsersRef.child("myEvents").child(eventUID).set(eventObj);

  //? TODO: make this safer to make sure the event was added to ref list, before adding it to user ref 
  //? Update local var, local storage 
}

//TODO: edit event

//TODO: click/goto event

//TODO: join event
function joinEventByID(eventID) {
  eventID = eventID.toUpperCase();
  console.log("joining event by id", eventID);
  thisUsersRef.child("myEvents").once("value").then(snap => {
    if (snap.child(eventID).exists()) {
      console.log("user is already part of this event");
      //TODO: console.log("visually alert user")
    }
    else {
      eventsRef.once("value").then( snap => {
        const event = snap.child(eventID);
        if (event.exists()) {
          console.log("FB events has this ID", event, event.key, event.val());
          thisUsersRef.child("myEvents").child(event.key).set(event.val());
          console.log("copied to my events");
          //? TODO: link to set()'s success
        } else {
          console.log("FB doesn't know this ID");
        }
      });
    }
  });
}

//* Listeners
function listenForAddEvent(args) {
  const val = args.val();
  console.log("heard you wanted to add an event of mine", val, args.key);

  // Build an Event clone
  let $clone = JQ_IDs.eventTemplate.clone().contents();
  const dateWFormat = moment(val.data).format("dddd, MMMM Do");

  $clone.attr({
    "event-id": args.key,
  });
  $clone.find(DOM_FIND.eventTmp_title).text(val.name);
  $clone.find(DOM_FIND.eventTmp_date).text(dateWFormat);
  $clone.find(DOM_FIND.eventTmp_addr).text(val.address);

  JQ_IDs.eventsList.prepend($clone);
}

function listenForRemoveEvent(args) {
  console.log("heard you wanted to remove my event", args.val());
}
//#endregion EVENTS


//#region SUBMITS / CLICKS
JQ_IDs.loginForm.submit(function(event) {
  console.log("submitting login form!");
  event.preventDefault();

  let username_input = JQ_IDs.login_userName.val().trim();
  JQ_IDs.login_userName.val("");
  if (!username_input) {
    //? TODO: validate/notify that we need the username
    return false;
  }

  signIn(username_input);

  JQ_IDs.loginModal.foundation('close');

  return false;
});

JQ_IDs.eventForm.submit(function(event) {
  console.log("submitting event form!");
  event.preventDefault();

  let eventName_input = JQ_IDs.eventName.val().trim();
  let eventDate_input = JQ_IDs.eventDate.val().trim();
  let eventAddr_input = JQ_IDs.eventAddressFull.val().trim();
  console.log(eventName_input,eventDate_input,eventAddr_input);

  JQ_IDs.eventName.val("");
  JQ_IDs.eventDate.val("");
  if (!eventName_input || !eventDate_input){
    //? TODO: validate/notify we need name and date
    return false;
  }
  
  creatEvent({
    name: eventName_input,
    date: eventDate_input,
    address: eventAddr_input
  });
  
  JQ_IDs.eventAddressFull.val("");
  JQ_IDs.eventModal.foundation('close');
  
  return false;
});

JQ_IDs.signin_btn.click(function(event){
  JQ_IDs.loginModal.foundation('open');
});
JQ_IDs.signout_btn.click(signOut);

//#endregion SUBMITS / CLICKS


// #region START OF EXECUTION
// Check Local Storage for username
username = localStorage.getItem(LOCAL_STORAGE_VARS.username);
if (username) {
  console.log("local storage has a name", username);
  checkFBforName(username).then(doesExist => {
    console.log("user existence in FB? ", doesExist);
    if (doesExist) {
      // Firebase knows this name
      buildUpUser(username);
      // populateCollectionFromFB(thisUsersRef); 
      // populateEventsFromFB(thisUsersRef);
    } else {
      // Firebase does not have this name, local storage is invalid
      tearDownUser();
    }
  });
}

if (!username) { // using if (instead of else) in order to also catch invalid localstorage from above
  console.log("local storage has no name");
  JQ_IDs.signin_btn.show();
  JQ_IDs.signout_btn.hide();
  //? TODO: localStorage.clear(); //? clear other local storage? this correct, necessary to do?
  JQ_IDs.loginModal.foundation('open');
}

//#endregion START OF EXECUTION

// });