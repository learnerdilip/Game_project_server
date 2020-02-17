const { Router } = require("express");
const Room = require("./model");
const User = require("../user/model");
const auth = require("../auth/middleWare");

const router = new Router();

router.post("/game", auth, async (request, response, next) => {
  try {
    console.log("THE REQ BODY:", request.body);
    const roomCreate = { room_name: request.body.room };
    console.log("THE CREATED ROOM:", roomCreate);
    Room.create(roomCreate).then(room => response.send(room));
  } catch {
    error => next(error);
  }
});

module.exports = router;
