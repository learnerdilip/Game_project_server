//import sequelize as a variable named Sequelize. You should capitalize the variable because it is a class.
const Sequelize = require("sequelize");
//declare a variable named databaseUrl and set it equal to your database url. Heroku uses env. var as DATABASE_URL
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";
//create a new instance of the Sequelize class named db, passing the databaseUrl to the constructor.
const db = new Sequelize(databaseUrl);
//call the sync method of the instance you created. This method will sync the data in your database with the schema you are about to create.
db.sync({ force: true })
  .then(() => console.log("Sequelize connected to db"))
  .catch(console.error);
//export db
module.exports = db;
