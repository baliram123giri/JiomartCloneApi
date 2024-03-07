function errorRequest(res, error) {
    // console.log(error)
    return res.status(500).json({ message: error.parent?.sqlMessage || error.message });
}
module.exports = {errorRequest}