import React, {useState, useContext} from "react";
import "../css/Register.css";
import {Box, TextField, Button, Container, Typography, Link, SpeedDial, SpeedDialAction} from "@mui/material";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InfoIcon from '@mui/icons-material/Info';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import {Link as RouterLink, Navigate} from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';
import ChesslinkLogo from '../ChesslinkLogo';
import ModeContext from "../ModeContext.js";
import InfoDialog from './InfoDialog';
import { API_URL } from "../apiHelper";
axios.default.withCredentials = true;
var passwordsSame = true;

function Register() {
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [repeatPassword, setRepeatPassword] = useState("");
    var [email, setEmail] = useState("");
    var [openDialog, setOpenDialog] = useState(false);
    var [isRegged, setIsRegged] = useState(false);
    var {colorMode, setColorMode} = useContext(ModeContext);
    var authRegister = () => {
        if(passwordsSame) {
        axios.post(`${API_URL}/auth/reg`, {username: username, password: password, email:email}, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true}).then((response) => {
                setIsRegged(true);
            }).catch((err) => {
                console.log("error");
            });
        }
    }
    var validatePasswords = (value) => {
        if(value === password) {
            passwordsSame = true;
        }else {
            passwordsSame = false;
        }
        setRepeatPassword(value);
    }
    var changeTheme = () => {
        if(colorMode === 'dark') {
            setColorMode('light');
        }else {
            setColorMode('dark');
        }
    }
    if(!isRegged) {
        return(
            <Container component="main" maxWidth="xs">
                <Typography variant="h2" margin="normal">Chesslink&nbsp;<ChesslinkLogo size="70"/></Typography>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Typography textAlign="center" variant="h5" sx={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',mb:3}}>
                        <AppRegistrationIcon fontSize="50"/>&nbsp;Sign up
                    </Typography>
                    <TextField label="Username" margin="normal" variant="filled" onChange={(e)=>setUsername(e.target.value)}/>
                    <TextField label="Email address" margin="normal" variant="filled" onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField label="Password" type="password" margin="normal" variant="filled" onChange={(e)=>setPassword(e.target.value)}/>
                    <TextField error={!passwordsSame ? true : false} label="Password again" type="password" margin="normal" variant="filled" onChange={(e)=>validatePasswords(e.target.value)}/>
                    <Button margin="normal" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={()=>authRegister()}>Sign Up</Button>
                    <Link component={RouterLink} to="/signin">Already have an account? Sign in</Link>
                </Box>
                <SpeedDial
            ariaLabel="Display more"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            >
                <SpeedDialAction icon={<LightbulbIcon />} onClick={()=>changeTheme()} tooltipTitle="Change theme" />
                <SpeedDialAction icon={<InfoIcon />} onClick={()=>setOpenDialog(true)} tooltipTitle="About" />
            </SpeedDial>
            <InfoDialog isOpened={openDialog} closeDialog={()=>setOpenDialog(false)} />
            </Container>
        );
    }else {
        return <Navigate to="/verify" />;
    }
}

export default Register;