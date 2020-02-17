const Sequelize = require("sequelize");
const sequelize = require("../db");

const User_game = sequelize.define("user_game", {
  game_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});



module.exports = User_game;
