const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../user/model");
// sync model to database
const Room = sequelize.define("room", {
  room_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Room.hasMany(User);
User.belongsTo(Room);

module.exports = Room;
