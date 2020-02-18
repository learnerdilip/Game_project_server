const { Router } = require("express");
const Room = require("./model");
const User = require("../user/model");
const auth = require("../auth/middleWare");

const factory = stream => {
  const router = new Router();

  router.post("/room", async (request, response, next) => {
    try {
      // console.log("THE REQ BODY:", request.body);
      const roomCreate = { room_name: request.body.room_name };
      const ref = await Room.create(roomCreate);
      const room = await Room.findByPk(ref.id, { include: [User] });
      const action = {
        type: "ROOM_CREATED",
        payload: room
      };
      const json = JSON.stringify(action);
      stream.send(json);
      // response.send(json)
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
