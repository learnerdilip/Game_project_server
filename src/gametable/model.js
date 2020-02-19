const Sequelize = require("sequelize");
const sequelize = require("../db");
const Room = require("../room/model");

const card_deck = sequelize.define("card_deck", {
  deck_id: Sequelize.STRING,
  remaining: Sequelize.INTEGER,
  shuffled: Sequelize.BOOLEAN
});

Room.hasOne(card_deck);
card_deck.belongsTo(Room);

module.exports = card_deck;
