import React, {useContext, useState, useEffect} from "react";
import {styled} from '@mui/material/styles';
import {Grid,Paper, Box, Typography, SpeedDial, SpeedDialAction, SpeedDialIcon, Link } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import ChesslinkLogo from '../ChesslinkLogo';
import RatingChart from './RatingChart';
import SelectChart from './SelectChart';
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SettingsIcon from '@mui/icons-material/Settings';
import ModeContext from "../ModeContext";
import { io } from "socket.io-client";
import axios from 'axios';
import "../css/Main.css";
axios.defaults.withCredentials = true;

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
  }));

function Main() {
    const [socket, setSocket] = useState(null);
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
    useEffect(()=> {
        const newSocket = io(`http://${window.location.hostname}:8000`);
        setSocket(newSocket);
        return () => newSocket.close();
    },[setSocket])
    return(
        <>
        <Box sx={{ display: 'flex',flexDirection: 'column',height:'100%' }} p={3}>
        <Typography variant="h2"><span className="clout">Chesslink&nbsp;<ChesslinkLogo size="70"/></span></Typography>
        <Box sx={{ flexGrow: 1 }} p={3}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant="h2">Lobby</Typography>
                        <Link component={RouterLink} to="/signin">REDIRECT</Link>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant="h2">Feed</Typography>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item className="content">
                        <Typography variant="h2">Statistics&nbsp;<SelectChart signalChart={sendChartType}/></Typography>
                        {selectedChart}
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <Typography variant="h2">Friends</Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>
        </Box>
        <SpeedDial
        ariaLabel="Display more"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        >
            <SpeedDialAction icon={<LogoutIcon />} tooltipTitle="Logout" />
            <SpeedDialAction icon={<LightbulbIcon />} onClick={()=>changeColorMode()} tooltipTitle="Change theme" />
            <SpeedDialAction icon={<SettingsIcon />} tooltipTitle="Settings" />
        </SpeedDial>
      </>
    )
}

export default Main;