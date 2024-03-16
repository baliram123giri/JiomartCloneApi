const { Op } = require("sequelize");
const { subChildCategory, SubChildCategory } = require("../../models/tables");
const { errorRequest } = require("../../utils/utils");
const {
    createSubChildCategoryValidations,
    updateSubChildCategoryValidations,
} = require("./validation");

//subChildCategory crerates
async function createSubChildCategory({ body, params: { subcategory_id } }, res) {
    try {
        if (Array.isArray(body)) {
            await SubChildCategory.bulkCreate(body.map(({ title }) => ({ title, subcategory_id, })));
        } else {
            await createSubChildCategoryValidations.validateAsync({ ...body, subcategory_id });
            await SubChildCategory.create(body);
        }
        return res.json({ message: "SubChildCategory created successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}
//subChildCategory list
async function listsubChildCategory({ query }, res) {
    try {
        const page = Number(query?.page) || 1; // Get the page number from the request query parameters, default to 1 if not provided
        const limit = Number(query?.limit) || 10; // Number of items per page
        const offset = (page - 1) * limit; // Calculate the offset

        const { count, rows: data } = await SubChildCategory.findAndCountAll({
            ...(query?.page ? { limit, offset } : {}),
            ...(query?.subCategoryId || query?.search
                ? {
                    where: {
                        //subCategoryId =>
                        ...(query?.subCategoryId
                            ? { subcategory_id: Number(query?.subCategoryId) }
                            : {}),
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
//find by subChildsubCategoryid
async function findsubChildCategory({ params: { id } }, res) {
    try {
        const subChildCategory = await SubChildCategory.findOne({ where: { id } });
        if (!subChildCategory) return res.json({ message: "SubChildCategory Not Found" }); //  TOD
        return res.json(subChildCategory);
    } catch (error) {
        errorRequest(res, error);
    }
}
//Delete subChildCategory
async function deleteSubChildCategory({ params: { id } }, res) {
    try {
        await SubChildCategory.destroy({
            where: { id },
        });
        return res.json({ message: "SubChildCategory Deleleted Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}
//update subChildCategory
async function updateSubChildCategory({ params: { id }, body }, res) {
    try {
        await updateSubChildCategoryValidations.validateAsync(body);
        const subChildCategory = await SubChildCategory.findOne({ where: { id } });
        if (!subChildCategory) return res.json({ message: "SubChildCategory Not Found" }); //  TOD

        await SubChildCategory.update(body, { where: { id } });
        return res.json({ message: "SubChildCategory Updated Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = {
    createSubChildCategory,
    listsubChildCategory,
    deleteSubChildCategory,
    updateSubChildCategory,
    findsubChildCategory,
};
