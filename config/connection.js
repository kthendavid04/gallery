//dotenv required for .env file to store passwords
require("dotenv").config();
//mysyql2 required to house db
const mysql = require("mysql2");
//sequelize required to process requests
const Sequelize = require("sequelize");

let sequelize;
//if the JAWSDB_URL located in the .env file does not load..
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  //ten a local db will be created with the below information pulling from .env
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306
    }
  );
}

module.exports = sequelize;
