const chessEngine = require('js-chess-engine')
const { Chess } = require('chess.js')
var socketModel = require('../models/socketModel')
var friendsModel = require('../models/friendsModel')
var messagesModel = require('../models/messagesModel')
var boardsModel = require('../models/boardsModel')
const { addRating } = require('../models/usersModel.js')
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
  socket.on("stockfishMove", (fen) => {
    var chess = new Chess(fen);
    if(chess.game_over()) { //player checkmate
      socket.emit("stockfishMoveWin");
      addRating(socket.request.session.identity, 5);
      return;
    }
    let game = new chessEngine.Game(fen)
    game.aiMove(2)
    var data = game.exportFEN()
    chess = new Chess(data);
    if(chess.game_over()) { //computer checkmate
      socket.emit("stockfishMoveLoss");
    }
    socket.emit("stockfishMoveCallback", data)
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
  socket.on('sendMessageChat', async (data)=> {
    var result = await messagesModel.postMessage(socket.request.session.identity, data.id, data.message);
    if(result.sender == socket.request.session.identity) {
      result.isSenderUser = true;
    }else {
      result.isSenderUser = false;
    }
    socket.emit("receiveMessageChat", result);
    for(var client of clients) {
      if(client.userid == data.id) {
        result.isSenderUser = !result.isSenderUser;
        socket.to(client.socketid).emit("receiveMessageChat", result);
      }
    }
  }) 
  socket.on("logout", () => {
    socketModel.postOnline(socket, false);
    socket.request.session.destroy();
    clients = clients.filter(client => client.socketid != socket.id)
  })
  socket.on("joinRoom", (id) => {
    socket.join("room"+id);
  })
  //state.color("white"/"black"),state.format([?"cam",?"mic"]),state.player(callee's id)
  socket.on("callFriend", async (state)=> {
    let playerWhite; let playerBlack;
    if(state.color == "white") {
      playerWhite = socket.request.session.identity;
      playerBlack = state.player;
    }else {
      playerWhite = state.player;
      playerBlack = socket.request.session.identity;
    }
    var resId = await boardsModel.postBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', false, playerWhite, playerBlack);
    socket.emit("callFriendCallback", resId);
    for(client of clients) {
      if(client.userid == state.player) {
        socket.to(client.socketid).emit("friendCalling", socket.request.session.identity, resId)
      }
    }
  })
}
  
module.exports = {onConnect};