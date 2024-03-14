const { DataTypes } = require("sequelize");
const { sequelize } = require("../..");
const Products = require("./ProductsModel");

const ProductImage = sequelize.define("ProductImage", {
    url: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
})

// ProductImage.sync({ force: true })
Products.hasMany(ProductImage, { foreignKey: "product_id", onDelete: "CASCADE" })

module.exports = ProductImage

