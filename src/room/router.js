const { Router } = require("express");
const Room = require("./model");
const User = require("../user/model");

const router = new Router();

router.post("/game", async (request, response, next) => {
  try {
    console.log("THE REQ BODYFKJANFJASFJ:", request.body);

    Room.create(request.body).then(room => response.send(room));
  } catch {
    error => next(error);
  }
});

module.exports = router;
