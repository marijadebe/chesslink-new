const usersModel = require('../models/usersModel')

var getUsers = async (req, res) => {
    try {
        var result = await usersModel.getUsers();
        res.json(result);
    }catch(err) {
        res.status(404).send("Error 404");
    }
}
var getUser = async (req, res) => {
    try {
        var result = await usersModel.getUser(req.params.id,req.params.username);
        res.json(result);
    }catch(err) {
        res.status(404).send("Error 404");
    }
}
var postUpload = (req, res) => {
    try {
        usersModel.putAvatar(req.session.identity,"/img/"+req.file.filename)
    }catch(err) {
        res.status(404).send("Error 404");
    }
}

var getLeaderboard = async (req, res) => {
    try {
        var result = await usersModel.getLeaderboard();
        res.json(result);
    }catch(err) {
        res.status(404).send("Error 404");
    }
}

module.exports = {getUsers, getUser, postUpload, getLeaderboard}