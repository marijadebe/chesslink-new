import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useLocation } from 'react-router-dom';
import Chess from 'chess.js';
import {socket} from "../socketInstance";
import "../css/Singleplayer.css";
import Error from '../Error';
import MainDial from '../main/MainDial';
import SinglePlayerModal from './SinglePlayerModal';
import SinglePlayerPanel from './SinglePlayerPanel';

function SinglePlayer() {
    const [game, setGame] = useState(new Chess());
    const [gameOver, setGameOver] = useState("");
    const [yourMove, setYourMove] = useState(false);
    var state = useLocation().state;
    var safeGameMutate = (modify) => {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }
    useEffect(()=> {
        if(state.color === "white") setYourMove(true);
        else {
            socket.emit("stockfishMove", game.fen());
        }
        socket.on("stockfishMoveCallback", (fen) => {
            setGame(new Chess(fen));
            setYourMove(true);
        })
        socket.on("stockfishMoveWin", () => {
            setGameOver("youwon")
        })
        socket.on("stockfishMoveLoss", () => {
            setGameOver("comwon")
        })
        return () => {
            socket.off("stockfishMoveCallback")
            socket.off("stockfishMoveWin")
            socket.off("stockfishMoveLoss")
        }
    },[state])
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
    if(state === null) return(<Error type="403" />);
    return(
        <div className="mainView">
        <Chessboard id="BasicBoard" boardOrientation={state.color} position={game.fen()} areArrowsAllowed={true} onPieceDrop={moveMethod} />
        <SinglePlayerPanel color={state.color} level={state.difficulty}/>
        {gameOver !== "" && <SinglePlayerModal content={gameOver} />}
        <MainDial/>
        </div>
    );
}

export default SinglePlayer;