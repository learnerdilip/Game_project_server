const { Router } = require("express");
const User = require("../user/model");
const Room = require("../room/model");

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

  router.post("/gametable", (req, res, next) => {
    // console.log("request from gametable backend", req.body);

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
