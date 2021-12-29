import { Chip, Tooltip} from '@mui/material';
import "../css/Messages.css";
import React from 'react';

function Message({isYourself, content, time}) {
    var date = new Date(time);
    var formatted = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    if(isYourself) {
        return(
            <>
            <Tooltip title={formatted}><Chip color="primary" label={content} sx={{float:"right"}} className="chipEffect"/></Tooltip><br/>
            </>
        );
    }else {
        return(
            <>
            <Tooltip title={formatted}><Chip label={content} className="chipEffect"/></Tooltip><br/>
            </>
        );
    }
}

export default Message;