//ensures that DOM is loaded before jQuery functions
$(function() {

  //listen for click of submit button on createburger form
  $(".createburger").on("submit", function(event) {
    //prevent default action from the submit button
    event.preventDefault();

    var burgerName = $("#burger").val().trim();

    //ensure that something was intered in the input field for the burger name
    if(burgerName !== "") {

      //create a new burger object based on input from the form
      var newBurger = {
        name: burgerName,
        devoured: false
      };

      console.log(newBurger);

      //send a post request with the newBurger object
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list of 
          location.reload();
        }
      );
    } else {
      //send alert to fill in the input field
      alert("Please key in a name for your burger!");
    }

  });

  //list for click of "Devour It" button
  $(".devour-burger").on("click", function(event) {
    //prevent default action from the submit button
    event.preventDefault();

    //capture the id of the burger being devoured
    var id = $(this).data("id");

    console.log(id);

    //define object which changes devoured boolean to true
    var devouredState = {
      devoured: true
    };

    console.log(devouredState);

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        console.log("Burger has been devoured!");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


















 });