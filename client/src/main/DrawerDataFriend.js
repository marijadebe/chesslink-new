import { ListItem, ListItemAvatar, Avatar } from "@mui/material";
import React from "react";

function DrawerDataFriend({data, token}) {
    if(data.offeror.id == token) {
        return(
            <ListItem key={data.offeree.id}>
                <ListItemAvatar>
                    <Avatar src={data.offeree.avatar} />
                </ListItemAvatar>                    
                    {data.offeree.username}
            </ListItem>
        )
    }else {    
        return(
            <ListItem key={data.offeror.id}>
                <ListItemAvatar>
                    <Avatar src={data.offeror.avatar} />
                </ListItemAvatar>                    
                    {data.offeror.username}
            </ListItem>
        );
    }
}

export default DrawerDataFriend;