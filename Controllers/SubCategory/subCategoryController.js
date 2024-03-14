const { Op } = require("sequelize");
const { SubCategory } = require("../../models/tables");
const { errorRequest } = require("../../utils/utils");
const {
    createSubCategoryValidations,
    updateSubCategoryValidations,
} = require("./validation");

//SubCategory crerates
async function createSubCategory({ body }, res) {
    try {
        if (Array.isArray(body)) {
            await SubCategory.bulkCreate(body);
        } else {
            await createSubCategoryValidations.validateAsync(body);
            await SubCategory.create(body);
        }
        return res.json({ message: "SubCategory created successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}
//SubCategory list
async function listSubCategory({ query }, res) {
    try {
        const page = Number(query?.page) || 1; // Get the page number from the request query parameters, default to 1 if not provided
        const limit = Number(query?.limit) || 10; // Number of items per page
        const offset = (page - 1) * limit; // Calculate the offset

        const { count, rows: data } = await SubCategory.findAndCountAll({
            ...(query?.page ? { limit, offset } : {}),
            ...(query?.categoryId || query?.search
                ? {
                    where: {
                        //categoryId =>
                        ...(query?.categoryId
                            ? { category_id: Number(query?.categoryId) }
                            : {}),
                        //search for category
                        ...(query?.search
                            ? {
                                name: {
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
//find by SubCategoryid
async function findSubCategory({ params: { id } }, res) {
    try {
        const SubCategory = await SubCategory.findOne({ where: { id } });
        if (!SubCategory) return res.json({ message: "SubCategory Not Found" }); //  TOD
        return res.json(SubCategory);
    } catch (error) {
        errorRequest(res, error);
    }
}
//Delete SubCategory
async function deleteSubCategory({ params: { id } }, res) {
    try {
        await SubCategory.destroy({
            where: { id },
        });
        return res.json({ message: "SubCategory Deleleted Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}
//update SubCategory
async function updateSubCategory({ params: { id }, body }, res) {
    try {
        await updateSubCategoryValidations.validateAsync(body);
        const subCategory = await SubCategory.findOne({ where: { id } });
        if (!subCategory) return res.json({ message: "SubCategory Not Found" }); //  TOD

        await SubCategory.update(body, { where: { id } });
        return res.json({ message: "SubCategory Updated Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = {
    createSubCategory,
    listSubCategory,
    deleteSubCategory,
    updateSubCategory,
    findSubCategory,
};
