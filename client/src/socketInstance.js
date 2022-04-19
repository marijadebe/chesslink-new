import io from "socket.io-client";
import { API_URL } from "./apiHelper";
let socket = io(`${API_URL}`, {'withCredentials':true,'reconnection':true,'reconnectionDelay': 500,'reconnectionAttempts': 10});

var reconnectSocket = async () => {
        await socket.disconnect();
        await socket.connect();
}
export { socket, reconnectSocket };
export default socket;