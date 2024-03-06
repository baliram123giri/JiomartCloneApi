const Joi = require("joi");


const createUserValidations = Joi.object(
    {
        fullname: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().optional(),
        gender: Joi.string().optional(),
        dob: Joi.string().optional(),
    }
)
module.exports = { createUserValidations };