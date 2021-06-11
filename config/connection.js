require('dotenv').config();
const mysql = require("mysql");
const connection;


// Set up MySQL connection.

//make connection
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  connection = mysql.createConnection(
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
connection.connect();
// Export connection for our ORM to use.
module.exports = connection;
