const { DataTypes } = require("sequelize");
const { sequelize } = require("../..");
const Subcategory = require("../subCategory");

const ProductDetailHeading = sequelize.define("ProductDetailHeading", {
    title: DataTypes.STRING,
    sub_category_id: {
        allowNull:false,
        type:DataTypes.INTEGER
    }
})

// ProductDetailHeading.sync({ alter: true })
Subcategory.hasMany(ProductDetailHeading, { foreignKey: "sub_category_id", onDelete: "CASCADE" })

module.exports = ProductDetailHeading