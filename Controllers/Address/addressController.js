
const { Op } = require("sequelize");
const { Address } = require("../../models/tables");
const { errorRequest, getColumnsKeys, pagination } = require("../../utils/utils");
const { createAddressValidations, updateAddressValidations } = require("./validation")

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
async function listAddress({ query }, res) {
    try {
        const { limit, page, panginationSchema } = await pagination(query)
        const globalSearch = await getColumnsKeys(Address, query?.search)
        const { count, rows: data } = await Address.findAndCountAll({
            ...panginationSchema,
            where: {
                [Op.or]: globalSearch
            }
        })
        const totalPages = Math.ceil(count / limit)
        return res.json({
            data,
            metaData: {
                count: data.length > 0 ? count : 0,
                totalPages,
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        errorRequest(res, error);
    }
}

//Delete Address
async function deleteAddress({ params: { id } }, res) {
    try {
        await Address.destroy({
            where: { id }
        })
        return res.json({ message: "Address Deleleted Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}

//find by Addressid
async function findAddress({ params: { id } }, res) {
    try {
        const address = await Address.findOne({ where: { id } })
        if (!address) return res.json({ message: "Address Not Found" });  //  TOD     
        return res.json(address);
    } catch (error) {
        errorRequest(res, error);
    }
}

//update Address
async function updateAddress({ params: { id }, body }, res) {
    try {
        await updateAddressValidations.validateAsync(body)
        const address = await Address.findOne({ where: { id } })
        if (!address) return res.json({ message: "Address Not Found" });  //  TOD     

        await Address.update(body, { where: { id } })
        return res.json({ message: "Address Updated Successfully" });

    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = { createAddress, listAddress, deleteAddress, findAddress, updateAddress }