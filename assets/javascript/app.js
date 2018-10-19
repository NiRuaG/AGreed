// https://boardgamegeek.com/wiki/page/BGG_XML_API2
let BGG_API = {

  config: { 
    path: "", 
    params: {},
  },

  _makeCall() {
    const host = "https://www.boardgamegeek.com/xmlapi2";  

    const $params = $.param(this.config.params);
    const queryURL = `${host}${this.config.path}?${$params}`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    });
  },

  fetchUserOwnedCollection(user) {
    this.config.path = "/collection";
    this.config.params = {
      username: user,
      own: 1,
    };
  },

  checkUserName(name) {
    this.config.path = "/user";
    this.config.params = {
      name: name,
      buddies: 0,
      guilds: 0,
      domain: "boardgame"
    };
  },

  getGameInfoById(id) {
    this.config.path = "/thing"
    this.config.params = {
      id: id,
      type: "boardgame",
      stast: 1,
    }
  }
}

// my_collection = $.xml2json(xmlFromString);
    // my_collection = my_collection["#document"]["items"]["item"];
    // console.log(my_collection);
    // for (var i = 0; i < 10; i++) {
    //   const collItem = my_collection[i];
    //   const tb = collItem.thumbnail;
    //   console.log(tb);

    //   const name = collItem.name["_"];



    // let xmlFromString = $.parseXML(xmlString);
    // my_collection = $.xml2json(xmlFromString);
    // my_collection = my_collection["#document"]["items"]["item"];
    // console.log(my_collection);
    // for (var i = 0; i < 10; i++) {
    //   const collItem = my_collection[i];
    //   const tb = collItem.thumbnail;
    //   console.log(tb);

    //   const name = collItem.name["_"];

    //   let img = $("<img>").attr("src", tb);
    //   let li = $("<li>").append(img, $("<p>").text(name));
    //   $("#collectionList").append(li);
    //   // $("#collection").append($("<li>").text(my_collection[i].name['_']));
    // }
  // }

//   const events = {
//     create_eventName: null,
//     create_eventDate: null,
//     create_eventAddress: null,
//     create_eventCity: null,
//     create_eventState: null,
//     create_eventZip: null,
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
//     var eventAddress = events.create_eventAddress.val().trim();
//     var eventCity = events.create_eventCity.val().trim();
//     var eventState = events.create_eventState.val().trim();
//     var eventsZip = events.create_eventZip.val().trim();

//     // Create local object

//     // Uploads train data to the database
//     let newRef = eventsRef.child(eventName);
//     newRef.set({
//       date: eventDate,
//       Address: eventAddress,
//       City: eventCity,
//       State: eventState,
//       Zip: eventsZip
//     });

//     // Logs everything to console
//     // console.log(newUser.username);
//     // console.log(newUser.bgg);

//     // Clears all of the text-boxes
//     events.create_eventName.val("");
//     events.create_eventDate.val("");
//     events.create_eventAddress.val("");
//     events.create_eventCity.val("");
//     events.create_eventState.val("");
//     events.create_eventZip.val("");
//   });
// });
