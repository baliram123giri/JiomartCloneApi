
const { Op } = require("sequelize");
const { Products } = require("../../models/tables");
const { createProductValidation } = require("./validation");
const { errorRequest, pagination } = require("../../utils/utils");


//Product crerates
async function createProduct({ body }, res) {
    try {
        await createProductValidation.validateAsync(body);
        // const product = await Products.create(body);

        return res.json({ message: "Product created successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}

//Product list
async function listProduct({ query }, res) {
    try {
        const { limit, page, panginationSchema } = await pagination(query)
        const { count, rows: data } = await Products.findAndCountAll({
            ...panginationSchema,
            ...(query?.search
                ? {
                    where: {
                        //search for category
                        ...(query?.search
                            ? {
                                title: {
                                    [Op.like]: `%${query?.search}%`,
                                },
                            }
                            : {}),
                    },
                }
                : {}),
        });

        const totalPages = Math.ceil(count / limit);

        return res.json({
            data,
            metaData: {
                totalPages,
                count: data.length > 0 ? count : 0,
                currentPage: page,
                limit,
            },
        });
    } catch (error) {
        // console.log(error);
        errorRequest(res, error);
    }
}
//find by Productid
async function findProduct({ params: { id } }, res) {
    try {
        const Product = await Products.findOne({ where: { id } });
        if (!Product) return res.json({ message: "Product Not Found" }); //  TOD
        return res.json(Product);
    } catch (error) {
        errorRequest(res, error);
    }
}
//Delete Product
async function deleteProduct({ params: { id } }, res) {
    try {
        await Products.destroy({
            where: { id },
        });
        return res.json({ message: "Product Deleleted Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}
//update Product
async function updateProduct({ params: { id }, body }, res) {
    try {

        const Product = await Products.findOne({ where: { id } });
        if (!Product) return res.json({ message: "Product Not Found" }); //  TOD

        await Products.update(body, { where: { id } });
        return res.json({ message: "Product Updated Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = {
    createProduct,
    listProduct,
    deleteProduct,
    updateProduct,
    findProduct,
};


