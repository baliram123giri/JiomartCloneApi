const { User, Address, Pancard } = require("../../models/tables");
const { errorRequest } = require("../../utils/utils");
const { createUserValidations } = require("./validation");

//user crerates
async function createUser({ body }, res) {
    try {
        await createUserValidations.validateAsync(body)
        const user = await User.create(body)
        return res.json(user);
    } catch (error) {
        errorRequest(res, error);
    }
}
//user list
async function listUser({ body }, res) {
    try {
        const user = await User.findAll({
            include: [Address,Pancard]
        })
        return res.json(user);
    } catch (error) {
        errorRequest(res, error);
    }
}
//Delete user
async function deleteUser({ params: { id } }, res) {
    try {
        await User.destroy({
            where: { id }
        })
        return res.json({ message: "User Deleleted Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = { createUser, listUser, deleteUser }