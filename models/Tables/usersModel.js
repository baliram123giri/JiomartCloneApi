const { DataTypes } = require("sequelize");
const { sequelize } = require("..");

const User = sequelize.define("User", {
    fullname: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mobile: DataTypes.INTEGER,
    gender: {
        type: DataTypes.ENUM,
        values: ["male", "female", "other", "unspecified"]
    },
    dob: DataTypes.DATEONLY
})

// User.sync({ alter: true })
module.exports = User;