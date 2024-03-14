const { DataTypes } = require("sequelize");
const { sequelize } = require("..");
const { hashSync } = require("bcrypt");

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
    password: {
        type: DataTypes.STRING,
        set: function (value) {
            this.setDataValue("password", hashSync(value, 10))
        },
    },
    mobile: DataTypes.INTEGER,
    gender: {
        type: DataTypes.ENUM,
        values: ["male", "female", "other", "unspecified"],
    },
    role: {
        type: DataTypes.ENUM,
        values: ["admin", "user", "seller"],
        defaultValue: "user"
    },
    dob: DataTypes.DATEONLY
})

// User.sync({ alter: true })
module.exports = User;