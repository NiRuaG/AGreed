$(document).ready(() => {
  "use strict";
  console.log("LOGIN READY!");

  const JQ_IDs = {
    signup_form: null,
    signup_userName: null,
    signup_bggUserName: null,
    signup_submit: null
  };
  for (let id of Object.keys(JQ_IDs)) {
    JQ_IDs[id] = $(`#${id}`);
  }

  // Check Local Storage
  let username = localStorage.getItem(LOCAL_STORAGE_VARS.username);
  if (username){
    console.log("GOT A NAME!", username);
  }
  else {
    console.log("NEED A NAME");
  }


  let database = getFirebaseDB();
  var userNamesRef = database.ref("/usernames");


  JQ_IDs.signup_form.submit(function(event) {
    event.preventDefault();

    var username = JQ_IDs.signup_userName.val().trim();
    if (!username) {
      // TODO: validate/notify that we need the username
      return false;
    }

    localStorage.setItem(LOCAL_STORAGE_VARS.username, username);

    var bggUsername = JQ_IDs.signup_bggUserName.val().trim();

    let myRef = userNamesRef.child(username);
    myRef.set({ bgg: bggUsername });

    // Clear form inputs
    JQ_IDs.signup_userName   .val("");
    JQ_IDs.signup_bggUserName.val("");

    // if (bggUsername) {
    //   BGG_API.checkUserName(bggUsername).then(nameObj => {
    //     console.log(nameObj);
    //   });
    // }
    return false;
  });
});
