/**
 * @namespace Controllers/Friends
 */
const friendsModel = require('../models/friendsModel')

/**
 * Get all friends
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @memberof Controllers/Friends
 * @inner
 */
var getFriends = async (req, res) => {
    try {
        var result = await friendsModel.getFriends()
        res.json(result)
    }catch(err) {
        res.status(404).send("Error 404")
    }
}
/**
 * Get specific friend
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @memberof Controllers/Friends
 * @inner
 */
var getFriend = async (req,res) => {
    try {
        var result = await friendsModel.getFriend(req.params.id, req.params.offerer, req.params.offeree)
        res.json(result)
    }catch(err) {
        res.status(404).send("Error 404")
    }
}

module.exports = {getFriends, getFriend}