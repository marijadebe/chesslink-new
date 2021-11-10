const db = require('./database')

var getUsers = async () => {
    var result = await db.promise().query("SELECT * FROM users");
    var arr = [];
    for(var i = 0; i < result[0].length; i++) {
        arr[i] = new Object();
        arr[i].id = result[0][i].id;
        arr[i].username = result[0][i].username;
        arr[i].rating = result[0][i].rating;
        arr[i].validated = result[0][i].validated;
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
    return arr;
}

module.exports = {getUsers,getUser};