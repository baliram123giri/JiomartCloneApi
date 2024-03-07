const Joi = require("joi");


const createPancardValidations = Joi.object(
    {
        pan_number: Joi.string().required(),
        userId: Joi.number().required()
    }
)
module.exports = { createPancardValidations };