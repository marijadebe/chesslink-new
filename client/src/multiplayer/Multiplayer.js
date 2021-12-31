import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socketInstance';

function Multiplayer() {
    const {id} = useParams();
    useEffect(()=> {
        socket.emit("joinRoom", id)
    },[])
    return(
        <>
        </>
    );
}

export default Multiplayer;