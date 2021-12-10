const db = require('./database')
//OFFEROR NE OFFERER, OFFEROR NE OFFERER
var getFriends = async () => {
    var result = await db.promise().query('SELECT * FROM friends')
    return result[0]
}
var getFriend = async (id,offeror,offeree) => {
    var result = await db.promise().query('SELECT * FROM friends WHERE id=? OR offeror=? OR offeree=?',[id,offeror,offeree]);
    var arr = new Object();
    arr.id = result[0][0].id;
    arr.offerer = result[0][0].offerer;
    arr.offeree = result[0][0].offeree;
    return arr;
}
var postFriend = async(offeror,offeree) => {
    var result = await db.promise().query('SELECT * FROM friends WHERE offeror=? AND offeree = ?',[offeror,offeree])
    if(result[0].length > 0) return "error";
    var result = await db.promise().query('INSERT IGNORE INTO friends(offeror,offeree) VALUES(?,?)',[offeror,offeree])
    if(result[0].length > 0) {
        return "success";
    }else {
        return "error";
    }
}

module.exports = {getFriends, getFriend, postFriend}