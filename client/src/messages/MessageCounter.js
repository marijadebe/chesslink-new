import { Typography } from '@mui/material';
import React from 'react';

function MessageCounter({count}) {
    return(
        <Typography variant="caption">&nbsp;{count}/150</Typography>
    );
}

export default MessageCounter;