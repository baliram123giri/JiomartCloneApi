
const { Address } = require("../../models/tables");
const { errorRequest } = require("../../utils/utils");
const { createAddressValidations } = require("./validation")
//Address crerates
async function createAddress({ body }, res) {
    try {
        await createAddressValidations.validateAsync(body)
        const address = await Address.create(body)
        return res.json(address);
    } catch (error) {
        errorRequest(res, error);
    }
}
//Address list
async function listAddress(req, res) {
    try {
        const address = await Address.findAll()
        return res.json(address);
    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = { createAddress, listAddress }