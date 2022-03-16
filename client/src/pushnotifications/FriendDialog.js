import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../apiHelper";
axios.defaults.withCredentials = true;

/**
 * @param {Number} props.data.caller - Caller's ID
 * @param {Number} props.data.roomid - Room ID
 */
function FriendDialog(props) {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    useEffect(()=> {
        axios.get(`${API_URL}/api/users/${props.data.caller}`).then((result) => {
            setData(result.data);
        }).catch((err)=> {

        })
    },[props.data])
    var handleAccept = () => {
        navigate(`/multiplayer/${props.data.roomid}`)
    }
    return(
        <Dialog open={props.open} onClose={props.onClose} >
            <DialogTitle>You have received a challenge from {data.username}!</DialogTitle>
            <DialogActions>
                <Button variant="contained" color="success" onClick={()=>handleAccept()}>Accept</Button>
                <Button variant="contained" color="error" onClick={()=>props.onClose}>Decline</Button>
            </DialogActions>
        </Dialog>
    );
}
export default FriendDialog;