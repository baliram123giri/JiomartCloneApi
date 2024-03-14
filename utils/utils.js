const { Op } = require("sequelize");

function errorRequest(res, error) {
    // console.log(error)
    return res.status(500).json({ message: error.parent?.sqlMessage || error.message });
}

async function pagination(query) {
    const page = Number(query?.page) || 1
    const limit = Number(query?.limit) || 10
    const offset = (page - 1) * limit
    return { page, limit, offset, panginationSchema: { ...(query?.page ? { limit, offset } : {}) } }
}

async function getColumnsKeys(ModelName, search) {
    if (!search) return []
    const columns = Object.keys(ModelName?.getAttributes());
    const searchConditions = []
    columns.forEach(column => {
        if (column !== "createdAt" && column !== "updatedAt" && column !== "dob") {
            searchConditions.push({
                [column]: { [Op.like]: `%${search}%` },
            })
        }
    });
    return searchConditions
}

module.exports = { errorRequest, pagination, getColumnsKeys }