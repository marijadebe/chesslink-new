import { Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, styled } from "@mui/system";
import "../css/ConfigurationModalColor.css";
import { API_URL } from "../apiHelper";
axios.defaults.withCredentials = true;
function ConfigurationModalColor(props) {
    const [hexDark, setHexDark] = useState("#B58863");
    const [hexLight, setHexLight] = useState('#FFFFFF');
    const [hexArrow, setHexArrow] = useState("#83CF63");
    useEffect(()=> {
        
    },[])
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        width:"50px",
        height:"50px",
        padding:"0",
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));    
    var saveColors = () => {
        axios.put(`${API_URL}/api/users/preferences`,{darkColor:hexDark,lightColor:hexLight,arrowColor:hexArrow});
    }  
    return(
        <>
            <Grid item xs={6}>
                <Typography variant="overline">Change Tiles</Typography>
                <Divider />
                <Box component="form" sx={{ p: '2px 4px', display: 'flex',flexDirection:"column",alignItems: 'center'}}><br/>
                <Typography variant="caption">Dark tile HEX code:</Typography>
                <TextField size="small" placeholder="#" onChange={(event)=>setHexDark("#"+event.target.value)} inputProps={{ maxLength: 6 }}/>
                <Typography variant="caption">Light tile HEX code:</Typography>
                <TextField size="small" placeholder="#" onChange={(event)=>setHexLight("#"+event.target.value)} inputProps={{ maxLength: 6 }}/>
                <br/>
                <div className="gridClass">
                    <div style={{backgroundColor:hexDark,width:50,height:50}}></div>
                    <div style={{backgroundColor:hexLight,width:50,height:50}}></div>
                    <div style={{backgroundColor:hexLight,width:50,height:50}}></div>
                    <div style={{backgroundColor:hexDark,width:50,height:50}}></div>
                </div>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="overline">Arrow Style</Typography>
                <Divider />    
                <Box component="form" sx={{ p: '2px 4px', display: 'flex',flexDirection:"column",alignItems: 'center'}}><br/>
                    <Typography variant="caption">Arrow HEX code:</Typography>
                    <TextField size="small" placeholder="#" onChange={(event)=>setHexArrow("#"+event.target.value)} inputProps={{ maxLength: 6 }}/>
                    <br/>
                    <div style={{backgroundColor:hexArrow,width:50,height:50}}></div>
                </Box>            
            </Grid>
            <Grid item xs={12} textAlign="center">
                <Button variant="contained" onClick={()=>saveColors()}>Save</Button>
            </Grid>
        </>
    );
}

export default ConfigurationModalColor;