const { DataTypes } = require("sequelize");
const { sequelize } = require("..");
const Subcategory = require("./subCategory");

const SubChildCategory = sequelize.define("SubChildCategory", {
    title: DataTypes.STRING,
    subcategory_id: DataTypes.INTEGER
})

// SubChildCategory.sync({ alter: true })
Subcategory.hasMany(SubChildCategory, { foreignKey: "subcategory_id", onDelete: "CASCADE" })

module.exports = SubChildCategory