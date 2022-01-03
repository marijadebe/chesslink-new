/**
 * @namespace Models/Boards
 */
/**
 * Database driver object
 * @type {Object}
 * @memberof Models/Boards
 * @inner
 */
const db = require('./database')

/**
 * Get board id specified by params
 * @memberof Models/Boards
 * @inner
 * @async
 * @param {String} fen 
 * @param {Boolean} isSingleplayer 
 * @param {Number} playerWhite 
 * @param {Number} playerBlack 
 * @returns {Number}
 */
var postBoard = async (fen,isSingleplayer,playerWhite,playerBlack) => {
    await db.promise().query("INSERT INTO boards(fen,isSingleplayer,playerWhite,playerBlack) VALUES (?,?,?,?)",[fen,isSingleplayer, playerWhite, playerBlack])
    var result = await db.promise().query("SELECT id FROM boards WHERE fen=? AND isSingleplayer = ? AND playerWhite=? AND playerBlack=? ORDER BY id DESC LIMIT 1",[fen,isSingleplayer,playerWhite,playerBlack])
    return result[0][0].id;
}

/**
 * Update FEN in specified board
 * @param {String} fen 
 * @param {Number} id 
 * @memberof Models/Boards
 * @inner
 */
var putBoard = (fen, id) => {
    db.promise().query("UPDATE boards SET fen=?,whiteMove=NOT whiteMove WHERE id=?",[fen,id])
}

/**
 * Get board by ID
 * @async
 * @param {Number} id 
 * @returns {Object}
 * @memberof Models/Boards
 * @inner
 */
var getBoard = async (id) => {
    var result = await db.promise().query("SELECT * FROM boards WHERE id=?", [id]);
    var arr = result[0][0];
    return arr;
}

module.exports = {postBoard, getBoard, putBoard}