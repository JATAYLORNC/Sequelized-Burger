module.exports = function(sequelize, DataTypes) {
  //define the Customer data model
  var Customer = sequelize.define("Customer", {
    customer_name: {
      type: DataTypes.STRING,
      //ensures that Null values are not allowed for customer names
      allowNull: false,
      //ensures that the customer name is at least 1 character and a maximum 30 characters
      validate: {
        len: [1, 30]
      }
    }
  }, {
    //don't include any timestamp columns in the table
    timestamps:false
  });

  //Association to indicate that the Customer model has and associated Burger model.
  Customer.associate = function(models) {
    models.Customer.hasOne(models.Burger, {
      onDelete: "cascade"
    });
  };

  return Customer;
};