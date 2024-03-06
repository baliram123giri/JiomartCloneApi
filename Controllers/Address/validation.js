const Joi = require("joi");


const createAddressValidations = Joi.object(
    {
        pincode: Joi.number().required(),
        house_no: Joi.number().optional(),
        floor_no: Joi.number().optional(),
        building_apratment: Joi.string().optional(),
        landmark: Joi.string().optional(),
        address: Joi.string().required(),
        city_state: Joi.string().required(),
        reciver_name: Joi.string().required(),
        reciver_number: Joi.number().required(),
        istype: Joi.string().optional(),
        userId: Joi.number().required(),
    }
)
module.exports = { createAddressValidations };