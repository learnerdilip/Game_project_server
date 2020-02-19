const { Router } = require("express");
const User = require("../user/model");
const Room = require("../room/model");
const card_deck = require("../gametable/model");

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
    card_deck
      .findOne({
        where: {
          roomId: req.body.data
        }
      })
      .then(response => {
        console.log("response:", response);
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
          // console.log("DATA---------------------", data);
          const json = JSON.stringify(action);
          stream.send(json);
          // res.send(data);
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
