// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {

    var value = ob[key];
    
    arr.push(key + "=" + value);
    
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

//define orm object
var orm = {

  //define selectAll method to query the database for all records and
  //use the results in the callback function
  selectAll: function(whatToSelect, tableInput, cb) {

    //define query string
    var queryString = "SELECT ?? FROM ??";

    //query the database
    connection.query(queryString, [whatToSelect, tableInput], function(err, result) {
      if (err) throw err;

      //execute the result in the passed-in callback function
      cb(result);
    });
  },

  //define insertOne method to insert a record into the database in response to
  //a post call from the front-end to add a new burger
  insertOne: function(table, cols, vals, cb) {

    //define query string
    var queryString = "INSERT INTO " + table;

    //use this method to avoid a really long query string and allow the use of helper functions
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    //query the database 
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      //execute the result in the passed-in callback function
      cb(result);
    });
  },
  
  //define updateOne method to update a record in the database in response to
  //a put call from the front-end to devour a burger
  updateOne: function(table, objColVals, condition, cb) {

    //define query string
    var queryString = "UPDATE " + table;

    //use this method to avoid a really long query string and allow the use of helper functions
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    //query the database
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      //execute the result in the passed-in callback function
      cb(result);
    });
  }
};

//execute the orm object for use by the models
module.exports = orm;