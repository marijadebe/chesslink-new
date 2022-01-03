/**
 * @namespace Models/Auth
 */
/**
 * Database driver object
 * @type {Object}
 * @memberof Models/Auth
 * @inner
 */
const db = require('./database')

/**
 * Select data of user specified by username and password
 * @async
 * @param {String} username 
 * @param {String} password 
 * @returns {Object}
 * @memberof Models/Auth
 * @inner
 */
var postLogin = async (username,password) => {
    var result = await db.promise().query("SELECT id,username,validated FROM users WHERE username=? and password=?",[username,password]);
    return result[0][0];
}
/**
 * Check if user exists and if not insert params
 * @async
 * @param {String} username 
 * @param {String} email 
 * @param {String} password 
 * @param {Number} securitynumber 
 * @returns {Object}
 * @memberof Models/Auth
 * @inner
 */
var postRegister = async (username, email, password, securitynumber) => {
    var result = await db.promise().query("SELECT id, username, email FROM users WHERE username=? or email=?",[username, email]);
    if(result[0].length > 0) {
        return "error[username,email]";
    }else {
        var result = await db.promise().query("INSERT INTO users (username,email,password,securitynumber) VALUES (?,?,?,?)",[username, email, password, securitynumber]);
        console.log(result.insertId);
        return {"type":"success","id":result.insertId};
    }
}
/**
 * Set validated to true
 * @async
 * @param {Number} securitynumber 
 * @param {String} username 
 * @returns {String}
 * @memberof Models/Auth
 * @inner
 */
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