import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useLocation } from 'react-router-dom';
import Chess from 'chess.js';
import {socket} from "../socketInstance";
import Error from '../Error';

function SinglePlayer() {
    const [game, setGame] = useState(new Chess());
    var [yourMove, setYourMove] = useState(false);
    var state = useLocation().state;
    
    var safeGameMutate = (modify) => {
        setGame((g) => {
        const update = { ...g };
        modify(update);
        return update;
        });
    }
    useEffect(()=> {
        console.log(state);
        if(state.color == "white") setYourMove(true);
        else {
            socket.emit("stockfishMove", game.fen())
        }
        //Sem prijde socket.on a socket.off pri tahu PC
        socket.on("stockfishMoveCallback", (fen) => {
            setGame(new Chess(fen));
            setYourMove(true);
        })
        return () => {
            socket.off("stockfishMoveCallback")
        }
    },[])
    var moveMethod = (source,target,piece) => {
        var move = null;
        if(!yourMove) return false;
        safeGameMutate((game) => {
            move = game.move({
              from: source,
              to: target,
              promotion: 'q'
            });
          });
          if (move === null) return false;
          setYourMove(false);
          socket.emit("stockfishMove",game.fen());
          return true;  
    }

    if(state == null) return(<Error type="403" />);
    return(
        <>
        <Chessboard id="BasicBoard" boardOrientation={state.color} position={game.fen()} areArrowsAllowed={true} onPieceDrop={moveMethod} />
        </>
    );
}

export default SinglePlayer;