   var onConnect = (socket) => {
    const session = socket.request.session;
    session.connections++;
    session.save();
    
    socket.on("logout", ()=> {
      socket.request.session.destroy();
    })
  }
  
  module.exports = {onConnect};