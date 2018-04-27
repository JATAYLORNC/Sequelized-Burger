//define dependencies
var express = require("express");
var burger = require("../models/burgers.js");
var router = express.Router();

// Route that reads the data from the data model and renders it to the view
router.get("/", function (req, res) {

  //call the selectAll method from the burger data model object and pass in the callback function
  //data is the result from the ORM.js database query
  burger.selectAll(function(data) {
    //define object to render to view handlebars
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    //render the object to index.handlebars
    res.render("index", hbsObject);
  });
});

//define route that is activated when the client sends a post request with new burger data
router.post("/api/burgers", function(req, res) {
  //call the insertOne method from the burger data model object
  burger.insertOne([
    //pass in the cols, values, and callback function
    "burger_name", "devoured"
  ], [
    req.body.name, false
  ], function(result) {
    // Send back the ID of the new burger
    res.json({ id: result.insertId });
  });
});

//route that is called by a put from the client to update a database record
router.put("/api/burgers/:id", function(req, res) {
  //capture the specific id of the burger in a variable
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  //call the updateOne method from the burger data model object
  burger.updateOne({
    //pass in the field and value to be updated, the id, and the callback function
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//export the router
module.exports = router;