import React, {useState, useEffect} from "react";
import {Box, TextField, Button, Container, Typography, Fab, Link} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {Link as RouterLink, Navigate} from 'react-router-dom';
import axios from 'axios';
import ChesslinkLogo from '../ChesslinkLogo.js';
import "../css/Login.css";
axios.defaults.withCredentials = true;

function Login() {
    var [opened, isOpened] = useState(false);
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [isLogged, setIsLogged] = useState(false);

    var openBottom = () => {
        isOpened(!opened);
    }

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
    var getFabIcon = () => {
        if(opened) return <CloseIcon className="fabicon"/>;
        return <AssignmentOutlinedIcon className="fabicon"/>;
    }
    if(isLogged === false) {
    return(
        <Container component="main" maxWidth="xs">
            <Typography variant="h2" margin="normal">Chesslink&nbsp;</Typography><ChesslinkLogo size="130" className="logoLogin"/>
            <Box sx={{display:'flex',flexDirection:'column'}}>
                <Typography textAlign="center" variant="h5" sx={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',mb:3}}>
                    <LockOpenIcon fontSize="50"/><p>&nbsp;Sign in</p>
                </Typography>
                <TextField label="Username" margin="normal" variant="filled" onChange={(e)=>setUsername(e.target.value)}/>
                <TextField label="Password" type="password" margin="normal" variant="filled" onChange={(e)=>setPassword(e.target.value)}/>
                <Button margin="normal" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={()=>authLogin()}>Sign in</Button>
                <Link component={RouterLink} to="/recover">Forgot your password?</Link>
                <Link component={RouterLink} to="/signup">Don't have an account? Sign Up</Link>
            </Box>
            <Fab color="primary" sx={{position:"absolute",right:0,bottom:0,m:3}} onClick={()=>openBottom()}>
            {getFabIcon()}
            </Fab>
        </Container>
    );
    }else {
        return <Navigate to="/" />;
    }
}

export default Login;