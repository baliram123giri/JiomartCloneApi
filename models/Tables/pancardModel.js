const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const User = require("./usersModel");

const Pancard = sequelize.define("Pancard", {
    pan_number: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false // Assuming userId cannot be null
    }
})

// Pancard.sync({ alter: true })
User.hasOne(Pancard, { foreignKey: "userId", onDelete: "CASCADE", })



module.exports = Pancard