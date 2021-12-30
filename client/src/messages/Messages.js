import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Error from '../Error';
import MainDial from '../main/MainDial';
import PushNotification from '../pushnotifications/PushNotification';
import { Avatar, Box, Divider, Paper, Badge, styled, Typography, IconButton, Tooltip} from '@mui/material';
import "../css/Messages.css";
import Navbar from '../main/Navbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {socket} from '../socketInstance';
import MessageChat from './MessageChat';
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
            <Box component={Paper} p={3} sx={{paddingBottom:1}} width="90%" className="flexBox">
                <div className="profile">
                <StyledBadge anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} variant="dot" overlap="circular" color={userData.online===1?"success":"error"}>
                    <Avatar src={userData.avatar} />
                </StyledBadge>&nbsp;&nbsp;&nbsp;<Typography variant="h6">{userData.username}</Typography><span className="showProf"><Tooltip title="Show profile"><IconButton onClick={()=>navigate('/users/'+userData.username)}><AccountCircleIcon/></IconButton></Tooltip></span>
                </div>
                <Divider/>
                <MessageChat PlayerId={userData.id} nameProp={name} />
            </Box>
            <MainDial/>
            <PushNotification />
        </>
    );
}

export default Messages;