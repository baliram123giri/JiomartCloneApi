const { DataTypes } = require("sequelize");
const { sequelize } = require("../..");
const Products = require("./ProductsModel");
const ProductDetailHeading = require("./PorductDetailsHeadingModel");

const ProductDetailsData = sequelize.define("ProductDetailsData", {
    name: DataTypes.STRING,
    product_detail_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
})

// ProductDetailsData.sync({ alter: true })
ProductDetailHeading.hasMany(ProductDetailsData, { foreignKey: "product_detail_id" })
Products.hasMany(ProductDetailsData, { foreignKey: "product_id" })

module.exports = ProductDetailsData