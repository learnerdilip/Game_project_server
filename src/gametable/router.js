const { Router } = require("express");
const User = require("../user/model");
const Room = require("../room/model");

const router = new Router();

router.post("/gametable", (req, res, next) => {
  try {
    console.log("THE GAMETABLE JOIN BACKEND Request", req.body);
    const gameid = req.body.gameId;
    const userid = req.body.userId;
    User.findByPk(userid).then(user => {
      user.roomId = gameid;
      user.save();
      console.log("THE SAVED USER", user);

      res.json(user.roomId);
    });
  } catch (error) {
    console.error;
  }
});

module.exports = router;
