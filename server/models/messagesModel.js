const db = require('./database')

var getMessages = async (oneid, twoid) => {
    var result = await db.promise().query("SELECT * FROM messages WHERE (sender=? AND receiver=?) OR (sender=? AND receiver=?)",[oneid,twoid,twoid,oneid])
    var arr = Array();
    for (let i = 0; i < result[0].length; i++) {
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

module.exports = {getMessages}