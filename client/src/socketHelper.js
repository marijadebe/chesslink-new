export const sendFriendReq = (socket, friend) => {
    socket.emit('friendreq', friend)
}