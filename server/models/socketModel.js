const db = require('./database')

var postOnline = (socket, online) => {
    db.promise().query('UPDATE users SET online=? WHERE username=?', [online,socket.request.session.username])
}

module.exports = {postOnline}