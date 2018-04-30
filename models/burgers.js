module.exports = function(sequelize, DataTypes) {
  //define the Burger data model
  var Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      //ensures that Null values are not allowed for burger names
      allowNull: false,
      //ensures that the burger name is at least 1 character and a maximum 140 characters
      validate: {
        len: [1, 140]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      //sets the default value of "devoured" to false if there is no value otherwise defined
      defaultValue: false
    }
  },
  {
    //don't include any timestamp columns in the table
    timestamps: false
  });

  //Association to indicate that the Burger model belongs to the Customer model.
  //This adds a CustomerId to the Burger table
  Burger.associate = function(models) {
    models.Burger.belongsTo(models.Customer);
  };

  return Burger;
};