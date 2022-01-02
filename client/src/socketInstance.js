import io from "socket.io-client";
let socket = io(`http://localhost:8000`, {withCredentials:true,reconnection:true});
var reconnectSocket = async () => {
        await socket.disconnect();
        await socket.connect();
}
export { socket, reconnectSocket };
export default socket;