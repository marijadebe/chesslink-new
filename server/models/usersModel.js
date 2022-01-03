/**
 * @namespace Models/Users
 */
const db = require('./database')
const ip = require('ip')

/**
 * Get all users
 * @async
 * @returns {Array} 
 * @memberof Models/Users
 * @inner
 */
var getUsers = async () => {
    var result = await db.promise().query("SELECT * FROM users");
    var arr = [];
    for(var i = 0; i < result[0].length; i++) {
        arr[i] = new Object();
        arr[i].id = result[0][i].id;
        arr[i].username = result[0][i].username;
        arr[i].rating = result[0][i].rating;
        arr[i].validated = result[0][i].validated;
        arr[i].online = result[0][i].online;
        arr[i].joindate = result[0][i].joindate;
        arr[i].avatar = "http://"+ip.address()+":8000"+result[0][i].avatar;
    }
    return arr;
}
/**
 * Get specific user by ID and/or username
 * @async
 * @param {Number} id 
 * @param {String} username 
 * @returns {Object} 
 * @memberof Models/Users
 * @inner
 */
var getUser = async (id,username) => {
    var result = await db.promise().query('SELECT * FROM users WHERE id=? or username=?', [id,username]);
    var arr = new Object();
    arr.id = result[0][0].id;
    arr.username = result[0][0].username;
    arr.rating = result[0][0].rating;
    arr.validated = result[0][0].validated;
    arr.online = result[0][0].online;
    arr.joindate = result[0][0].joindate;
    arr.avatar = "http://"+ip.address()+":8000"+result[0][0].avatar;
    return arr;
}
/**
 * Update users profile picture 
 * @function
 * @param {Number} id 
 * @param {String} pathname
 * @memberof Models/Users
 * @inner
 */
var putAvatar = (id, pathname) => {
    db.promise().query('UPDATE users SET avatar=? WHERE id=?',[pathname,id])
}

/**
 * Select top 5 players
 * @async
 * @returns {Array} 
 * @memberof Models/Users
 * @inner
 */
var getLeaderboard = async () => {
    var result = await db.promise().query("SELECT * FROM users ORDER BY rating DESC LIMIT 5")
    var res = Array();
    for (let i = 0; i < result[0].length; i++) {
        let obj = Object();
        obj.id = result[0][i].id;
        obj.username = result[0][i].username;
        obj.rating = result[0][i].rating;
        res.push(obj);
    }
    return res;
}

/**
 * Set new rating of user
 * @param {Number} id 
 * @param {Number} amount  
 * @memberof Models/Users
 * @inner
 */
var addRating = (id, amount) => {
    db.promise().query('UPDATE users SET rating=rating+? WHERE id=?',[amount,id]);
}

module.exports = {getUsers,getUser, putAvatar, getLeaderboard, addRating};