import React, {useState, useEffect} from "react";
import {styled} from '@mui/material/styles';
import {Grid,Paper, Box, Typography } from '@mui/material';
import RatingChart from './RatingChart';
import SelectChart from './SelectChart';
import LobbyDisplay from './LobbyDisplay';
import axios from 'axios';
import "../css/Main.css";
import Navbar from './Navbar';
import MainDial from "./MainDial";
import PlayersSearch from './PlayersSearch';
import PushNotification from "../pushnotifications/PushNotification";
import Leaderboard from "./Leaderboard";
import { useTheme } from '@mui/material/styles';
axios.defaults.withCredentials = true;

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
  }));

function Main() {
    const theme = useTheme();
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
    return(
        <>
        <Box className="mainview" sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box p={3}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Item className="kidGrid" sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                        <Typography variant="h2">Lobby</Typography>
                        <LobbyDisplay />
                    </Item>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item className="kidGrid">
                        <Typography variant="h2">Feed</Typography>
                        <iframe src={"https://lichess.org/training/frame?theme=brown&bg="+theme.palette.mode} className="lichessIframe" title="lichess_iframe" frameBorder="0"></iframe>
                    </Item>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Item className="content kidGrid">
                        <Typography variant="h2">Statistics&nbsp;<SelectChart signalChart={sendChartType}/></Typography>
                        {selectedChart}
                    </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item className="kidGrid">
                        <Typography variant="h2">Players</Typography>
                        <PlayersSearch />
                        <Leaderboard />
                    </Item>
                </Grid>
            </Grid>
        </Box>
        </Box>
        <MainDial/>
        <PushNotification />
      </>
    )
}

export default Main;