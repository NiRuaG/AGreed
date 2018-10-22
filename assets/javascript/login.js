// $(document).ready(() => {
"use strict";
console.log("LOGIN READY!");

//#region DOM ELEMENTS
const JQ_IDs = {
  loginForm      : null,
  login_userName : null,
  login_submit   : null,
  loginModal     : null,

  collectionList : null,
  gameTemplate : null,
};
for (let id of Object.keys(JQ_IDs)) {
  JQ_IDs[id] = $(`#${id}`);
}

const DOM_FIND = {
  gameTmp_listItem : ".gameTmp_listItem",
  gameTmp_title    : ".gameTmp_title",
  gameTmp_img      : ".gameTmp_img",
}

const JQ_CLASSes = {
};
for (let cl of Object.keys(JQ_CLASSes)) {
  JQ_IDs[cl] = $(`.${cl}`);
}
//#endregion DOM ELEMENTS

// Firebase References
let database = getFirebaseDB();
let userNamesRef = database.ref("/usernames");
let    eventsRef = database.ref("/events");

// Page-local variables
let thisUsersRef = null;
let username = "";
let collection = [];

function buildUpUser(username) {
  username = username.toLowerCase();
  console.log("building up user", username)
  localStorage.setItem(LOCAL_STORAGE_VARS.username, username);
  thisUsersRef = userNamesRef.child(username);
  thisUsersRef.child("coll"    ).on("child_added"  , listenForAddGame    );
  thisUsersRef.child("coll"    ).on("child_removed", listenForRemoveGame );
  thisUsersRef.child("myEvents").on("child_added"  , listenForAddEvent   );
  thisUsersRef.child("myEvents").on("child_removed", listenForRemoveEvent);
}

function tearDownUser() {
  console.log("tearing down user");
  if (thisUsersRef) {
    thisUsersRef.child("coll"    ).off("child_added"  , listenForAddGame    );
    thisUsersRef.child("coll"    ).off("child_removed", listenForRemoveGame );
    thisUsersRef.child("myEvents").off("child_added"  , listenForAddEvent   );
    thisUsersRef.child("myEvents").off("child_removed", listenForRemoveEvent);
  }
  thisUsersRef = null;
  localStorage.removeItem(LOCAL_STORAGE_VARS.username);
  username = "";
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
      console.log("user already has account on FB");
      // Firebase knows this name
      populateCollectionFromFB(thisUsersRef);
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
  //  - events list
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
      console.log("show games collection on screen");
      //TODO: show events on screen
    }
  });
}

//* Search BGG for game, to add to Collection
function searchBGG(gameTitle) {
  console.log("searching bgg for", gameTitle);
  console.log("VISUAL: clear previous search results");
  BGG_API.searchForGameByName(gameTitle).then( results => {
    console.log("search results", results);
    if (results.length === 0){
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
  //
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
  userRef.child("events").once("value").then(function(dataSnap) {
    const val = dataSnap.val();
    if (!val){
      console.log("user has no events on FB");
      console.log("VISUAL?: show where to add/join events");
      return;
    } else {
      console.log("user has events on FB", val);
      console.log("show events on screen");
      //TODO: show events on screen
    }
  });
}

//* Create an Event
function creatEvent() {
  //TODO: get data from FORM
  console.log("add event to list");

  // Add to Firebase 
  let newEventRef = thisUsersRef.child("myEvents").push();
  const eventUID = newEventRef.key.slice(-6).toUpperCase();
  newEventRef.remove();
  const eventObj = {
    created: firebase.database.ServerValue.TIMESTAMP,
    /* // TODO: other form info
    - expiration
    - descrip 
    */
  };
  eventsRef.child(eventUID).set(eventObj);
  thisUsersRef.child("myEvents").child(eventUID).set(eventObj);
  //? TODO: make this safer to make sure the event was added to ref list, before adding it to user ref
  //? Update local var 
  // collection.push(gameObj);
  //? Update local storage 
  // localStorage.setItem(LOCAL_STORAGE_VARS.collection, JSON.stringify(collection));
}


//TODO: edit event
//TODO: click/goto event
//TODO: join event

//* Listeners
function listenForAddEvent(args) {
  const val = args.val();
  console.log("heard you wanted to add an event", val);

  //! TODO: CPR
  // Build clone
//   let $clone = JQ_IDs.gameTemplate.clone().contents();
//   $clone.find(DOM_FIND.gameTmp_img).attr({
//     src: val.thumbnailURL,
//   });
//   $clone.find(DOM_FIND.gameTmp_title).text(val.name);
//   $clone.attr("data-bggid", val.id);

//   JQ_IDs.collectionList.prepend($clone);
// }
}
function listenForRemoveEvent(args) {
  console.log("heard you wanted to remove a game", args.val());
}
//#endregion EVENTS


//#region SUBMITS / CLICKS
JQ_IDs.loginForm.submit(function(event) {
  console.log("submitting form!");
  event.preventDefault();

  var username_input = JQ_IDs.login_userName.val().trim();
  if (!username_input) {
    //? TODO: validate/notify that we need the username
    return false;
  }

  signIn(username_input);

  JQ_IDs.login_userName.val("");
  JQ_IDs.loginModal.foundation('close');

  return false;
});
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
      populateCollectionFromFB(thisUsersRef);
      populateEventsFromFB(thisUsersRef);
    } else {
      // Firebase does not have this name, local storage is invalid
      tearDownUser();
    }
  });
}
if (!username) { // using if (instead of else) in order to also catch invalid localstorage from above
  console.log("local storage has no name");
  //? TODO: localStorage.clear(); //? clear other local storage? this correct, necessary to do?
  JQ_IDs.loginModal.foundation('open');
}

// TODO: bggUser  = localStorage.getItem(LOCAL_STORAGE_VARS.bggname );
//#endregion START OF EXECUTION

// });
