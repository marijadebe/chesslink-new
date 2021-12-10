var socketModel = require('../models/socketModel')
var friendsModel = require('../models/friendsModel')
var clients = []

var onConnect = (socket) => {
  socketModel.postOnline(socket, true);
  clients.push({"socketid":socket.id,"userid":socket.request.session.identity})
  
  socket.on("disconnect", () => {
    socketModel.postOnline(socket, false);
  })
  socket.on("friendreq", async (data) => {
    var result = await friendsModel.postFriend(socket.request.session.identity, data)
    if(result == "error") socket.emit("friendReqError")
    for(var client in clients) {
      if(data == client.userid) {
        socket.to(client.socketid).emit("getFriendReq", {"name":socket.request.session.username, "id":socket.request.session.identity})
        break;
      }  
    }
  })
  socket.on("logout", () => {
    socketModel.postOnline(socket, false);
    socket.request.session.destroy();
  })
  socket.on("disconnect",() => {
    for(var client in clients) {
      if(client.socketid == socket.id) {
        clients.splice(i,1);
        break;
      }
    }
  })
}
  
module.exports = {onConnect};