import React from 'react';
import {CircularProgress, Box} from '@mui/material';
import './css/Loading.css';

function Loading() {
    return(
        <Box className="displayLoad">
            <CircularProgress className="pad"/>
        </Box>
    );
}

export default Loading;