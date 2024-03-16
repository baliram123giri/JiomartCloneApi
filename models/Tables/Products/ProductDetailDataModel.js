const { DataTypes } = require("sequelize");
const { sequelize } = require("../..");
const Products = require("./ProductsModel");
const ProductDetailHeading = require("./PorductDetailsHeadingModel");
const SubChildCategory = require("../subChildCategoryModel");

const ProductDetailsData = sequelize.define("ProductDetailsData", {
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    heading_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    sub_child_category_id: DataTypes.INTEGER,
})

// ProductDetailsData.sync({ alter: true })
ProductDetailHeading.hasMany(ProductDetailsData, { foreignKey: "heading_id" })
Products.hasMany(ProductDetailsData, { foreignKey: "product_id" })
SubChildCategory.hasMany(ProductDetailsData, { foreignKey: "sub_child_category_id" })

module.exports = ProductDetailsData