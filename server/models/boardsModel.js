const db = require('./database')

var postBoard = async (fen,isSingleplayer,playerWhite,playerBlack) => {
    await db.promise().query("INSERT INTO boards(fen,isSingleplayer,playerWhite,playerBlack) VALUES (?,?,?,?)",[fen,isSingleplayer, playerWhite, playerBlack])
    var result = await db.promise().query("SELECT id FROM boards WHERE fen=? AND isSingleplayer = ? AND playerWhite=? AND playerBlack=? ORDER BY id DESC LIMIT 1",[fen,isSingleplayer,playerWhite,playerBlack])
    return result[0][0].id;
}
var putBoard = (fen, id) => {
    db.promise().query("UPDATE boards SET fen=?,whiteMove=NOT whiteMove WHERE id=?",[fen,id])
}
var getBoard = async (id) => {
    var result = await db.promise().query("SELECT * FROM boards WHERE id=?", [id]);
    var arr = result[0][0];
    return arr;
}

module.exports = {postBoard, getBoard, putBoard}