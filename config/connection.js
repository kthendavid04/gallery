require('dotenv').config();
const mysql = require("mysql2");
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}




// Set up MySQL connection.

//make connection
// if (process.env.JAWSDB_URL){
//   const connection = mysql.createConnection(process.env.JAWSDB_URL);
// }else{
//   const connection = mysql.createConnection(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PW,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     }
    
//     );
// }
// connection.connect();
// // Export connection for our ORM to use.
module.exports = sequelize;
