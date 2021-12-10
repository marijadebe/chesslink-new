import React, {useContext, useState, useEffect} from "react";
import {styled} from '@mui/material/styles';
import {Grid,Paper, Box, Typography, SpeedDial, SpeedDialAction, SpeedDialIcon, Link, Button, Autocomplete } from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import RatingChart from './RatingChart';
import SelectChart from './SelectChart';
import LobbyDisplay from './LobbyDisplay';
import {socket, reconnectSocket} from "../socketInstance";
import axios from 'axios';
import "../css/Main.css";
import Navbar from './Navbar';
import MainDial from "./MainDial";
import PlayersSearch from './PlayersSearch';
axios.defaults.withCredentials = true;

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
  }));

function Main() {
    const [selectedChart, setSelectedChart] = useState(<RatingChart type="area" />);
    useEffect(()=> {
        reconnectSocket();
    },[])
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
                        <Typography variant="h2">Players</Typography>
                        <PlayersSearch />
                    </Item>
                </Grid>
            </Grid>
        </Box>
        </Box>
        <MainDial/>
      </>
    )
}

export default Main;