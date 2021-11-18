import { Container, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router";
axios.default.withCredentials = true;

function Verify() {
    var [secCode, setSecCode] = useState("");
    var [isVerified, setIsVerified] = useState(false);

    var getVerify = () => {
        axios.get('http://localhost:8000/auth/reg', {params:{securitynumber:secCode}}).then((response)=> {
            console.log(response.data);
            setIsVerified(true);
        }).catch((err)=> {
            console.log(err);
        })
    }
    if(isVerified) {
        return(<Navigate to="/" />);
    }else {
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
}

export default Verify;