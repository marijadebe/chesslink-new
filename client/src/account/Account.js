import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Error from "../Error";
import axios from 'axios';
import Loading from "../Loading";
import '../css/Account.css';
import { Avatar, Paper, Typography, Button, Divider, Fab, Tooltip, Box } from "@mui/material";
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import MainDial from "../main/MainDial";
import {socket} from "../socketInstance";
import { sendFriendReq } from '../socketHelper';
import PushNotification from "../pushnotifications/PushNotification";
import Navbar from "../main/Navbar";
import { API_URL } from "../apiHelper";
axios.defaults.withCredentials = true;

function Account(props) {
    var navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState({});
    let {name} = useParams();
    useEffect(()=> {
        axios.get(`${API_URL}/api/users/ANY/${name}`).then((result)=> {
            setLoading(false);
            result.data.joindate = new Date(result.data.joindate).getDate()+"."+parseInt(new Date(result.data.joindate).getMonth()+1)+"."+new Date(result.data.joindate).getFullYear();
            setData(result.data);
        }).catch((err)=> {
            setLoading(false);
            setError(true);
        })
    },[name])
    var navigateBack = () => {
        navigate('/');
    }
    if(loading) {return(<Loading/>)}
    else if(error) {return(<Error type="404" />)}
    else {
        return(
            <Box sx={{ display:"flex", flexGrow: 1, alignItems:"center", height:"100%",flexDirection:"column",justifyContent:"space-between" }}>
            <Navbar/>
            <Paper elevation={3} className="accountdisp">
                <br/>
                <Avatar src={data.avatar} sx={{height:60, width:60}} />
                <Typography variant="h6">{data.username}</Typography>
                <span><Button onClick={()=>sendFriendReq(socket,data.id)}>Add friend</Button><Button onClick={()=>navigate('/messages/'+name)}>Send message</Button></span>
                <Divider style={{width:'95%'}} />
                <Typography
                sx={{ mt: 0.5, ml: 2 }}
                color="text.secondary"
                display="block"
                variant="caption"
                >
                Personal information
                </Typography>
                <div className="info">
                    Status: {data.online === 1 ? "Online" : "Offline"}<br/>
                    Join date: {data.joindate}<br/>
                    Player ID: {data.id}<br/>
                </div>
            </Paper>
            <div></div>
            <div className="goback">
            <Tooltip title="Go back">
                <Fab color="secondary" aria-label="add" onClick={()=>navigateBack()}>
                    <SubdirectoryArrowLeftIcon/>
                </Fab>
            </Tooltip>
            </div>
            <MainDial/>
            <PushNotification />
            </Box>
        );
    }
}

export default Account;