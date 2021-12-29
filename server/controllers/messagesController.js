const messagesModel = require('../models/messagesModel')
const usersModel = require('../models/usersModel')

var getMessages = async (req, res) => {
    try {
        var resource = await usersModel.getUser(-1,req.params.username)
        var result = await messagesModel.getMessages(req.session.identity, resource.id)
        res.json(result)
    }catch(err) {
        res.status(404).send("Error 404")
    }
}

module.exports = {getMessages}