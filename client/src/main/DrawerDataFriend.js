import { ListItem, ListItemAvatar, Avatar, Link, Badge, Box } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import React from "react";

function DrawerDataFriend({data, token}) {
    console.log(data)
    if(data.offeror.id == token) {
        return(
            <ListItem key={data.offeree.id}>
                <ListItemAvatar>
                <Badge anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}  overlap="circular" badgeContent={data.offeree.online==1?" ":"×"} color={data.offeree.online===1?"success":"error"}>
                    <Avatar src={data.offeree.avatar} />
                </Badge>
                </ListItemAvatar>                    
                    <Link component={RouterLink} to={"/users/"+data.offeree.username}>{data.offeree.username}</Link>
            </ListItem>
        )
    }else {    
        return(
            <ListItem key={data.offeror.id}>
                <ListItemAvatar>
                <Badge overlap="circular" anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} badgeContent={data.offeree.online==1?" ":"x"} color={data.offeror.online===1?"success":"error"}>
                    <Avatar src={data.offeror.avatar} />
                </Badge>    
                </ListItemAvatar>                    
                <Link component={RouterLink} to={"/users/"+data.offeror.username}>{data.offeror.username}</Link>
            </ListItem>
        );
    }
}

export default DrawerDataFriend;