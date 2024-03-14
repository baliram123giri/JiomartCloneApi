const Joi = require("joi");


const createSubCategoryValidations = Joi.object(
    {
        name: Joi.string().required(),
        category_id: Joi.string().required(),
    }
)
const updateSubCategoryValidations = Joi.object(
    {
        name: Joi.string().required(),
        category_id: Joi.string().optional(),
    }
)
module.exports = { createSubCategoryValidations, updateSubCategoryValidations };