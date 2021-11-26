import React, {useContext, useState, useEffect} from "react";
import {styled} from '@mui/material/styles';
import {Grid,Paper, Box, Typography, SpeedDial, SpeedDialAction, SpeedDialIcon, Link, Button } from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import ChesslinkLogo from '../ChesslinkLogo';
import RatingChart from './RatingChart';
import SelectChart from './SelectChart';
import LobbyDisplay from './LobbyDisplay';
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SettingsIcon from '@mui/icons-material/Settings';
import { deleteLogin } from "../apiHelper";
import ModeContext from "../ModeContext";
import { io } from "socket.io-client";
import axios from 'axios';
import "../css/Main.css";
import Navbar from './Navbar';
import ConfigurationModal from "./ConfigurationModal";
axios.defaults.withCredentials = true;

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
  }));

function Main() {
    var navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [isConfOpen, setConfOpen] = useState(false);
    const {colorMode,setColorMode} = useContext(ModeContext);
    const [selectedChart, setSelectedChart] = useState(<RatingChart type="area" />);
    const sendChartType = (value) => {
        switch (value) {
            case "area":
                setSelectedChart(<RatingChart type="area" />);
                break;
            case "pie":
                setSelectedChart(<RatingChart type="pie" />);
                break;
            default:
                break;
        }
    }
    var changeColorMode = () => {
        if(colorMode === 'dark') {
            setColorMode('light');
        }else {
            setColorMode('dark');
        }
    }
    var unLog = () => {
        deleteLogin();
        navigate("signin");
    }
    useEffect(()=> {
        const newSocket = io(`http://localhost:8000`, {withCredentials:true});
        setSocket(newSocket);
        return () => newSocket.close();
    },[setSocket])
    return(
        <>
        <Box className="mainview" sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ flexGrow: 1 }} p={3}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Item>
                        <Typography variant="h2">Lobby</Typography>
                        <LobbyDisplay />
                    </Item>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item>
                        <Typography variant="h2">Feed</Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Item className="content">
                        <Typography variant="h2">Statistics&nbsp;<SelectChart signalChart={sendChartType}/></Typography>
                        {selectedChart}
                    </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item>
                        <Typography variant="h2">Friends</Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>
        </Box>
        <ConfigurationModal open={isConfOpen} handleClose={()=>setConfOpen(false)} />
        <SpeedDial
        ariaLabel="Display more"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        >
            <SpeedDialAction icon={<LogoutIcon />} onClick={()=>unLog()} tooltipTitle="Logout" />
            <SpeedDialAction icon={<LightbulbIcon />} onClick={()=>changeColorMode()} tooltipTitle="Change theme" />
            <SpeedDialAction icon={<SettingsIcon />} onClick={()=>setConfOpen(true)}tooltipTitle="Settings" />
        </SpeedDial>
      </>
    )
}

export default Main;