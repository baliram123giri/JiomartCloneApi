const Joi = require("joi");


const createCategoryValidations = Joi.object(
    {
        name: Joi.string().required()
    }
)
const updateCategoryValidations = Joi.object(
    {
        name: Joi.string().required()
    }
)
module.exports = { createCategoryValidations, updateCategoryValidations };