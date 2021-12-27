import {socket} from "../socketInstance";
import React, { useEffect } from "react";
import {useSnackbar} from "notistack";

function PushNotification() {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(()=>{
        socket.on("friendReqError", ()=> {
            enqueueSnackbar("Can't send friend request!",{variant:"error"})
        })
        socket.on("getFriendReq", (data) => {
            enqueueSnackbar("You have received friend request from "+data.name+".",{variant:"info"})
        })
    return () => {
        socket.off("friendReqError");
        socket.off("getFriendReq");
    }
    },[enqueueSnackbar]);
    return(
        <>
        </>
    );
}

export default PushNotification;