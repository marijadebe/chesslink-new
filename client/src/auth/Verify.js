import { Container, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";
axios.default.withCredentials = true;

function Verify() {
    var navigate = useNavigate();
    var [secCode, setSecCode] = useState("");

    var getVerify = () => {
        axios.get('http://localhost:8000/auth/reg', {params:{securitynumber:secCode}}).then((response)=> {
            navigate('/');
        }).catch((err)=> {
            console.log(err);
        })
    }
        return(
            <Container component="main" maxWidth="xs">
                <Typography></Typography>
                <Typography>Please enter your account verification code below.</Typography>
                <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                <TextField label="Verification code" pattern="[0-9]*" inputMode="numeric" margin="normal" variant="filled" value={secCode} onChange={(e) => setSecCode(e.target.value)}/>
                <Button margin="normal" size="medium" variant="contained" onClick={()=>getVerify()}>Verify</Button>
                </Box>
            </Container>
        );
}

export default Verify;