/**
 * @namespace Controllers/Boards
 */
const boardsModel = require('../models/boardsModel')
/**
 * Get board by ID
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @memberof Controllers/Boards
 * @inner
 */
var getBoard = async (req, res) => {
    try {
        var result = await boardsModel.getBoard(req.params.id)
        result.yourself = req.session.identity;
        res.json(result)
    }catch(err) {
        res.status(404).send("Error 404");
    }
}

module.exports = {getBoard}