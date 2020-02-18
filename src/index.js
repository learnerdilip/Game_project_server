const express = require("express");
const app = express();
const Sse = require("json-sse");
const roomFactory = require("./room/router");
const Room = require("./room/model");
const User = require("./user/model");
const gametableFactory = require("./gametable/router");

const stream = new Sse();

const userRouter = require("./user/router");
// const roomRouter = require("./room/router");

const port = process.env.PORT || 4000;
const cors = require("cors");
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(express.json()); //Express own bodyParser

// app.use("/lobby", roomRouter);
app.use("/user", userRouter); //Pass the router to app.use to register the middleware.
app.get("/test", (req, res, next) => {
  res.send("Test endpoint working");
});

app.get("/stream", async (req, res, next) => {
  try {
    const rooms = await Room.findAll({ include: [User] });

    const action = {
      type: "ROOMS_FETCHED",
      payload: rooms
    };
    const stringAction = JSON.stringify(action);
    stream.updateInit(stringAction);
    stream.init(req, res);
  } catch (error) {
    console.log(error);
  }
});

const roomRouter = roomFactory(stream);
app.use(roomRouter);
const gametableRouter = gametableFactory(stream);
app.use(gametableRouter);

//Pass the port and a logging function to app.listen to start the server.
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
