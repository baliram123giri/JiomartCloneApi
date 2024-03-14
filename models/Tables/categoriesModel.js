const { DataTypes } = require("sequelize");
const { sequelize } = require("..");

const Category = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
// Category.sync({ alter: true })

module.exports = Category