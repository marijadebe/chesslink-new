import { ListItem, ListItemAvatar, Avatar, Link, Badge, styled } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import React from "react";

function DrawerDataFriend({data, token}) {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""',
          },
        }
      }));
    if(data.offeror.id === token) {
        return(
            <ListItem key={data.offeree.id}>
                <ListItemAvatar>
                <StyledBadge anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} variant="dot" overlap="circular" color={data.offeree.online===1?"success":"error"}>
                    <Avatar src={data.offeree.avatar} />
                </StyledBadge>
                </ListItemAvatar>                    
                    <Link component={RouterLink} to={"/users/"+data.offeree.username}>{data.offeree.username}</Link>
            </ListItem>
        )
    }else {    
        return(
            <ListItem key={data.offeror.id}>
                <ListItemAvatar>
                <StyledBadge overlap="circular" anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} variant="dot" color={data.offeror.online===1?"success":"error"}>
                    <Avatar src={data.offeror.avatar} />
                </StyledBadge>    
                </ListItemAvatar>                    
                <Link component={RouterLink} to={"/users/"+data.offeror.username}>{data.offeror.username}</Link>
            </ListItem>
        );
    }
}

export default DrawerDataFriend;