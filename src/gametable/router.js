const { Router } = require("express");
const User = require("../user/model");
const Room = require("../room/model");
const card_deck = require("../gametable/model");

function factory(stream) {
  const router = new Router();

  router.post("/addGameToUser", (req, res, next) => {
    console.log("ADD GAME TO USER ENDPOINT", req);
    try {
      const gameid = req.body.gameId;
      const userid = req.body.userId;
      console.log("GAME ID AND USER ID", gameid, userid);
      User.findByPk(userid).then(user => {
        console.log("USER------------------", user);
        user.roomId = gameid;
        user.save();
        res.json(user.roomId);
      });
    } catch (error) {
      console.error;
    }
  });

  router.post("/gametable", async (req, res, next) => {
    console.log(
      `REQUEST FROM CLIENT ------------------------->`,
      req.body.data
    );
    card_deck
      .findOne({
        where: {
          roomId: req.body.data
        }
      })
      .then(response => {
        console.log(
          `Find card deck where room id=${req.body.data}. DeckID for this room: ${response.dataValues.deck_id}`
        );
        const deck_id = response.dataValues.deck_id;
        User.findAll({
          where: {
            roomId: req.body.data
          }
        }).then(users => {
          const userList = users.map(user => {
            return user.dataValues.id;
          });
          const data = { users: userList, deck_id: deck_id };

          const action = {
            type: "TABLE_USERS",
            payload: data
          };
          console.log("DATA---------------------", action);
          const json = JSON.stringify(action);
          stream.send(json);
        });
      });

    try {
    } catch (error) {
      console.error;
    }
  });

  return router;
}

module.exports = factory;
