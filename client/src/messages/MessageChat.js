import React, {useState, useEffect} from "react";
import { Divider, TextField, IconButton } from "@mui/material";
import Message from "./Message";
import {socket} from "../socketInstance";
import MessageCounter from "./MessageCounter";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import "../css/Messages.css";
axios.defaults.withCredentials = true;


function MessageChat({PlayerId, nameProp}) {
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    useEffect(()=> {
        axios.get('/api/messages/'+nameProp).then((result)=> {
            setData(result.data);
        });
    },[])
    useEffect(()=> {
        socket.on("receiveMessageChat", (res) => {
            let newArr = [...data,res];
            newArr.shift();
            setData(newArr);
         });
         return ()=> {
             socket.off("receiveMessageChat")
         }
    },[data])

    var sendMessage = () => {
        socket.emit("sendMessageChat",{id:PlayerId,message:message});
        setMessage("");
    }
    return(
        <>
        <div className="dataView">
                {
                    data.map((item)=>
                        <Message className="dataChildren" isYourself={item.isSenderUser} content={item.message} time={item.sendtime} key={item.id} />
                    )
                }
            </div>
            <Divider />
            <span className="inputClass">
                <TextField value={message} inputProps={{maxLength:150}} onChange={(evt)=>setMessage(evt.target.value)} variant="outlined" label="Type message" size="small" className="input" />&nbsp;&nbsp;<IconButton onClick={()=>sendMessage()}><SendIcon/></IconButton>
            </span>
        <MessageCounter count={message.length} /> 
        </>
    );
}

export default MessageChat;