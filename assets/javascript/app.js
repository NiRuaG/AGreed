$(document).ready(() => {
  "use strict";

  var my_collection;

  // #region xmlstring
  let xmlString = `<?xml version="1.0" encoding="utf-8" standalone="yes"?> <items totalitems="271" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse" pubdate="Mon, 15 Oct 2018 00:18:57 +0000"> <item objecttype="thing" objectid="68448" subtype="boardgame" collid="24961369"> <name sortindex="1">7 Wonders</name> <yearpublished>2010</yearpublished>			<image>https://cf.geekdo-images.com/original/img/3DP_RW5lTX0WrV67s8qi8CsiXoQ=/0x0/pic860217.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/Grz-qM9xwxlvQGK7B-MiljtO9pQ=/fit-in/200x150/pic860217.jpg</thumbnail> <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2017-07-10 18:27:03" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="155987" subtype="boardgame" collid="43725531"> <name sortindex="1">Abyss</name> <yearpublished>2014</yearpublished>			<image>https://cf.geekdo-images.com/original/img/QZD3-w6S6hbAQO7AfTFc342WsqI=/0x0/pic1965255.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/89XgMkYK9NLsjRxzSXm3JK9jou0=/fit-in/200x150/pic1965255.jpg</thumbnail> <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2017-07-10 17:47:38" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="31260" subtype="boardgame" collid="24027746"> <name sortindex="1">Agricola</name> <yearpublished>2007</yearpublished>			<image>https://cf.geekdo-images.com/original/img/L-UBO3rBOmvIrZHZLSXOypyAUPw=/0x0/pic259085.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/zl48oz7IeKlgWJVBLYd0nFJumdA=/fit-in/200x150/pic259085.jpg</thumbnail> <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2014-08-15 17:42:57" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="119890" subtype="boardgame" collid="24961412"> <name sortindex="1">Agricola: All Creatures Big and Small</name> <yearpublished>2012</yearpublished>			<image>https://cf.geekdo-images.com/original/img/jeB8MXXENLZyEfwdcM5yD6OmUYw=/0x0/pic1514252.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/Vt9igzurW29IDvWChj7AXzl8Fxs=/fit-in/200x150/pic1514252.jpg</thumbnail> <status own="0" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="1" wishlistpriority="5" preordered="0" lastmodified="2014-09-28 21:29:57" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="43018" subtype="boardgame" collid="25116149"> <name sortindex="1">Agricola: Farmers of the Moor</name> <yearpublished>2009</yearpublished>			<image>https://cf.geekdo-images.com/original/img/A_qTRozM63XVIAlhvrqHAMoIFuQ=/0x0/pic568164.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/a75kvmv-PtlI_D-dcP4RkpfzUFE=/fit-in/200x150/pic568164.jpg</thumbnail> <status own="0" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="1" wishlistpriority="2" preordered="0" lastmodified="2014-10-11 01:17:20" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="6249" subtype="boardgame" collid="24402544"> <name sortindex="1">Alhambra</name> <yearpublished>2003</yearpublished>			<image>https://cf.geekdo-images.com/original/img/ydyfKVtjjidDlseOP2rL2HHCD8Y=/0x0/pic1502118.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/IHP0JMesp62lvYC-4TXLCipOuWc=/fit-in/200x150/pic1502118.jpg</thumbnail> <status own="0" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="1" wishlistpriority="3" preordered="0" lastmodified="2014-09-28 21:37:11" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="1417" subtype="boardgame" collid="43726094"> <name sortindex="1">Alibi</name> <yearpublished>1993</yearpublished>			<image>https://cf.geekdo-images.com/original/img/NRQuEEhB4qVgHAxfqPxxGU6zmv8=/0x0/pic1511858.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/aXTciMvduwW5-ocaXG7Va-SzCcw=/fit-in/200x150/pic1511858.jpg</thumbnail> <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2017-07-10 18:24:32" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="110277" subtype="boardgame" collid="24961531"> <name sortindex="1">Among the Stars</name> <yearpublished>2012</yearpublished>			<image>https://cf.geekdo-images.com/original/img/YfZDrdGnVZqfp3Bgkl-TPdXPqRU=/0x0/pic2037906.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/4LU_WjnaPnadLCLtKxcnGMY7fq4=/fit-in/200x150/pic2037906.jpg</thumbnail> <status own="0" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="1" wishlistpriority="3" preordered="0" lastmodified="2014-09-28 21:39:15" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="124742" subtype="boardgame" collid="24027803"> <name sortindex="1">Android: Netrunner</name> <yearpublished>2012</yearpublished>			<image>https://cf.geekdo-images.com/original/img/Wbp__Fl6QDKqzealhK2SDpoEk_g=/0x0/pic3738560.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/fJp94uxjjBE5bGT0IxWZ5ePpe8A=/fit-in/200x150/pic3738560.jpg</thumbnail> <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2014-08-15 17:43:05" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="139596" subtype="boardgame" collid="43725510"> <name sortindex="1">Android: Netrunner – Creation and Control</name> <yearpublished>2013</yearpublished>			<image>https://cf.geekdo-images.com/original/img/Fx5M1d33fR3lsQLN76fFym8PB1c=/0x0/pic1639594.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/JPMgyCo6e4-jFnynyjs-mKs8u2M=/fit-in/200x150/pic1639594.jpg</thumbnail> <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2017-07-10 17:46:10" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="152314" subtype="boardgame" collid="43725498"> <name sortindex="1">Android: Netrunner – Honor and Profit</name> <yearpublished>2014</yearpublished>			<image>https://cf.geekdo-images.com/original/img/n2EZvAj72YFlKj5w_GpkrRe7UiE=/0x0/pic1878471.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/orFq3sbx0zHsMJVOf110FspOrUM=/fit-in/200x150/pic1878471.jpg</thumbnail> <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2017-07-10 17:45:29" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="74" subtype="boardgame" collid="43725527"> <name sortindex="1">Apples to Apples</name> <yearpublished>2005</yearpublished>			<image>https://cf.geekdo-images.com/original/img/tsFiO-PD3W9xI5CmbRGBdIj3Eao=/0x0/pic577739.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/0XATfRHA-gYzCA3psZ6OUaQsgXI=/fit-in/200x150/pic577739.jpg</thumbnail> <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2017-07-10 17:47:19" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="15987" subtype="boardgame" collid="24027916"> <name sortindex="1">Arkham Horror</name> <yearpublished>2005</yearpublished>			<image>https://cf.geekdo-images.com/original/img/oArWMFiDP2tYbJvCY52jeLwlCyU=/0x0/pic175966.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/iYGd4Rb34uNe6HRPUu9AWJzePtc=/fit-in/200x150/pic175966.jpg</thumbnail> <status own="0" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="1" wishlistpriority="3" preordered="0" lastmodified="2014-07-15 11:23:41" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="39683" subtype="boardgame" collid="24961447"> <name sortindex="1">At the Gates of Loyang</name> <yearpublished>2009</yearpublished>			<image>https://cf.geekdo-images.com/original/img/heq9_9W9Dq6BA5mWQlQLnRuqp_E=/0x0/pic3601060.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/gXKvWQk7Hn_Ktq7ycn3Y8lX0j7I=/fit-in/200x150/pic3601060.jpg</thumbnail> <status own="0" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="1" wishlistpriority="4" preordered="0" lastmodified="2014-09-28 21:32:11" /> <numplays>0</numplays>							</item> <item objecttype="thing" objectid="230802" subtype="boardgame" collid="47752905"> <name sortindex="1">Azul</name> <yearpublished>2017</yearpublished>			<image>https://cf.geekdo-images.com/original/img/9-SR48jyfxs4At6255sjHoly2sw=/0x0/pic3718275.jpg</image> <thumbnail>https://cf.geekdo-images.com/thumb/img/_ed_JktpgFwTr2WjEQgYMzHBvOQ=/fit-in/200x150/pic3718275.jpg</thumbnail> <status own="0" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="1" wishlistpriority="4" preordered="0" lastmodified="2017-12-18 14:01:30" /> <numplays>0</numplays>							</item> </items>`;
  // #endregion

  const JQ_IDs = {
    signup_userName: null,
    signup_bggUserName: null,
    signup_submit: null
  };
  for (let id of Object.keys(JQ_IDs)) {
    JQ_IDs[id] = $(`#${id}`);
  }

  //#region Sign-Up 'Page'
  // JQ_IDs.signup_submit.submit(function(event) {
  //   event.preventDefault();
  //   JQ_IDs.signup_userName.val().trim();
  //   JQ_IDs.signup_bggUserName.val().trim();
  // });
  //#endregion

  // Add to your collection

  // Get a user's collection
  function getAUsersCollection(bggName) {
    // https://boardgamegeek.com/wiki/page/BGG_XML_API2

    $.ajax({
      url: `https://www.boardgamegeek.com/xmlapi2/collection?username=${bggName}&own=1`
    }).then(response => {
      my_collection = $.xml2json(response);
      my_collection = my_collection["#document"]["items"]["item"];

      for (var i = 0; i < my_collection.length; i++) {
        const collItem = my_collection[i];
        const tb = collItem.thumbnail;

        const name = collItem.name["_"];

        let img = $("<img>").attr("src", tb);
        let li = $("<li>").append(img, $("<p>").text(name));
        $("#collectionList").append(li);
      }
    });

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
  }

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBDZKBHGZEdHDkf3NAPWIFJsPL7VYkFqhs",
    authDomain: "not-so-bored-games.firebaseapp.com",
    databaseURL: "https://not-so-bored-games.firebaseio.com",
    projectId: "not-so-bored-games",
    storageBucket: "not-so-bored-games.appspot.com",
    messagingSenderId: "1049713805315"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var userNamesRef = database.ref("/usernames");
  var eventsRef = database.ref("/events");

  // Button for adding trains
  JQ_IDs.signup_submit.on("click", function(event) {
    event.preventDefault();

    // Grab user input
    var uniqueUsername = JQ_IDs.signup_userName.val().trim();
    // if (!uniqueUsername) {
    //   // TODO: validate/notify that we need the username
    //   return;
    // }
    var bggUsername = JQ_IDs.signup_bggUserName.val().trim();

    // Create local object
    var newUser = {
      username: uniqueUsername,
      bgg: bggUsername
    };

    // Uploads train data to the database
    let myRef = userNamesRef.child(uniqueUsername);
    myRef.set({ bgg: bggUsername });

    // Logs everything to console
    console.log(newUser.username);
    console.log(newUser.bgg);

    // Clears all of the text-boxes
    JQ_IDs.signup_userName.val("");
    JQ_IDs.signup_bggUserName.val("");

    if (bggUsername) {
      getAUsersCollection(bggUsername);
    }
  });

  const events = {
    create_eventName: null,
    create_eventDate: null,
    create_eventAddress: null,
    create_eventCity: null,
    create_eventState: null,
    create_eventZip: null,
    create_submit: null
  };
  for (let id of Object.keys(events)) {
    events[id] = $(`#${id}`);
  }

  events.create_submit.on("click", function(event) {
    event.preventDefault();

    // Grab user input
    var eventName = events.create_eventName.val().trim();
    var eventDate = events.create_eventDate.val().trim();
    var eventAddress = events.create_eventAddress.val().trim();
    var eventCity = events.create_eventCity.val().trim();
    var eventState = events.create_eventState.val().trim();
    var eventsZip = events.create_eventZip.val().trim();

    // Create local object

    // Uploads train data to the database
    let newRef = eventsRef.child(eventName);
    newRef.set({
      date: eventDate,
      Address: eventAddress,
      City: eventCity,
      State: eventState,
      Zip: eventsZip
    });

    // Logs everything to console
    // console.log(newUser.username);
    // console.log(newUser.bgg);

    // Clears all of the text-boxes
    events.create_eventName.val("");
    events.create_eventDate.val("");
    events.create_eventAddress.val("");
    events.create_eventCity.val("");
    events.create_eventState.val("");
    events.create_eventZip.val("");
  });
});
