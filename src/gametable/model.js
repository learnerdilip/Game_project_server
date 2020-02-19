const Sequelize = require("sequelize");
const sequelize = require("../db");

const Gametable = sequelize.define("gametable", {
  deck_id: Sequelize.STRING,
  remaining: Sequelize.INTEGER,
  shuffled: Sequelize.BOOLEAN
});

module.exports = Gametable;
