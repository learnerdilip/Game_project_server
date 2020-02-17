const Sequelize = require("sequelize");
const sequelize = require("../db");
// sync model to database
const Game = sequelize.define("game", {
  room_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_Id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = Game;
