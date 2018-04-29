//define dependencies
var express = require("express");
var burger = require("../models/burgers.js");
var db = require("../models")

// Routes
// =============================================================
module.exports = function(app) {

  // Route that reads the data from the data model and renders it to the view
  app.get("/", function (req, res) {

    //call the selectAll method from the burger data model object and pass in the callback function
    //data is the result from the ORM.js database query
    db.burgers.findAll({}).then(function(burgers) {
      //define object to render to view handlebars
      var hbsObject = {
        burgers: burgers
      };
      console.log(hbsObject);
      //render the object to index.handlebars
      res.render("index", hbsObject);
    });
  });

  //define route that is activated when the client sends a post request with new burger data
  app.post("/api/burgers", function(req, res) {

    var burger = req.body;
    //call the insertOne method from the burger data model object
    db.burgers.create({
      burger_name: burger.name,
    }).then(function(burger) {
      // Send back the ID of the new burger
      res.json({burger});
    });
  });

  //route that is called by a put from the client to update a database record
  app.put("/api/burgers/:id", function(req, res) {

    var burger = req.body;
    //capture the specific id of the burger in a variable
    var id = req.params.id;

    //call the updateOne method from the burger data model object
    db.burgers.update({
      //pass in the field and value to be updated, the id, and the callback function
      devoured: burger.devoured
    }, 
    {
      where: {
        id: id
      }
    }).then(function(burger) {
      res.json(burger);
    });
  });
};