import "../css/Messages.css";
import React from 'react';
import MessageChip from './MessageChip';

  

function Message({isYourself, content, time}) {
    if(isYourself) {
        return(
            <>
            <MessageChip color="primary" time={time}>{content}</MessageChip><br/><br/>
            </>
        );
    }else {
        return(
            <>
            <MessageChip time={time}>{content}</MessageChip><br/><br/>
            </>
        );
    }
}

export default Message;