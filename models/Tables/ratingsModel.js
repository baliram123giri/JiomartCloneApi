const { DataTypes } = require("sequelize");
const { sequelize } = require("..");


const Rating = sequelize.define("Rating", {
    title: DataTypes.STRING,
    comment: DataTypes.STRING,
    star: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
})

Rating.sync({ alter: true })

module.exports = Rating


