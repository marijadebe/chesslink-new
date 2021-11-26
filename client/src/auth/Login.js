import React, {useState, useContext} from "react";
import {Box, TextField, Button, Container, Typography, Link, SpeedDial, SpeedDialAction} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InfoIcon from '@mui/icons-material/Info';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import {Link as RouterLink, Navigate} from 'react-router-dom';
import axios from 'axios';
import ChesslinkLogo from '../ChesslinkLogo.js';
import "../css/Login.css";
import ModeContext from "../ModeContext.js";
import InfoDialog from './InfoDialog';
axios.defaults.withCredentials = true;

function Login() {
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [isLogged, setIsLogged] = useState(false);
    var [openDialog, setOpenDialog] = useState(false);
    var {colorMode, setColorMode} = useContext(ModeContext);

    var authLogin = () => {
        axios.post('http://localhost:8000/auth/log', {username:username, password:password}, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }).then((response) => {
            setIsLogged(true);
          }).catch(err => {
              console.log("error");
          })
    }
    var changeTheme = () => {
        if(colorMode === 'dark') {
            setColorMode('light');
        }else {
            setColorMode('dark');
        }
    }
    if(isLogged === false) {
    return(
        <Container component="main" maxWidth="xs">
            <Typography variant="h2" margin="normal">Chesslink&nbsp;<ChesslinkLogo size="70"/></Typography>
            <Box sx={{display:'flex',flexDirection:'column'}}>
                <Typography textAlign="center" variant="h5" sx={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',mb:3}}>
                    <LockOpenIcon fontSize="50"/>&nbsp;Sign in
                </Typography>
                <TextField label="Username" margin="normal" variant="filled" onChange={(e)=>setUsername(e.target.value)}/>
                <TextField label="Password" type="password" margin="normal" variant="filled" onChange={(e)=>setPassword(e.target.value)}/>
                <Button margin="normal" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={()=>authLogin()}>Sign in</Button>
                <Link component={RouterLink} to="/recover">Forgot your password?</Link>
                <Link component={RouterLink} to="/signup">Don't have an account? Sign Up</Link>
            </Box>
            <SpeedDial
            ariaLabel="Display more"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            >
                <SpeedDialAction icon={<LightbulbIcon />} onClick={()=>changeTheme()} tooltipTitle="Change theme" />
                <SpeedDialAction icon={<InfoIcon />} onClick={()=>setOpenDialog(true)} tooltipTitle="About" />
            </SpeedDial>
            <InfoDialog isOpened={openDialog} closeDialog={()=>setOpenDialog(false)}/>
        </Container>
    );
    }else {
        return <Navigate to="/" />;
    }
}

export default Login;