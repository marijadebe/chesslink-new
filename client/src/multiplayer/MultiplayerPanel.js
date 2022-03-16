import { Avatar, Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../apiHelper";
axios.defaults.withCredentials = true;

function MultiplayerPanel({propData}) {
    console.log(propData);
    const [data, setData] = useState([]);
    const [dataEnemy, setDataEnemy] = useState([]);
    useEffect(()=> {
        axios.get('/api/users/yourself').then((result)=> {
            setData(result.data);
        }).catch((err)=> {

        })
        let enemyPlayer = 0;
        if(propData.playerWhite == propData.yourself) {
            enemyPlayer = propData.playerBlack;
        }else {
            enemyPlayer = propData.playerWhite;
        }
        axios.get(`${API_URL}/api/users/${enemyPlayer}`).then((result) => {
            setDataEnemy(result.data);
        }).catch((err)=> {
        
        })
    },[])
    return(
        <Box component={Paper} className="boxStack">
            <span className="spam"><Avatar src={dataEnemy.avatar} /><Typography>&nbsp;{dataEnemy.username}</Typography>&nbsp;<Typography variant="caption">({dataEnemy.rating})</Typography><Divider/></span>
            <div><Typography variant="h5">VS</Typography></div>
            <span className="spam"><Divider/><Avatar src={data.avatar}/><Typography>&nbsp;{data.username}</Typography>&nbsp;<Typography variant="caption">({data.rating})</Typography></span>
        </Box>
    );
}

export default MultiplayerPanel;