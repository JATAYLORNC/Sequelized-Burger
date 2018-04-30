//ensures that DOM is loaded before jQuery functions
$(function() {

  //listen for click of submit button on createburger form
  $(".createburger").on("submit", function(event) {
    //prevent default action from the submit button
    event.preventDefault();

    //capture the new burger name in a variable
    var burgerName = $("#burger").val().trim();

    //create a new burger object based on input from the form
    var newBurger = {
      name: burgerName,
      devoured: false
    };

    //send a post request with the newBurger object
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {

        // Reload the page to get the updated list of burgers
        location.reload();
      }
    );

  });

  //listen for click of "Devour It" button
  $(".devour-burger").on("click", function(event) {
    //prevent default action from the submit button
    event.preventDefault();

    //capture the id of the burger being devoured
    var id = $(this).data("id");

    //capture the name of the customer that ate the burger
    var customer_name = $("#" + id).val().trim();

    //create a new customer object based on the input from the form
    var CustomerName = {
      customer_name: customer_name
    };

    //define object which changes the devoured boolean to true
    var devouredState = {
      devoured: true
    };

    console.log(devouredState);

    //send a post request with the new customer object
    $.ajax("/api/customers", {
      type: "POST",
      data: CustomerName
    }).then(
      function(data) {

        //capture the id of the customer that ate the burger
        var custId = data.customer.id;

        //add the customer id to the devouredState object
        devouredState.CustomerId = custId;
        
        //Send the PUT request to update the burger record 
        $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: devouredState
        }).then(
          function() {

            // Reload the page to get the updated list
            location.reload();
          }
        );
      }
    ); 
  });
 });