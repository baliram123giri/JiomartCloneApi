const { DataTypes } = require("sequelize");
const { sequelize } = require("..");
const User = require("./usersModel");

const Address = sequelize.define("Address", {
    pincode: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    house_no: DataTypes.STRING,
    floor_no: DataTypes.STRING,
    building_apratment: DataTypes.STRING,
    landmark: DataTypes.STRING,
    address: {
        allowNull: false,
        type: DataTypes.STRING
    },
    city_state: {
        allowNull: false,
        type: DataTypes.STRING
    },
    reciver_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    reciver_number: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    istype: {
        type: DataTypes.ENUM,
        values: ["Home", "Work"],
        defaultValue: "Home",
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
})
User.hasMany(Address, { foreignKey: "userId", onDelete:"CASCADE" })
// Address.belongsTo(User)
// Address.sync({ alter: true })
module.exports = Address;