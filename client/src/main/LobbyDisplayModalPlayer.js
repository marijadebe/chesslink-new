import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, List, ToggleButtonGroup, ToggleButton, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import socket from '../socketInstance';
import LobbyDisplayModalPlayerData from './LobbyDisplayModalPlayerData';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import Loading from '../Loading';
axios.defaults.withCredentials = true;

function LobbyDisplayModalPlayer(props) {
    const [data, setData] = useState([]);
    const [format, setFormat] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [color, setColor] = useState("white");
    const [recognitionToken, setRecognitionToken] = useState(0);
    useEffect(()=>socket.emit("getFriendsData"),[])
    useEffect(()=> {
        socket.on("getFriendsDataCallback",(datas,identifier) => {
          console.log(datas);
          var dataF = JSON.parse(datas)
          dataF = dataF.filter(item => item.accepted !== 0);
          setData(dataF);
          setRecognitionToken(identifier);
        })
        return () => {
          socket.off("getFriendsDataCallback")
        }
    },[])
    var handleClose = () => {
        props.onClose();
    }
    var callFriend = () => {
        socket.emit("callFriend",{color:color, format:format, player:selectedIndex})
    }
    return(
        <Dialog onClose={handleClose} open={props.open}>
            <DialogTitle>Create Game</DialogTitle>
            <DialogContent>
              <FormLabel>Select Opponent</FormLabel>
                <List>
                    {data.length <= 0 && <Loading/>}
                    {data.map((item) => (
                        <>
                         <LobbyDisplayModalPlayerData key={item.id} keyProp={item.id} datapoint={item} selectedIndex={selectedIndex} listItemClick={(evt,index)=>setSelectedIndex(index)} token={recognitionToken} />
                        </>
                    ))}
                </List>
                <FormLabel>Call Options</FormLabel><br/>
                <ToggleButtonGroup value={format} onChange={(evt,news)=>setFormat(news)} sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <ToggleButton value="cam">
                        {format.includes("cam") ? <VideocamIcon/> : <VideocamOffIcon/>}
                    </ToggleButton>
                    <ToggleButton value="mic">
                        {format.includes("mic") ? <MicIcon/> : <MicOffIcon/>}
                    </ToggleButton>
                </ToggleButtonGroup>
                <FormLabel>Select Color</FormLabel><br/>
                <Select value={color} onChange={(event)=>setColor(event.target.value)} sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <MenuItem value="black">Black</MenuItem>
                    <MenuItem value="white">White</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={()=>callFriend()}>Call</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LobbyDisplayModalPlayer;