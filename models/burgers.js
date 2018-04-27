//import the ORM object with the 3 database query methods
var orm = require("../config/orm.js");

//Create the data model "burger" using the orm object methods
//Using the ORM.js to do the actual queries insteaad of containing them here
//makes the program cleaner and easier to test/debug
var burger = {
  //define selectAll method
  selectAll: function(cb) {
    //call the ORM selectAll method to query the database for all records
    //pass in the arguments to select all records, identify table, and callback function
    orm.selectAll("*", "burgers", function(res) {
      cb(res);
    });
  },
  //call the ORM insertOne method to insert a new burger records into the database
  //pass in the cols array to define fields to update and vals array for specific data values
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  //call the ORM updateOne method to update the database record for a specific burger
  //to indicate it has been devoured
  //pass in the object indicating the col and value to update, the id and the callback function
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

//export the burger object for use by the controller
module.exports = burger;