const db = require('./database')

var postLogin = async (username,password) => {
    var result = await db.promise().query("SELECT id,username,validated FROM users WHERE username=? and password=?",[username,password]);
    return result[0][0];
}

module.exports = {postLogin};