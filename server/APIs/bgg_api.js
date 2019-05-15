// https://boardgamegeek.com/wiki/page/BGG_XML_API2
const { path, ifElse, or, isEmpty, isNil, identity, always } = require('ramda');

const pathToUserId = path(['user','$', 'id']);

// const makeObjOrReject = 
//   ifElse(
//     or(isEmpty, isNil),
//     always(Promise.reject("path to user's id is empty or DNE")),
//     always({ id: identity })
//   );

module.exports = {
  
  // _getAjax(({params, path})) {
  //   const host = "https://www.boardgamegeek.com/xmlapi2";
  //   const $params = $.param(params);
  //   const queryURL = `${host}${path}?${$params}`;

  //   return $.ajax({
  //     // url: "https://httpstat.us/202",
  //     url: queryURL,
  //     method: "GET",
  //     // statusCode: {
  //     //   202: () => {
  //     //     console.log("202?!");
  //     //   }
  //     // }
  //   })
  //     // .done( (data, textStatus, jqXHR) => {
  //     //   // console.log(data, textStatus, jqXHR);
  //     //   console.log(jqXHR.status);
  //     //   if (jqXHR.status === 202) {
  //     //     console.log("202 HERE =O");
  //     //     throw "202";
  //     //   }
  //     // })
  //     .then(
  //       (data, textStatus, jqXHR) => {
  //         return $.xml2json(data)["#document"];
  //       },

  //       (jqXHR, textStatus) => {
  //         console.log("$ajax.then fail: ", textStatus, jqXHR.status);
  //       })

  //     .catch(error => {
  //       console.log("Error @ _getAjax", error);
  //     });
  // },


  // getUsersOwnedCollection(user) {
  //   BGG_API.config = {
  //     path: "/collection",
  //     params: {
  //       username: user,
  //       own: 1
  //     }
  //   };

  //   return BGG_API._getAjax().then(function (collectionObj) {
  //     // console.log(collectionObj.items.item);
  //     let mapped = collectionObj.items.item.map(item => {
  //       return {
  //         name: item.name._,
  //         id: item.$.objectid,
  //         imageURL: item.image,
  //         thumbnailURL: item.thumbnail
  //       };
  //     });
  //     // console.log(mapped);
  //     return mapped;
  //   });
  // },

  
  checkUserName(name) {
    config = {
      path: "/user",
      params: {
        name   : name,       // target
        buddies: 0,          // ignore
        guilds : 0,          // ignore
        domain : "boardgame" // filter
      }
    };

    // id will be a # (as a string) IF the username exists, blank ("") otherwise
    // user.$.name will be a copy of whatever the query parameter was, also copying upper/lower cases
    return (
      // BGG_API._getAjax(config)
      Promise.resolve({ user: { $: { xid: '123' } } })
      .then(pathToUserId) // get .user.$.id if exists otherwise undefined

      .then(id => id
        ? { id }
        : Promise.reject("path to user's id is empty or DNE")
      )
      // .then(makeObjOrReject)

      .catch(error => {
        console.log("Error @ checkUserName", error);
      })
    );
  },

  // getGameInfoById(gameIDs) {
  //   BGG_API.config = {
  //     path: "/thing",
  //     params: {
  //       id: gameIDs,
  //       type: "boardgame",
  //       stats: 1
  //     }
  //   };


  //   return BGG_API._getAjax()
  //     .then(function (thingObj) {
  //       let gameInfos = thingObj.items.item;
  //       console.log("thingobj: ", gameInfos);
  //       if (!Array.isArray(gameInfos)) {
  //         gameInfos = [gameInfos]; // force to an array (of 1 item)
  //       }
  //       let mapped = gameInfos.map(item => {
  //         // sometimes the name has results in different languages
  //         if (!Array.isArray(item.name)) {
  //           item.name = [item.name];
  //         }
  //         return {
  //           id: item.$.id,
  //           name: item.name[0].$.value,
  //           description: item.description,
  //           imageURL: item.image,
  //           thumbnailURL: item.thumbnail,
  //           minage: item.minage.$.value,
  //           minplayers: item.minplayers.$.value,
  //           maxplayers: item.maxplayers.$.value,
  //           minplaytime: item.minplaytime.$.value,
  //           maxplaytime: item.maxplaytime.$.value,
  //           playingtime: item.playingtime.$.value,
  //           weight: item.statistics.ratings.averageweight.$.value,
  //         };
  //       });
  //       // console.log(mapped);
  //       return mapped;
  //     })
  //     .catch(function (error) {
  //       console.log("Error @ getGameInfoById", error);
  //     });
  // },


  // searchForGameByName(name) {
  //   BGG_API.config = {
  //     path: "/search",
  //     params: {
  //       query: name,
  //       type: "boardgame"
  //     }
  //   };

  //   return BGG_API._getAjax()
  //     .then(function (searchResults) {
  //       // console.log(searchResults);
  //       if (searchResults.items.$.total !== "0") {
  //         // console.log("BGG API/ajax/searchResults", searchResults.items.item);
  //         let ids = "";
  //         searchResults.items.item.forEach(item => {
  //           ids += item.$.id + ","
  //         });
  //         return ids;
  //       }
  //       else { // no results
  //         return null; // no ids to forward
  //       }
  //     })
  //     .then(function (gameIDs) {
  //       if (gameIDs)
  //         return BGG_API.getGameInfoById(gameIDs);
  //       else // no results, no ids => empty array
  //         return [];
  //     })
  //     .catch(function (error) {
  //       console.log("Error @ searchForGameByName", error);
  //     });
  // }
};

