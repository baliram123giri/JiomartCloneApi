const { DataTypes } = require("sequelize");
const { sequelize } = require("../..");
const User = require("../usersModel");

const Products = sequelize.define("Products", {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discounded_price: DataTypes.INTEGER,
    features_details: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
})

// Products.sync({ alter: true })

//user has multiple products
User.hasMany(Products, { foreignKey: "user_id" })

module.exports = Products