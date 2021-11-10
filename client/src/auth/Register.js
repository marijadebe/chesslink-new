import React from "react";
import "../css/Register.css";
import {Box, TextField, Button, Container, Typography, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';
axios.default.withCredentials = true;

function Register() {
    return(
        <Container component="main" maxWidth="xs">
            <Typography variant="h2" margin="normal">Chesslink</Typography>
            <Box sx={{display:'flex',flexDirection:'column'}}>
                <Typography textAlign="center" variant="h5" sx={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',mb:3}}>
                    <AppRegistrationIcon fontSize="50"/>&nbsp;Sign up
                </Typography>
                <TextField label="Username" margin="normal" variant="filled"/>
                <TextField label="Email address" margin="normal" variant="filled"/>
                <TextField label="Password" type="password" margin="normal" variant="filled"/>
                <TextField label="Password again" type="password" margin="normal" variant="filled"/>
                <Button margin="normal" variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                <Link component={RouterLink} to="/signin">Already have an account? Sign in</Link>
            </Box>
        </Container>
    );
}

export default Register;