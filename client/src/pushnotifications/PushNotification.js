import {socket} from "../socketInstance";
import React, { useEffect, useState } from "react";
import {useSnackbar} from "notistack";
import FriendDialog from "./FriendDialog";
import { useNavigate } from "react-router-dom";

function PushNotification() {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [datapoint, setDatapoint] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        socket.on("friendReqError", ()=> {
            enqueueSnackbar("Can't send friend request!",{variant:"error"})
        })
        socket.on("getFriendReq", (data) => {
            enqueueSnackbar(`You have received friend request from ${data.name}.`,{variant:"info"})
        })
        /**
         * @callback
         * @param {Number} data - ID of a calling friend
         * @param {Number} resid - ID of the call's room
         */
        socket.on("friendCalling", (data,resid) => {
            enqueueSnackbar("Your friend is challenging you.", {variant:"info"})
            setOpen(true);
            setDatapoint({"caller":data,"roomid":resid})
        })
        socket.on("callFriendCallback", (id) => {
            enqueueSnackbar("Calling ... ",{variant:"info"})
            navigate(`/multiplayer/${id}`);
        })
    return () => {
        socket.off("friendReqError");
        socket.off("getFriendReq");
        socket.off("friendCalling");
        socket.off("callFriendCallback");
    }
    },[enqueueSnackbar]);
    var handleClose = () => {
        setOpen(false);    
    }
    return(
        <FriendDialog open={open} data={datapoint} onClose={handleClose} />
    );
}

export default PushNotification;