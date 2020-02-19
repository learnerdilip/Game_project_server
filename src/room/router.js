const { Router } = require("express");
const Room = require("./model");
const User = require("../user/model");
const auth = require("../auth/middleWare");
const Axios = require("axios");
const card_deck = require("../gametable/model");

const factory = stream => {
  const router = new Router();

  router.post("/room", auth, async (request, response, next) => {
    try {
      // console.log("SERVER REQ BODYQWERTYUIOIUYTOOOOOO:", request.body);
      const roomCreate = { room_name: request.body.data };
      const ref = await Room.create(roomCreate);
      const room = await Room.findByPk(ref.id, { include: [User] });
      // console.log("THE NEW ROOMXXXXXXXXXX", room);
      const action = {
        type: "ROOM_CREATED",
        payload: room
      };
      const json = JSON.stringify(action);
      stream.send(json);

      const gameApiUrl =
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
      //the table API
      Axios.get(gameApiUrl)
        .then(carddeck => {
          console.log("CARD DECK is here: ", carddeck.data);
          const deckid = carddeck.data.deck_id;
          const remainingcards = carddeck.data.remaining;
          const isshuffled = carddeck.data.shuffled;
          const gameDeck = {
            deck_id: deckid,
            remaining: remainingcards,
            shuffled: isshuffled,
            roomId: room.dataValues.id
          };
          card_deck.create(gameDeck);
        })
        .catch(console.error);

      // response.send(json);
    } catch {
      error => next(error);
    }
  });

  router.get("/rooms", (request, response, next) => {
    try {
      Room.findAll({ include: [User] }).then(rooms => response.send(rooms));
    } catch {
      error => next(error);
    }
  });

  router.delete("/room", (request, response, next) => {
    Room.findByPk(request.body.id)
      .then(room =>
        Room.destroy({
          where: {
            id: room.id
          }
        })
      )
      .then(room => {
        // console.log("ROOM IN BACKEND", request.body.id);
        response.json(request.body.id);
      });
  });
  return router;
};

module.exports = factory;
