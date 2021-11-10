const crypto = require('crypto')
const authModel = require('../models/authModel')


var postRegister = (req, res) => {

}

var postLogin = async (req, res) => {
    var username = req.body.username;
    var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    var response = await authModel.postLogin(username,password);
    if(!response) {
        res.status(404).send("User doesn't exist")
    }else {
        req.session.login = true;
        req.session.username = response.username;
        res.status(200).send("success")
    }
}

var getLogin = (req, res) => {
    console.log(req.session.login)
    if(req.session.login) {
        res.status(200).send("success");
    }else {
        res.status(401).send("Forbidden");
    }
}

module.exports = {postRegister,postLogin, getLogin}