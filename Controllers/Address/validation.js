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

const updateAddressValidations = Joi.object(
    {
        pincode: Joi.number().optional(),
        house_no: Joi.number().optional(),
        floor_no: Joi.number().optional(),
        building_apratment: Joi.string().optional(),
        landmark: Joi.string().optional(),
        address: Joi.string().optional(),
        city_state: Joi.string().optional(),
        reciver_name: Joi.string().optional(),
        reciver_number: Joi.number().optional(),
        istype: Joi.string().optional(),
        userId: Joi.number().optional(),
    }
)
module.exports = { createAddressValidations, updateAddressValidations };