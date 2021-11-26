var socketModel = require('../models/socketModel')

var onConnect = (socket) => {
  //console.log(socket.request.session.username)
  socketModel.postOnline(socket, true);
  
  socket.on("disconnect", () => {
    socketModel.postOnline(socket, false);
  })
  socket.on("logout", () => {
    socketModel.postOnline(socket, false);
    socket.request.session.destroy();
  })
}
  
module.exports = {onConnect};