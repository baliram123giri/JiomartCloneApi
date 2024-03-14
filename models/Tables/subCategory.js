const { DataTypes } = require("sequelize");
const { sequelize } = require("..");
const Category = require("./categoriesModel");

const Subcategory = sequelize.define("Subcategory", {
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    category_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
})

// Subcategory.sync({ alter: true })
//has many categories
Category.hasMany(Subcategory, { foreignKey: "category_id", onDelete: "CASCADE" })

module.exports = Subcategory