const { Router } = require("express");
const User = require("../user/model");
const Room = require("../room/model");
const Gametable = require("../gametable/model");
const Axios = require("axios");

function factory(stream) {
  const router = new Router();

  router.post("/addGameToUser", (req, res, next) => {
    try {
      const gameid = req.body.gameId;
      const userid = req.body.userId;
      User.findByPk(userid).then(user => {
        user.roomId = gameid;
        user.save();
        res.json(user.roomId);
      });
    } catch (error) {
      console.error;
    }
  });

  router.post("/gametable", async (req, res, next) => {
    // console.log("request from gametable backend", req.body);
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
          shuffled: isshuffled
        };

        Gametable.create(gameDeck).then(response => {
          console.log(
            "AFTER DECK CRETION, your deck is :",
            response.dataValues
          );
          // stream.send(JSON.stringify(response));
        });
      })
      .catch(console.error);

    User.findAll({
      where: {
        roomId: req.body.data
      }
    }).then(users => {
      const action = {
        type: "TABLE_USERS",
        payload: users
      };
      const json = JSON.stringify(action);
      stream.send(json);
      res.send(action);
    });

    try {
    } catch (error) {
      console.error;
    }
  });

  return router;
}

module.exports = factory;
