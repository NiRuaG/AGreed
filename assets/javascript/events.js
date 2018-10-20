$(document).ready(() => {
  console.log("EVENTS READY!");
  initFB();

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
});
