const db = require('./database')

var postBoard = async (fen,isSingleplayer,playerWhite,playerBlack) => {
    db.promise().query("INSERT INTO boards(fen,isSingleplayer,playerWhite,playerBlack) VALUES (?,?,?,?)",[fen,isSingleplayer, playerWhite, playerBlack])
    var result = await db.promise().query("SELECT id FROM boards WHERE fen=? AND isSingleplayer = ? AND playerWhite=? AND playerBlack=? ORDER BY id DESC LIMIT 1",[fen,isSingleplayer,playerWhite,playerBlack])
    return result[0][0].id;
}

module.exports = {postBoard}