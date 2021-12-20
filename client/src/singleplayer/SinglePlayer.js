import React from 'react';
import { Chessboard } from 'react-chessboard';
import { useLocation } from 'react-router-dom';
import Error from '../Error';

function SinglePlayer() {
    var state = useLocation().state;
    if(state == null) {
        return(
        <Error type="403" />
        );
    }
    return(
        <>
        <Chessboard id="BasicBoard" />
        </>
    );
}

export default SinglePlayer;