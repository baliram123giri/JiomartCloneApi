const Joi = require("joi");


const createSubChildCategoryValidations = Joi.object(
    {
        title: Joi.string().required()
    }
)
const updateSubChildCategoryValidations = Joi.object(
    {
        title: Joi.string().required()
    }
)
module.exports = { createSubChildCategoryValidations, updateSubChildCategoryValidations };