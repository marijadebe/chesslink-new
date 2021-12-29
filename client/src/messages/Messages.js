import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Error from '../Error';
import MainDial from '../main/MainDial';
import PushNotification from '../pushnotifications/PushNotification';
import { Avatar, Box, Divider, Paper, Badge, styled, Typography, IconButton, Tooltip, TextField, Button } from '@mui/material';
import "../css/Messages.css";
import Navbar from '../main/Navbar';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Message from './Message';
axios.defaults.withCredentials = true;

function Messages() {
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const {name} = useParams();
    var navigate = useNavigate();
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""',
          },
        }
      }));
    useEffect(()=> {
        axios.get('/api/messages/'+name).then((result)=> {
            setData(result.data);
        }).catch((err)=>{
            setError(true);
        })
        axios.get('/api/users/ANY/'+name).then((result)=> {
            setUserData(result.data);
        }).catch((err)=> {
            setError(true);
        })
    },[])
    if(error) return <Error type="404" />;
    return(
        <>
            <Navbar />
            <Box component={Paper} p={3} width="90%" className="flexBox">
                <div className="profile">
                <StyledBadge anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} variant="dot" overlap="circular" color={userData.online===1?"success":"error"}>
                    <Avatar src={userData.avatar} />
                </StyledBadge>&nbsp;&nbsp;&nbsp;<Typography variant="h6">{userData.username}</Typography><span className="showProf"><Tooltip title="Show profile"><IconButton onClick={()=>navigate('/users/'+userData.username)}><AccountCircleIcon/></IconButton></Tooltip></span>
                </div>
                <Divider/>
                <div className="dataView">
                    {
                        data.map((item)=>
                            <Message className="dataChildren" isYourself={item.isSenderUser} content={item.message} time={item.sendtime} key={item.id} />
                        )
                    }
                </div>
                <Divider />
                <span className="inputClass">
                    <TextField variant="outlined" label="Type message" size="small" className="input" /><IconButton><SendIcon/></IconButton>
                </span>
            </Box>
            <MainDial/>
            <PushNotification />
        </>
    );
}

export default Messages;