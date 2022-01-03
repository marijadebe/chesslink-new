/**
 * @namespace Models/Messages
 */
const db = require('./database')

/**
 * Get all messages between two users
 * @async
 * @param {Number} oneid 
 * @param {Number} twoid 
 * @returns {Array} 
 * @memberof Models/Messages
 * @inner
 */
var getMessages = async (oneid, twoid) => {
    var result = await db.promise().query("SELECT * FROM messages WHERE (sender=? AND receiver=?) OR (sender=? AND receiver=?) ORDER BY sendtime DESC LIMIT 8",[oneid,twoid,twoid,oneid])
    var arr = Array();
    for (let i = result[0].length-1; i >= 0; i--) {
        let obj = Object();
        obj.id = result[0][i].id;
        obj.sender = result[0][i].sender;
        obj.receiver = result[0][i].receiver;
        obj.sendtime = result[0][i].sendtime;
        if(result[0][i].sender == oneid) {
            obj.isSenderUser = true;
        }else {
            obj.isSenderUser = false;
        }
        obj.message = result[0][i].message;
        arr.push(obj);
    }
    return arr;
}
/**
 * Post message between users
 * @async
 * @param {Number} sender 
 * @param {Number} receiver 
 * @param {String} message 
 * @returns {Object} 
 * @memberof Models/Messages
 * @inner
 */
var postMessage = async (sender, receiver, message) => {
    db.promise().query("INSERT INTO messages(sender,receiver,message) VALUES (?,?,?)",[sender,receiver,message])
    var result = await db.promise().query("SELECT * FROM messages WHERE sender=? AND receiver=? AND message=? ORDER BY sendtime DESC LIMIT 1",[sender,receiver,message])
    return result[0][0];
}

module.exports = {getMessages, postMessage}