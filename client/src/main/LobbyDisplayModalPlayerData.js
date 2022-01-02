import { Avatar, Badge, ListItem, ListItemAvatar, ListItemButton, ListItemText, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';

function LobbyDisplayModalPlayerData({datapoint, selectedIndex, listItemClick, token, keyProp}) {
    const [data, setData] = useState([]);
    useEffect(()=> {    
        if(token === datapoint.offeror.id) {
            setData(datapoint.offeree)
        }else {
            setData(datapoint.offeror)
        }
    },[])
    var handleListItemClick = (event, index) => {
        listItemClick(event,index);
    }
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
    return(
        <ListItemButton key={data.id}
                selected={selectedIndex === data.id}
                onClick={(event) => handleListItemClick(event, data.id)}
                >
            <ListItemAvatar key={data.id}>
            <StyledBadge key={data.id} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} variant="dot" overlap="circular" color={data.online===1?"success":"error"}>
                <Avatar src={data.avatar} />
            </StyledBadge>
            </ListItemAvatar>
            <ListItemText key={data.id} primary={data.username}/>
        </ListItemButton>
    );  
}

export default LobbyDisplayModalPlayerData;