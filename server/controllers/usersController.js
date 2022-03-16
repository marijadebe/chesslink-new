/**
 * @namespace Controllers/Users
 */
const usersModel = require('../models/usersModel')

/**
 * Get all users
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 * @memberof Controllers/Users
 * @inner
 */
var getUsers = async (req, res) => {
    try {
        var result = await usersModel.getUsers();
        res.json(result);
    }catch(err) {
        res.status(404).send("Error 404");
    }
}

/**
 * Get specific user by ID or name
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 * @memberof Controllers/Users
 * @inner
 */
var getUser = async (req, res) => {
    try {
        var result = await usersModel.getUser(req.params.id,req.params.username);
        res.json(result);
    }catch(err) {
        res.status(404).send("Error 404");
    }
}

/**
 * Get currect session user
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 * @memberof Controllers/Users
 * @inner
 */
var getYourself = async (req,res) => {
    try {
        var result = await usersModel.getUser(req.session.identity, "ANY");
        res.json(result);
    }catch(err) {
        res.status(404).send("Error 404");
    }
}

/**
 * Post profile picture
 * @param {Object} req 
 * @param {Object} res 
 */
var postUpload = (req, res) => {
    try {
        usersModel.putAvatar(req.session.identity,"/img/"+req.file.filename)
    }catch(err) {
        res.status(404).send("Error 404");
    }
}

/**
 * Get highest rated users
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @memberof Controllers/Users
 * @inner
 */
var getLeaderboard = async (req, res) => {
    try {
        var result = await usersModel.getLeaderboard();
        res.json(result);
    }catch(err) {
        res.status(404).send("Error 404");
    }
}

var putPreferences = (req, res) => {
    try {
        console.log(req.body);
        usersModel.putPreferences(req.session.identity,req.body.darkColor, req.body.lightColor, req.body.arrowColor);
    }catch(err) {
        res.status(404).send("Error 404");
    }
}

module.exports = {getUsers, getUser, postUpload, getLeaderboard, getYourself, putPreferences}