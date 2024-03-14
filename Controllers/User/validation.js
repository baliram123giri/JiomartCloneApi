const Joi = require("joi");


const createUserValidations = Joi.object(
    {
        fullname: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().optional(),
        gender: Joi.string().optional(),
        dob: Joi.string().optional(),
    }
)

const loginUserValidations = Joi.object(
    {
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    }
)
const updateUserValidations = Joi.object(
    {
        fullname: Joi.string().optional(),
        email: Joi.string().email().optional(),
        mobile: Joi.string().optional(),
        gender: Joi.string().optional(),
        dob: Joi.string().optional(),
    }
)
module.exports = { createUserValidations, updateUserValidations , loginUserValidations};