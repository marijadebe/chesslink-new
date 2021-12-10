const crypto = require('crypto')
const nodemailer = require('nodemailer')
const validator = require('email-validator')
const authModel = require('../models/authModel')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
});

var postRegister = async (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    var securitynumber = Math.floor(100000 + Math.random() * 900000);
    if(!validator.validate(email)) {
        res.status(403).send("Email is invalid");
    }
    var response = await authModel.postRegister(username,email,password,securitynumber);
    if(response == "success") {// nastav ID
        req.session.login = true;
        req.session.username = username;
        req.session.validated = 0;
        var mailOptions = {
            from: 'chesslinkservice@gmail.com',
            to: email,
            subject: 'Account Verification',
            html:'<h1>Welcome to Chesslink '+username+'!</h1><br/>Your verification code is '+securitynumber+'.<br/>Please remember this code in case you need to reset your password.'
        };
        transporter.sendMail(mailOptions);
        console.log(req.session.username);
        res.status(200).send("success")
    }else {
        res.status(403).send("Username or email already exists")
    }
}

var postLogin = async (req, res) => {
    var username = req.body.username;
    var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    var response = await authModel.postLogin(username,password);
    if(!response) {
        res.status(404).send("User doesn't exist")
    }else {
        req.session.login = true;
        req.session.identity = response.id;
        req.session.username = response.username;
        req.session.validated = response.validated;
        res.status(200).send("success")
    }
}

var getLogin = (req, res) => {
    if(req.session.login) {
        res.status(200).send((req.session.validated).toString())
    }else {
        res.status(401).send("Forbidden")
    }
}

var deleteLogin = (req, res) => {
    console.log(req.session)
    req.session.destroy();
}

var getVerify = async (req,res) => {
    var securitynumber = req.query.securitynumber;
    var response = await authModel.getVerify(securitynumber, req.session.username);
    if(response == "error[securitynumber]") {
        res.status(401).send("Forbidden")
    }else {
        req.session.validated = 1;
        res.status(200).send("success")
    }
}


module.exports = {postRegister, postLogin, getLogin, getVerify, deleteLogin}