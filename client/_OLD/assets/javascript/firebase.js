function getFirebaseDB() {
  var config = {
    apiKey: "AIzaSyDPkWFaZvNUIijJq79Ig9F1wAIjiB5l5Z4",
    authDomain: "not-so-bored-games-c540e.firebaseapp.com",
    databaseURL: "https://not-so-bored-games-c540e.firebaseio.com",
    projectId: "not-so-bored-games-c540e",
    storageBucket: "not-so-bored-games-c540e.appspot.com",
    messagingSenderId: "74293518957"
  };

  firebase.initializeApp(config);

  return firebase.database();
}
