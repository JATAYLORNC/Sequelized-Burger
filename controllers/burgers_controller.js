//define dependencies
var express = require("express");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Route that reads the data from the data model and renders it to the view
  app.get("/", function (req, res) {

    //query the database using the Burger model and include the Customer model 
    //that it is associated with
    db.Burger.findAll({
      include: [ db.Customer ],
      order: ['burger_name']
    }).then(function(burgerdata) {

      //define object to render to view handlebars
      var hbsObject = {
        burgers: burgerdata
      };

      //render the object to index.handlebars
      res.render("index", hbsObject);
    });
  });

  //define route that is activated when the client sends a post request with new burger data
  app.post("/api/burgers", function(req, res) {

    //variable to capture the new burger data object
    var burger = req.body;
    
    //query the database to create a new burger record based on the Burger model 
    db.Burger.create({
      burger_name: burger.name,
    }).then(function(burger) {

      console.log(burger);
      // Return the new burger record in a json object
      res.json({burger});
    });
  });

  //define a route that is activated when the client sends a post request with new customer data
  app.post("/api/customers", function(req, res) {

    //variable to capture the new customer data object
    var customer = req.body;
    
    //query the database to create a new customer record based on the Customer model
    db.Customer.create({
      customer_name: customer.customer_name,
    }).then(function(customer) {

      // Return the new customer record in a json object
      res.json({customer});
    });
  });


  //route that is called by a put from the client to update a record for a specific
  //burger and with a new customer
  app.put("/api/burgers/:id", function(req, res) {

    //capture the updated data object in a variable
    var burger = req.body;

    //capture the specific id of the burger in a variable
    var id = req.params.id;

    //query the database to update a specific record based on the Burger model
    db.Burger.update({

      //pass in the new devoured status of the burger
      devoured: burger.devoured,

      //pass in the id for the customer that devoured the burger
      CustomerId: burger.CustomerId
    }, 
    {
      where: {
        //id for the specific record to be updated
        id: id
      }
    }).then(function(burger) {
      //return the updated record in a json object
      res.json(burger);
    });
  });
};