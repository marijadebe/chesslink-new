import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../apiHelper";
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
axios.defaults.withCredentials = true;

/**
 * @param {Number} props.data.caller - Caller's ID
 * @param {Number} props.data.roomid - Room ID
 */
function FriendDialog(props) {
    const [data, setData] = useState({});
    const [format, setFormat] = useState([]);
    const navigate = useNavigate();
    useEffect(()=> {
        axios.get(`${API_URL}/api/users/${props.data.caller}`).then((result) => {
            setData(result.data);
        }).catch((err)=> {

        })
    },[props.data])
    var handleAccept = () => {
        navigate(`/multiplayer/${props.data.roomid}`,{state:{audio:format.includes('mic') ? true : false,video:format.includes('cam') ? true: false}})
    }
    return(
        <Dialog open={props.open} onClose={props.onClose} >
            <DialogTitle>You have received a challenge from {data.username}!</DialogTitle>
            <DialogContent>
            <ToggleButtonGroup value={format} onChange={(evt,news)=>setFormat(news)} sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <ToggleButton value="cam">
                        {format.includes("cam") ? <VideocamIcon/> : <VideocamOffIcon/>}
                    </ToggleButton>
                    <ToggleButton value="mic">
                        {format.includes("mic") ? <MicIcon/> : <MicOffIcon/>}
                    </ToggleButton>
                </ToggleButtonGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" onClick={()=>handleAccept()}>Accept</Button>
                <Button variant="contained" color="error" onClick={()=>props.onClose}>Decline</Button>
            </DialogActions>
        </Dialog>
    );
}
export default FriendDialog;