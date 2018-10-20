$(document).ready(() => {
  console.log("EVENTS READY!");
  initFB();

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
});
