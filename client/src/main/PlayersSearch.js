import { Autocomplete, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";
import "../css/PlayersSearch.css";
import PersonIcon from '@mui/icons-material/Person';
axios.defaults.withCredentials = true;


function PlayersSearch() {
    const navigate = useNavigate();
    const [playerSearched, setPlayerSearched] = useState("");
    const [data, setData] = useState([]);
    useEffect(()=> {
        axios.get('http://localhost:8000/api/users').then((result)=> {
            let trimmedResult = result.data.map(x => x.username);
            setData(trimmedResult);
        })
    },[])
    var navigateToProfile = () => {
        navigate('/users/'+playerSearched)
    }
    return(
      <>
      <div className="searchUser">
       <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        sx={{ width: 300 }}
        onChange={(event,val)=>setPlayerSearched(val)}
        renderInput={(params) => <TextField {...params} label="Search" value={playerSearched} onChange={(event)=>setPlayerSearched(event.target.value)} />}
        />
        <Button onClick={()=>navigateToProfile()}>Show</Button>
        </div><br/>
        Leaderboard
      </>  
    );
}

export default PlayersSearch;