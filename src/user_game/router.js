const { Router } = require("express");
const user_game = require("./model");

const router = new Router();

router.post("/userGame", async (request, response, next) => {
  try {
    const { user_id, room_name } = request.body;
    user_game
  } catch {
    next(console.error());
  }
});

module.exports = router;
