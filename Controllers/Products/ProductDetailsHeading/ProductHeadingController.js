const { errorRequest, pagination } = require("../../../utils/utils");
const { productDetailHeadingValidation } = require("./validation");

const { Op } = require("sequelize");

const { ProductDetailHeading } = require("../../../models/tables");


//ProductDetailsHeading crerates
async function createProductDetailsHeading({ body }, res) {
    try {
        if (Array.isArray(body)) {
            await ProductDetailHeading.bulkCreate(body);
        } else {
            await productDetailHeadingValidation.validateAsync(body);
            await ProductDetailHeading.create(body);
        }
        return res.json({ message: "Product Heading created successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}

//ProductDetailsHeading list
async function listProductDetailsHeading({ query }, res) {
    try {
        const { limit, page, panginationSchema } = await pagination(query)
        const { count, rows: data } = await ProductDetailHeading.findAndCountAll({
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
//find by ProductDetailsHeadingid
async function findProductDetailsHeading({ params: { id } }, res) {
    try {
        const ProductDetailsHeading = await ProductDetailHeading.findOne({ where: { id } });
        if (!ProductDetailsHeading) return res.json({ message: "ProductHeading Not Found" }); //  TOD
        return res.json(ProductDetailsHeading);
    } catch (error) {
        errorRequest(res, error);
    }
}
//Delete ProductDetailsHeading
async function deleteProductDetailsHeading({ params: { id } }, res) {
    try {
        await ProductDetailHeading.destroy({
            where: { id },
        });
        return res.json({ message: "ProductHeading Deleleted Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}
//update ProductDetailsHeading
async function updateProductDetailsHeading({ params: { id }, body }, res) {
    try {
        await updateProductDetailsHeadingValidations.validateAsync(body);
        const ProductDetailsHeading = await ProductDetailHeading.findOne({ where: { id } });
        if (!ProductDetailsHeading) return res.json({ message: "ProductHeading Not Found" }); //  TOD

        await ProductDetailHeading.update(body, { where: { id } });
        return res.json({ message: "ProductHeading Updated Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = {
    createProductDetailsHeading,
    listProductDetailsHeading,
    deleteProductDetailsHeading,
    updateProductDetailsHeading,
    findProductDetailsHeading,
};


