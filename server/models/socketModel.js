/**
 * @namespace Models/Socket
 */
const db = require('./database')

/**
 * Set online
 * @param {Object} socket 
 * @param {Boolean} online 
 * @memberof Models/Socket
 * @inner
 */
var postOnline = (socket, online) => {
    db.promise().query('UPDATE users SET online=? WHERE username=?', [online,socket.request.session.username])
}

module.exports = {postOnline}