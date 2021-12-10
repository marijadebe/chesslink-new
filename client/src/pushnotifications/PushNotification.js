import socket from "../socketInstance";
import React, { useState } from "react";

function PushNotification() {
    const { enqueueSnackbar } = useSnackbar();
    const [messages, setMessages] = useState([]);
    return(
        <>
         {messages}
        </>
    );
}

export default PushNotification;