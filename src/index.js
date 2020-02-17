const express = require("express");
const app = express();

const userRouter = require("./user/router");
const gameRouter = require("./game/router");
const userGameRouter = require("./user_game/router");

const port = process.env.PORT || 4000;
const cors = require("cors");
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(express.json()); //Express own bodyParser

app.use(gameRouter);
app.use(userGameRouter);
app.use("/user", userRouter); //Pass the router to app.use to register the middleware.
app.get("/test", (req, res, next) => {
  res.send("Test endpoint working");
});
//Pass the port and a logging function to app.listen to start the server.

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
