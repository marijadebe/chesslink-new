var socketModel = require('../models/socketModel')
var friendsModel = require('../models/friendsModel')
var clients = []

var onConnect = (socket) => {
  socketModel.postOnline(socket, true);
  if(socket.request.session.identity != undefined) clients.push({"socketid":socket.id,"userid":socket.request.session.identity})
  socket.once("disconnect", () => {
    socketModel.postOnline(socket, false);
    clients = clients.filter(client => client.socketid != socket.id)
  })
  socket.on("friendreq", async (data) => {
    var result = await friendsModel.checkIfFriendExists(socket.request.session.identity, data)
    if(result == "error") {socket.emit("friendReqError");return;}
    friendsModel.postFriend(socket.request.session.identity, data)
    for(var client of clients) {
      if(data == client.userid) {
        socket.to(client.socketid).emit("getFriendReq", {"name":socket.request.session.username, "id":socket.request.session.identity})
        break;
      }  
    }
  })
  socket.on("getFriendsData", async ()=> {
    data = await friendsModel.getFriendsSpecific(socket.request.session.identity)
    socket.emit("getFriendsDataCallback",JSON.stringify(data),socket.request.session.identity)
  })
  socket.on('acceptFriendReq', async (id) => {
    friendsModel.acceptFriend(socket.request.session.identity,id);
  })
  socket.on('declineFriendReq', async (id) => {
    friendsModel.declineFriend(socket.request.session.identity, id);
  }) 
  socket.on("logout", () => {
    socketModel.postOnline(socket, false);
    socket.request.session.destroy();
    clients = clients.filter(client => client.socketid != socket.id)
  })
}
  
module.exports = {onConnect};