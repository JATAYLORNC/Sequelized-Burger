//define dependencies
var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var router = require("./controllers/burgers_controller")

//create instance of express server and define port
var app = express();
var port = process.env.PORT || 3000;

// Parse application/x-www-form-urlencoded and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));

//dependency for node express handlebars
var exphbs = require("express-handlebars");

//define engine for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//use router
app.use(router);

//listen on port
app.listen(port, function() {
  console.log("listening on port", port);
});