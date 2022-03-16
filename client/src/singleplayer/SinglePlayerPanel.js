import { Avatar, Paper, Typography, Box, Divider, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../apiHelper";
axios.defaults.withCredentials = true;

function SinglePlayerPanel({color, level, resignation}) {
    const [data, setData] = useState([]);
    useEffect(()=> {
        axios.get(`${API_URL}/api/users/yourself`).then((result)=> {
            setData(result.data);
        }).catch((err)=> {

        })
    },[])
    var resignGame = () => {
        resignation();
    }
    return(
        <Box component={Paper} className="boxStack">
            <span className="spam"><Avatar src={`${API_URL}/img/computer.png`} /><Typography>&nbsp;Computer</Typography>&nbsp;<Typography variant="caption">({level})</Typography><Divider/></span>
            <div><Typography variant="h5">VS</Typography></div>
            <span className="spam"><Divider/><Avatar src={data.avatar}/><Typography>&nbsp;{data.username}</Typography>&nbsp;<Typography variant="caption">({data.rating})</Typography></span>
            <br/><Button variant="contained" color="error" onClick={()=>resignGame()}>Resign</Button>
        </Box>
    )
}

export default SinglePlayerPanel;