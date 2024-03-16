const { Op } = require("sequelize");
const { User, Address, Pancard } = require("../../models/tables");
const { errorRequest, pagination, getColumnsKeys, dateRangeSelection } = require("../../utils/utils");
const { createUserValidations, updateUserValidations, loginUserValidations } = require("./validation");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { genarateToken, cookieStore } = require("../../utils/auth");


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

//login user
async function loginUser({ body }, res) {
    try {
        await loginUserValidations.validateAsync(body)
        const user = await User.findOne({ where: { email: body.email } })
        if (!user) return res.status(500).json({ message: 'Email or password wrong' })
        //check password
        const isVerified = compareSync(body.password, user.password)
        if (!isVerified) return res.status(500).json({ message: 'Email or password wrong' })

        const data = JSON.parse(JSON.stringify(user))
        data.password = undefined

        //create jwt token
        const token = genarateToken({ id: user.id, role: user.role })
        cookieStore(res, token)
        return res.json(data);
    } catch (error) {
        errorRequest(res, error);
    }
}

//user list
async function listUser({ query }, res) {
    try {
        const { limit, page, panginationSchema } = await pagination(query)
        const { rangeSearch } = await dateRangeSelection(query)

        const globalSearch = await getColumnsKeys(User, query?.search)
        const { count, rows: data } = await User.findAndCountAll({
            where: {
                //global search
                ...(query?.search ? {
                    [Op.or]: [...globalSearch,
                    { '$Pancard.pan_number$': { [Op.like]: `%${query.search}%` } }
                    ]
                } : {}),
                //date range
                ...rangeSearch
            },
            attributes: { exclude: ["password"] },
            include: [{
                model: Pancard,
                required: true,
            }, {
                model: Address
            }],
            ...panginationSchema
        })
        const totalPages = Math.ceil(count / limit)
        return res.json({
            data, metaData: {
                count: data.length > 0 ? count : 0,
                currentPage: page,
                totalPages,
                limit
            }
        });
    } catch (error) {
        console.log(error);
        errorRequest(res, error);
    }
}

//find by userid
async function findUser({ params: { id } }, res) {
    try {
        const user = await User.findOne({ where: { id } })
        if (!user) return res.json({ message: "User Not Found" });  //  TOD     
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

//update user
async function updateUser({ params: { id }, body }, res) {
    try {
        await updateUserValidations.validateAsync(body)
        const user = await User.findOne({ where: { id } })
        if (!user) return res.json({ message: "User Not Found" });  //  TOD     

        await User.update(body, { where: { id } })
        return res.json({ message: "User Updated Successfully" });

    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = { createUser, listUser, deleteUser, updateUser, findUser, loginUser }