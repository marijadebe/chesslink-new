import { ListItem, Avatar, Button, ListItemAvatar } from '@mui/material';
import React from 'react';
import socket from '../socketInstance';

function DrawerDataPending({data}) {
    var accept = (id) => {
        socket.emit('acceptFriendReq', id)
    }
    var decline = (id) => {
        socket.emit('declineFriendReq', id)
    }
    return(
        <ListItem key={data.offeror.id}>
            <ListItemAvatar>
                <Avatar src={data.offeror.avatar} />
            </ListItemAvatar>                    
                {data.offeror.username}&nbsp;
            <Button variant="contained" color="success" onClick={()=>accept(data.offeror.id)}>Accept</Button>
            <Button color="error" onClick={()=>decline(data.offeror.id)}>Decline</Button>
        </ListItem>
    );
}

export default DrawerDataPending;