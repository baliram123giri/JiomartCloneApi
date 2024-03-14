const { Category, Address, Pancard } = require("../../models/tables");
const { errorRequest } = require("../../utils/utils");
const { createCategoryValidations, updateCategoryValidations } = require("./validation");

//Category crerates
async function createCategory({ body }, res) {
    try {
        if (Array.isArray(body)) {
            await Category.bulkCreate(body)
        } else {
            await createCategoryValidations.validateAsync(body)
            await Category.create(body)
        }
        return res.json({ message: "Category created successfully" })

    } catch (error) {
        errorRequest(res, error);
    }
}
//Category list
async function listCategory({ body }, res) {
    try {
        const category = await Category.findAll()
        return res.json(category);
    } catch (error) {
        errorRequest(res, error);
    }
}
//find by Categoryid
async function findCategory({ params: { id } }, res) {
    try {
        const category = await Category.findOne({ where: { id } })
        if (!category) return res.json({ message: "Category Not Found" });  //  TOD     
        return res.json(category);
    } catch (error) {
        errorRequest(res, error);
    }
}
//Delete Category
async function deleteCategory({ params: { id } }, res) {
    try {
        await Category.destroy({
            where: { id }
        })
        return res.json({ message: "Category Deleleted Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}
//update Category
async function updateCategory({ params: { id }, body }, res) {
    try {
        await updateCategoryValidations.validateAsync(body)
        const category = await Category.findOne({ where: { id } })
        if (!category) return res.json({ message: "Category Not Found" });  //  TOD     

        await Category.update(body, { where: { id } })
        return res.json({ message: "Category Updated Successfully" });

    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = { createCategory, listCategory, deleteCategory, updateCategory, findCategory }