const LOCAL_STORAGE_VARS = {
  username: "username",
  bggname: "bggname",
  collection: "coll",
};

// https://boardgamegeek.com/wiki/page/BGG_XML_API2
let BGG_API = {
  config: {
    path: "",
    params: {}
  },

  _getAjax() {
    const host = "https://www.boardgamegeek.com/xmlapi2";
    const $params = $.param(BGG_API.config.params);
    const queryURL = `${host}${BGG_API.config.path}?${$params}`;

    return $.ajax({
      // url: "https://httpstat.us/202",
      url: queryURL,
      method: "GET",
      // statusCode: {
      //   202: () => {
      //     console.log("202?!");
      //   }
      // }
    })
      // .done( (data, textStatus, jqXHR) => {
      //   // console.log(data, textStatus, jqXHR);
      //   console.log(jqXHR.status);
      //   if (jqXHR.status === 202) {
      //     console.log("202 HERE =O");
      //     throw "202";
      //   }
      // })
      .then(
        (data, textStatus, jqXHR) => {
          return $.xml2json(data)["#document"]; },

        (jqXHR, textStatus) => {
          console.log("$ajax.then fail: ", textStatus, jqXHR.status); })

      .catch(error => {
        console.log("Error @ _getAjax", error);
      });
  },

  getUsersOwnedCollection(user) {
    BGG_API.config = {
      path: "/collection",
      params: {
        username: user,
        own: 1
      }
    };

    // #region Example Response
    // let exampleRespObj = [ { "$": { "objecttype": "thing", "objectid": "68448", "subtype": "boardgame", "collid": "24961369" }, "name": { "$": { "sortindex": "1" }, "_": "7 Wonders" }, "yearpublished": "2010", "image": "https://cf.geekdo-images.com/original/img/3DP_RW5lTX0WrV67s8qi8CsiXoQ=/0x0/pic860217.jpg", "thumbnail": "https://cf.geekdo-images.com/thumb/img/Grz-qM9xwxlvQGK7B-MiljtO9pQ=/fit-in/200x150/pic860217.jpg", "status": { "$": { "own": "1", "prevowned": "0", "fortrade": "0", "want": "0", "wanttoplay": "0", "wanttobuy": "0", "wishlist": "0", "preordered": "0", "lastmodified": "2017-07-10 18:27:03" }, "_": "" }, "numplays": "0" }, { "$": { "objecttype": "thing", "objectid": "155987", "subtype": "boardgame", "collid": "43725531" }, "name": { "$": { "sortindex": "1" }, "_": "Abyss" }, "yearpublished": "2014", "image": "https://cf.geekdo-images.com/original/img/QZD3-w6S6hbAQO7AfTFc342WsqI=/0x0/pic1965255.jpg", "thumbnail": "https://cf.geekdo-images.com/thumb/img/89XgMkYK9NLsjRxzSXm3JK9jou0=/fit-in/200x150/pic1965255.jpg", "status": { "$": { "own": "1", "prevowned": "0", "fortrade": "0", "want": "0", "wanttoplay": "0", "wanttobuy": "0", "wishlist": "0", "preordered": "0", "lastmodified": "2017-07-10 17:47:38" }, "_": "" }, "numplays": "0" }, { "$": { "objecttype": "thing", "objectid": "31260", "subtype": "boardgame", "collid": "24027746" }, "name": { "$": { "sortindex": "1" }, "_": "Agricola" }, "yearpublished": "2007", "image": "https://cf.geekdo-images.com/original/img/L-UBO3rBOmvIrZHZLSXOypyAUPw=/0x0/pic259085.jpg", "thumbnail": "https://cf.geekdo-images.com/thumb/img/zl48oz7IeKlgWJVBLYd0nFJumdA=/fit-in/200x150/pic259085.jpg", "status": { "$": { "own": "1", "prevowned": "0", "fortrade": "0", "want": "0", "wanttoplay": "0", "wanttobuy": "0", "wishlist": "0", "preordered": "0", "lastmodified": "2014-08-15 17:42:57" }, "_": "" }, "numplays": "0" } ];
    // #endregion Example Response

    return BGG_API._getAjax().then(function(collectionObj) {
      // console.log(collectionObj.items.item);
      let mapped = collectionObj.items.item.map( item => {
        return {
          name        : item.name._,
          objectid    : item.$.objectid,
          imageURL    : item.image,
          thumbnailURL: item.thumbnail
        };
      });
      // console.log(mapped);
      return mapped;
    });
  },

  checkUserName(name) {
    BGG_API.config = {
      path: "/user",
      params: {
        name   : name,       // target
        buddies: 0,          // ignore
        guilds : 0,          // ignore
        domain : "boardgame" // filter
      }
    };
    // #region Example Response
    // let exampleRespObj_valid = { "$": {}, "user": { "$": { "id": "917172", "name": "NiRuaG", "termsofuse": "https://boardgamegeek.com/xmlapi/termsofuse" }, "firstname": { "$": { "value": "a" }, "_": "" }, "lastname": { "$": { "value": "g" }, "_": "" }, "avatarlink": { "$": { "value": "N/A" }, "_": "" }, "yearregistered": { "$": { "value": "2014" }, "_": "" }, "lastlogin": { "$": { "value": "2018-10-17" }, "_": "" }, "stateorprovince": { "$": { "value": "" }, "_": "" }, "country": { "$": { "value": "" }, "_": "" }, "webaddress": { "$": { "value": "" }, "_": "" }, "xboxaccount": { "$": { "value": "" }, "_": "" }, "wiiaccount": { "$": { "value": "" }, "_": "" }, "psnaccount": { "$": { "value": "" }, "_": "" }, "battlenetaccount": { "$": { "value": "" }, "_": "" }, "steamaccount": { "$": { "value": "" }, "_": "" }, "traderating": { "$": { "value": "0" }, "_": "" }, "marketrating": { "$": { "value": "0" }, "_": "" } } };
    // #endregion Example Response

    // user.$.id will be a # (string) IF the username exists, blank ("") otherwise
    // user.$.name will be a copy of whatever the query parameter was, also copying upper/lower cases
    return BGG_API._getAjax().then(function(nameObj) {
      return { id: nameObj.user.$.id };
    })
    .catch(function(error) {
      console.log("Error @ checkUserName", error);
    });
  },

  getGameInfoById(gameIDs) {
    BGG_API.config = {
      path: "/thing",
      params: {
        id: gameIDs,
        type: "boardgame",
        stats: 1
      }
    };

    // #region Example Response
    // let exampleRespObj_empty = { "$": {}, "items": { "$": { "termsofuse": "https://boardgamegeek.com/xmlapi/termsofuse" }, "_": "" } };
    // let exampleRespObj_valid = { "$": {}, "items": { "$": { "termsofuse": "https://boardgamegeek.com/xmlapi/termsofuse" }, "item": { "$": { "type": "boardgame", "id": "68448" }, "thumbnail": "https://cf.geekdo-images.com/thumb/img/Grz-qM9xwxlvQGK7B-MiljtO9pQ=/fit-in/200x150/pic860217.jpg", "image": "https://cf.geekdo-images.com/original/img/3DP_RW5lTX0WrV67s8qi8CsiXoQ=/0x0/pic860217.jpg", "name": [{ "$": { "type": "primary", "sortindex": "1", "value": "7 Wonders" }, "_": "" }, { "$": { "type": "alternate", "sortindex": "1", "value": "7 csoda" }, "_": "" }, { "$": { "type": "alternate", "sortindex": "1", "value": "7 Cudów Świata" }, "_": "" }, { "$": { "type": "alternate", "sortindex": "1", "value": "7 divů světa" }, "_": "" }, { "$": { "type": "alternate", "sortindex": "1", "value": "7 чудес" }, "_": "" }, { "$": { "type": "alternate", "sortindex": "1", "value": "Τα 7 θαύματα του κόσμου" }, "_": "" }, { "$": { "type": "alternate", "sortindex": "1", "value": "七大奇蹟" }, "_": "" }, { "$": { "type": "alternate", "sortindex": "1", "value": "世界の七不思議" }, "_": "" }], "description": "You are the leader of one of the 7 great cities of the Ancient World. Gather resources, develop commercial routes, and affirm your military supremacy. Build your city and erect an architectural wonder which will transcend future times.&#10;&#10;7 Wonders lasts three ages. In each age, players receive seven cards from a particular deck, choose one of those cards, then pass the remainder to an adjacent player. Players reveal their cards simultaneously, paying resources if needed or collecting resources or interacting with other players in various ways. (Players have individual boards with special powers on which to organize their cards, and the boards are double-sided). Each player then chooses another card from the deck they were passed, and the process repeats until players have six cards in play from that age. After three ages, the game ends.&#10;&#10;In essence, 7 Wonders is a card development game. Some cards have immediate effects, while others provide bonuses or upgrades later in the game. Some cards provide discounts on future purchases. Some provide military strength to overpower your neighbors and others give nothing but victory points. Each card is played immediately after being drafted, so you'll know which cards your neighbor is receiving and how his choices might affect what you've already built up. Cards are passed left-right-left over the three ages, so you need to keep an eye on the neighbors in both directions.&#10;&#10;Though the box of earlier editions is listed as being for 3&ndash;7 players, there is an official 2-player variant included in the instructions.&#10;&#10;", "yearpublished": { "$": { "value": "2010" }, "_": "" }, "minplayers": { "$": { "value": "2" }, "_": "" }, "maxplayers": { "$": { "value": "7" }, "_": "" }, "poll": [{ "$": { "name": "suggested_numplayers", "title": "User Suggested Number of Players", "totalvotes": "1646" }, "results": [{ "$": { "numplayers": "1" }, "result": [{ "$": { "value": "Best", "numvotes": "4" }, "_": "" }, { "$": { "value": "Recommended", "numvotes": "11" }, "_": "" }, { "$": { "value": "Not Recommended", "numvotes": "922" }, "_": "" }] }, { "$": { "numplayers": "2" }, "result": [{ "$": { "value": "Best", "numvotes": "108" }, "_": "" }, { "$": { "value": "Recommended", "numvotes": "318" }, "_": "" }, { "$": { "value": "Not Recommended", "numvotes": "749" }, "_": "" }] }, { "$": { "numplayers": "3" }, "result": [{ "$": { "value": "Best", "numvotes": "358" }, "_": "" }, { "$": { "value": "Recommended", "numvotes": "840" }, "_": "" }, { "$": { "value": "Not Recommended", "numvotes": "146" }, "_": "" }] }, { "$": { "numplayers": "4" }, "result": [{ "$": { "value": "Best", "numvotes": "843" }, "_": "" }, { "$": { "value": "Recommended", "numvotes": "565" }, "_": "" }, { "$": { "value": "Not Recommended", "numvotes": "29" }, "_": "" }] }, { "$": { "numplayers": "5" }, "result": [{ "$": { "value": "Best", "numvotes": "693" }, "_": "" }, { "$": { "value": "Recommended", "numvotes": "661" }, "_": "" }, { "$": { "value": "Not Recommended", "numvotes": "42" }, "_": "" }] }, { "$": { "numplayers": "6" }, "result": [{ "$": { "value": "Best", "numvotes": "318" }, "_": "" }, { "$": { "value": "Recommended", "numvotes": "848" }, "_": "" }, { "$": { "value": "Not Recommended", "numvotes": "122" }, "_": "" }] }, { "$": { "numplayers": "7" }, "result": [{ "$": { "value": "Best", "numvotes": "289" }, "_": "" }, { "$": { "value": "Recommended", "numvotes": "773" }, "_": "" }, { "$": { "value": "Not Recommended", "numvotes": "210" }, "_": "" }] }, { "$": { "numplayers": "7+" }, "result": [{ "$": { "value": "Best", "numvotes": "26" }, "_": "" }, { "$": { "value": "Recommended", "numvotes": "67" }, "_": "" }, { "$": { "value": "Not Recommended", "numvotes": "620" }, "_": "" }] }] }, { "$": { "name": "suggested_playerage", "title": "User Suggested Player Age", "totalvotes": "366" }, "results": { "$": {}, "result": [{ "$": { "value": "2", "numvotes": "0" }, "_": "" }, { "$": { "value": "3", "numvotes": "0" }, "_": "" }, { "$": { "value": "4", "numvotes": "1" }, "_": "" }, { "$": { "value": "5", "numvotes": "0" }, "_": "" }, { "$": { "value": "6", "numvotes": "14" }, "_": "" }, { "$": { "value": "8", "numvotes": "99" }, "_": "" }, { "$": { "value": "10", "numvotes": "140" }, "_": "" }, { "$": { "value": "12", "numvotes": "90" }, "_": "" }, { "$": { "value": "14", "numvotes": "18" }, "_": "" }, { "$": { "value": "16", "numvotes": "3" }, "_": "" }, { "$": { "value": "18", "numvotes": "1" }, "_": "" }, { "$": { "value": "21 and up", "numvotes": "0" }, "_": "" }] } }, { "$": { "name": "language_dependence", "title": "Language Dependence", "totalvotes": "380" }, "results": { "$": {}, "result": [{ "$": { "level": "1", "value": "No necessary in-game text", "numvotes": "291" }, "_": "" }, { "$": { "level": "2", "value": "Some necessary text - easily memorized or small crib sheet", "numvotes": "84" }, "_": "" }, { "$": { "level": "3", "value": "Moderate in-game text - needs crib sheet or paste ups", "numvotes": "4" }, "_": "" }, { "$": { "level": "4", "value": "Extensive use of text - massive conversion needed to be playable", "numvotes": "1" }, "_": "" }, { "$": { "level": "5", "value": "Unplayable in another language", "numvotes": "0" }, "_": "" }] } }], "playingtime": { "$": { "value": "30" }, "_": "" }, "minplaytime": { "$": { "value": "30" }, "_": "" }, "maxplaytime": { "$": { "value": "30" }, "_": "" }, "minage": { "$": { "value": "10" }, "_": "" }, "link": [{ "$": { "type": "boardgamecategory", "id": "1050", "value": "Ancient" }, "_": "" }, { "$": { "type": "boardgamecategory", "id": "1002", "value": "Card Game" }, "_": "" }, { "$": { "type": "boardgamecategory", "id": "1029", "value": "City Building" }, "_": "" }, { "$": { "type": "boardgamecategory", "id": "1015", "value": "Civilization" }, "_": "" }, { "$": { "type": "boardgamemechanic", "id": "2041", "value": "Card Drafting" }, "_": "" }, { "$": { "type": "boardgamemechanic", "id": "2040", "value": "Hand Management" }, "_": "" }, { "$": { "type": "boardgamemechanic", "id": "2004", "value": "Set Collection" }, "_": "" }, { "$": { "type": "boardgamemechanic", "id": "2020", "value": "Simultaneous Action Selection" }, "_": "" }, { "$": { "type": "boardgamemechanic", "id": "2015", "value": "Variable Player Powers" }, "_": "" }, { "$": { "type": "boardgamefamily", "id": "17552", "value": "7 Wonders" }, "_": "" }, { "$": { "type": "boardgamefamily", "id": "27646", "value": "Tableau Building" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "247315", "value": "7 Wonders: Armada" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "154638", "value": "7 Wonders: Babel" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "110308", "value": "7 Wonders: Catan" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "111661", "value": "7 Wonders: Cities" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "92539", "value": "7 Wonders: Leaders" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "83445", "value": "7 Wonders: Manneken Pis" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "133993", "value": "7 Wonders: Wonder Pack" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "164649", "value": "Collection (fan expansion for 7 Wonders)" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "140098", "value": "Empires (fan expansion for 7 Wonders)" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "138187", "value": "Game Wonders (fan expansion for 7 Wonders)" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "134849", "value": "Lost Wonders (fan expansion for 7 Wonders)" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "131947", "value": "More Wonders... (fan expansion for 7 Wonders)" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "132146", "value": "Myths (fan expansion for 7 Wonders)" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "164648", "value": "Ruins (fan expansion for 7 Wonders)" }, "_": "" }, { "$": { "type": "boardgameexpansion", "id": "164647", "value": "Sailors (fan expansion for 7 Wonders)" }, "_": "" }, { "$": { "type": "boardgamedesigner", "id": "9714", "value": "Antoine Bauza" }, "_": "" }, { "$": { "type": "boardgameartist", "id": "9714", "value": "Antoine Bauza" }, "_": "" }, { "$": { "type": "boardgameartist", "id": "12016", "value": "Miguel Coimbra" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "4384", "value": "Repos Production" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "23043", "value": "ADC Blackfire Entertainment" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "157", "value": "Asmodee" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "15889", "value": "Asterion Press" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "15605", "value": "Galápagos Jogos" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "8820", "value": "Gém Klub Kft." }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "1391", "value": "Hobby Japan" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "6214", "value": "Kaissa Chess & Games" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "3218", "value": "Lautapelit.fi" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "9325", "value": "Lifestyle Boardgames Ltd" }, "_": "" }, { "$": { "type": "boardgamepublisher", "id": "7466", "value": "Rebel" }, "_": "" }] } } }
    // #endregion Example Response

    return BGG_API._getAjax()
      .then(function (thingObj) {
        let gameInfos = thingObj.items.item;
        // console.log("thingobj: ", gameInfos);
        if (!Array.isArray(gameInfos)){
          gameInfos = [gameInfos]; // force to an array (of 1 item)
        }
        let mapped = gameInfos.map(item => {
          // sometimes the name has results in different languages
          if (!Array.isArray(item.name)) {
            item.name = [item.name];
          }
          return {
            id          : item.$.id,
            name        : item.name[0].$.value,
            description : item.description,
            imageURL    : item.image,
            thumbnailURL: item.thumbnail,
            minage      : item.minage.$.value,
            minplayers  : item.minplayers.$.value,
            maxplayer   : item.maxplayers.$.value,
            minplaytime : item.minplaytime.$.value,
            maxplaytime : item.maxplaytime.$.value,
            playingtime : item.playingtime.$.value,
            weight      : item.statistics.ratings.averageweight.$.value,
          };
        });
        // console.log(mapped);
        return mapped;
      })
      .catch(function (error) {
        console.log("Error @ getGameInfoById", error);
      });
  },

  searchForGameByName(name) {
    BGG_API.config = {
      path: "/search",
      params: {
        query: name,
        type: "boardgame"
      }
    };

    // #region Example Response
    // #endregion Example Response

    return BGG_API._getAjax()
      .then(function (searchResults) {
        // console.log(searchResults);
        if (searchResults.items.$.total !== "0") {
          // console.log("BGG API/ajax/searchResults", searchResults.items.item);
          let ids = "";
          searchResults.items.item.forEach(item => {
            ids += item.$.id + ","
          });
          return ids;
        }
        else { // no results
          return null; // no ids to forward
        }
      })
      .then(function (gameIDs) {
        if (gameIDs)
          return BGG_API.getGameInfoById(gameIDs);
        else // no results, no ids => empty array
          return [];
      })
      .catch(function (error) {
        console.log("Error @ searchForGameByName", error);
      });
  }
};

// let xmlFromString = $.parseXML(xmlString);
// my_collection = $.xml2json(xmlFromString);