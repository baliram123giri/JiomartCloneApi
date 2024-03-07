const { Address, Pancard } = require("../../models/tables");
const { errorRequest } = require("../../utils/utils");
const { createPancardValidations } = require("./validation");

//PanCard crerates
async function createPancard({ body }, res) {
    try {
        await createPancardValidations.validateAsync(body)
        const pancard = await Pancard.create(body)
        return res.json(pancard);
    } catch (error) {
        errorRequest(res, error);
    }
}
//Pancard list
async function listPancard({ }, res) {
    try {
        const pancards = await Pancard.findAll()
        return res.json(pancards);
    } catch (error) {
        errorRequest(res, error);
    }
}
//Delete Pancard
async function deletePancard({ params: { id } }, res) {
    try {
        await Pancard.destroy({
            where: { id }
        })
        return res.json({ message: "Pancard Deleleted Successfully" });
    } catch (error) {
        errorRequest(res, error);
    }
}

module.exports = { createPancard, listPancard, deletePancard }