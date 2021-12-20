const db = require('./database')
const ip = require('ip')

var getUsers = async () => {
    var result = await db.promise().query("SELECT * FROM users");
    var arr = [];
    for(var i = 0; i < result[0].length; i++) {
        arr[i] = new Object();
        arr[i].id = result[0][i].id;
        arr[i].username = result[0][i].username;
        arr[i].rating = result[0][i].rating;
        arr[i].validated = result[0][i].validated;
        arr[i].online = result[0][i].validated;
        arr[i].joindate = result[0][i].joindate;
        arr[i].avatar = "http://"+ip.address()+":8000"+result[0][i].avatar;
    }
    return arr;
}
var getUser = async (id,username) => {
    var result = await db.promise().query('SELECT * FROM users WHERE id=? or username=?', [id,username]);
    var arr = new Object();
    arr.id = result[0][0].id;
    arr.username = result[0][0].username;
    arr.rating = result[0][0].rating;
    arr.validated = result[0][0].validated;
    arr.online = result[0][0].validated;
    arr.joindate = result[0][0].joindate;
    arr.avatar = "http://"+ip.address()+":8000"+result[0][0].avatar;
    return arr;
}

var putAvatar = (id, pathname) => {
    db.promise().query('UPDATE users SET avatar=? WHERE id=?',[pathname,id])
}

module.exports = {getUsers,getUser, putAvatar};