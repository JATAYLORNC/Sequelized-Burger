var mysql = require("mysql");

///loads environment variables from .env file
//.env holds mySQL password
require("dotenv").config();

var connection;
if(process.env.JAWSDB_URL) {
  //Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  //local host
    connection = mysql.createConnection({
        root: 3000,
        host: "localhost",
        user: "root",
        password: process.env.password,
        database: "burgers_db"
    });
};

//use the connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

//export the connection for use by ORM.js
module.exports = connection;