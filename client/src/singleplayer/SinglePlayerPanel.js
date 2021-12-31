import { Avatar, Paper, Typography, Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

function SinglePlayerPanel({color, level}) {
    const [data, setData] = useState([]);
    useEffect(()=> {
        axios.get('/api/users/yourself').then((result)=> {
            setData(result.data);
        }).catch((err)=> {

        })
    },[])
    return(
        <Box component={Paper} className="boxStack">
            <span className="spam"><Avatar src="/img/computer.png" /><Typography>&nbsp;Computer</Typography>&nbsp;<Typography variant="caption">({level})</Typography><Divider/></span>
            <div><Typography variant="h5">VS</Typography></div>
            <span className="spam"><Divider/><Avatar src={data.avatar}/><Typography>&nbsp;{data.username}</Typography>&nbsp;<Typography variant="caption">({data.rating})</Typography></span>
        </Box>
    )
}

export default SinglePlayerPanel;