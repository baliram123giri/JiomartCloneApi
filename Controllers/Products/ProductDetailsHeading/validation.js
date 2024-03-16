const Joi = require("joi");

const productDetailHeadingValidation = Joi.object({
    title: Joi.string().required()
})

module.exports = { productDetailHeadingValidation }