const db = require('./database')

var postLogin = async (username,password) => {
    var result = await db.promise().query("SELECT id,username,validated FROM users WHERE username=? and password=?",[username,password]);
    return result[0][0];
}

var postRegister = async (username, email, password, securitynumber) => {
    var result = await db.promise().query("SELECT id, username, email FROM users WHERE username=? or email=?",[username, email]);
    if(result[0].length > 0) {
        return "error[username,email]";
    }else {
        db.promise().query("INSERT INTO users (username,email,password,securitynumber) VALUES (?,?,?,?)",[username, email, password, securitynumber]);
        return "success";
    }
}

var getVerify = async (securitynumber, username) => {
    var result = await db.promise().query("SELECT * FROM users WHERE securitynumber=? AND username=?",[securitynumber,username]);
    if(result[0].length > 0) {
        db.promise().query("UPDATE users SET validated=1 WHERE username=?",[username]);
        return "success";
    }else {
        return "error[securitynumber]";
    }
}

module.exports = {postLogin, postRegister, getVerify}