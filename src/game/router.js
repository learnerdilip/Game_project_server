const { Router } = require("express");
const Game = require("./model");

const router = new Router();

router.post("/game", (request, response, next) => {
  if (request.body.name) {
    console.log("the body Of post:", request.body);

    Game.create(request.body)
      .then(game => {
        response.send(game);
      })
      .catch(err => next(err));
  }
});

module.exports = router;
