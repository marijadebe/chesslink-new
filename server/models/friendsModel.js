const db = require('./database')
const ip = require('ip')


//OFFEROR NE OFFERER, OFFEROR NE OFFERER
var getFriends = async () => {
    var result = await db.promise().query('SELECT * FROM friends')
    return result[0]
}
var getFriendsSpecific = async (player) => {
    var result = await db.promise().query("SELECT friends.id AS frid,friends.accepted AS frac,us1.id AS us1id,us1.username AS us1us,us1.avatar AS us1av,us2.id AS us2id,us2.username AS us2us, us2.avatar AS us2av, us1.online AS us1on, us2.online AS us2on FROM friends JOIN users AS us1 ON friends.offeror=us1.id JOIN users AS us2 ON friends.offeree=us2.id WHERE offeror=? OR offeree=? GROUP BY friends.id",[player,player])
    var arr = Array();
    for(var i = 0; i < result[0].length; i++) {
        let obj = new Object();
        obj.id = result[0][i].frid;
        obj.offeror = {"id":result[0][i].us1id,"username":result[0][i].us1us,"avatar":"http://"+ip.address()+":8000"+result[0][i].us1av,"online":result[0][i].us1on};
        obj.offeree = {"id":result[0][i].us2id,"username":result[0][i].us2us,"avatar":"http://"+ip.address()+":8000"+result[0][i].us2av,"online":result[0][i].us2on};
        obj.accepted = result[0][i].frac;
        arr.push(obj)
    }
    return arr;
}
var getFriend = async (id,offeror,offeree) => {
    var result = await db.promise().query('SELECT * FROM friends WHERE id=? OR (offeror=? OR offeree=?)',[id,offeror,offeree]);
    var arr = new Object();
    arr.id = result[0][0].id;
    arr.offeror = result[0][0].offeror;
    arr.offeree = result[0][0].offeree; 
    return arr;
}
var postFriend = (offeror,offeree) => {
    db.promise().query('INSERT INTO friends(offeror,offeree) VALUES(?,?)',[offeror,offeree])
}
var checkIfFriendExists = async (offeror, offeree) => {
    var result = await db.promise().query('SELECT * FROM friends WHERE (offeror=? and offeree=?) OR (offeror=? AND offeree=?)',[offeror,offeree,offeree,offeror])
    if(result[0].length > 0) {
        return "error";
    }else {
        return "success";
    }
}
var acceptFriend = (offeree, offeror) => {
    db.promise().query('UPDATE friends SET accepted=1 WHERE offeror=? AND offeree =?',[offeror,offeree])
}
var declineFriend = (offeree, offeror) => {
    db.promise().query('DELETE FROM friends WHERE offeror=? AND offeree=?',[offeror,offeree])
}

module.exports = {getFriends, getFriend, postFriend, checkIfFriendExists, getFriendsSpecific, acceptFriend, declineFriend}