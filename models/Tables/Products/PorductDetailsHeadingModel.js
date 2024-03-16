const { DataTypes } = require("sequelize");
const { sequelize } = require("../..");


const ProductDetailHeading = sequelize.define("ProductDetailHeading", {
    title: {
        type: DataTypes.STRING,
        unique: true
    }
})

// ProductDetailHeading.sync({ alter: true })

module.exports = ProductDetailHeading