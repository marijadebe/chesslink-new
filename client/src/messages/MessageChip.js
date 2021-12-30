import { Tooltip, Box } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react';
import "../css/Messages.css";

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function MessageChip(props) {
    const theme = useTheme();
    var backgroundColor = "";
    var textColor = "";
    var floatStyle = "";
    var date = new Date(props.time);
    var formatted = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+" "+pad(date.getHours(),2)+":"+pad(date.getMinutes(),2)+":"+pad(date.getSeconds(),2);
    if(props.color == "primary") {
        backgroundColor = theme.palette.primary.main;
        textColor = theme.palette.primary.contrastText;
    }else {
        if(theme.palette.mode == "dark") {
            backgroundColor = "rgba(255, 255, 255, 0.16)";
            textColor = "rgb(255, 255, 255)";
        }else {
            textColor = "rgb(0,0,0)";
            backgroundColor = "rgba(0, 0, 0, 0.08)";
        }
    }
    if(props.color == "primary") {
        floatStyle = "right";
    }else {floatStyle="left";}
    return(
    <div style={{backgroundColor:backgroundColor,color:textColor,float:floatStyle,marginBottom:15}} className="MessageChip">
        <Tooltip title={formatted}><Box>{props.children}</Box></Tooltip>
    </div>
    );
}

export default MessageChip;