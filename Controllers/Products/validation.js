const Joi = require("joi");
const createProductValidation = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    price: Joi.number().required(),
    discounted_price: Joi.number().required(),
    features_details: Joi.string().required(),
    description: Joi.string().required(),
    // Product Details array
    productDetails: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            value: Joi.string().required(),
            product_details_id: Joi.number().required(),
            product_id: Joi.number().required(),
        })
    ).required(),
    // Product images array
    productImages: Joi.array().items(
        Joi.object({
            url: Joi.string().required(),
            product_id: Joi.number().required(),
        })
    ).required()
});
module.exports = { createProductValidation }