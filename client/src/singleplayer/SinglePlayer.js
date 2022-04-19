import React, { useEffect, useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useLocation } from 'react-router-dom';
import Chess from 'chess.js';
import {socket} from "../socketInstance";
import "../css/Singleplayer.css";
import Error from '../Error';
import MainDial from '../main/MainDial';
import SinglePlayerModal from './SinglePlayerModal';
import SinglePlayerPanel from './SinglePlayerPanel';
import axios from "axios";
import { API_URL } from '../apiHelper';
axios.defaults.withCredentials = true;

function SinglePlayer() {
    const newGameAudio = useMemo(()=> new Audio('../res/multi_new.mp3'));
    const moveAudio = useMemo(()=>new Audio('../res/chess_move.mp3'));
    const [game, setGame] = useState(new Chess());
    const [gameOver, setGameOver] = useState("");
    const [yourMove, setYourMove] = useState(false);
    const [lightColor, setLightColor] = useState("#FFFFFF");
    const [darkColor, setDarkColor] = useState("#B58863");
    const [arrowColor, setArrowColor] = useState('#83CF63');
    var state = useLocation().state;
    var safeGameMutate = (modify) => {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }
    var resignGame = () => {
        socket.emit("stockfishResign");
    }
    useEffect(()=> {
        newGameAudio.play();
        if(state.color === "white") setYourMove(true);
        else {
            socket.emit("stockfishMove", game.pgn(),state.difficulty);
        }
        socket.on("stockfishMoveCallback", (pgn) => {
            var chessNew = new Chess();
            chessNew.load_pgn(pgn);
            setGame(chessNew);
            setYourMove(true);
            moveAudio.play();
        })
        socket.on("stockfishMoveWin", () => {
            setGameOver("youwon")
        })
        socket.on("stockfishMoveLoss", () => {
            setGameOver("comwon")
        })
        socket.on("stockfishMoveDraw", () => {
            setGameOver("draw")
        })
        axios.get(`${API_URL}/api/users/yourself`).then((result)=> {
            console.log(result.data.preferences);
            setLightColor(JSON.parse(result.data.preferences).lightColor);
            setDarkColor(JSON.parse(result.data.preferences).darkColor);
            setArrowColor(JSON.parse(result.data.preferences).arrowColor);
        }).catch((err)=> {

        })
        return () => {
            socket.off("stockfishMoveCallback")
            socket.off("stockfishMoveWin")
            socket.off("stockfishMoveLoss")
            socket.off("stockfishMoveDraw")
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
          moveAudio.play();
          socket.emit("stockfishMove",game.pgn(),state.difficulty);
          return true;  
    }
    if(state === null) return(<Error type="403" />);
    return(
        <div className="mainView">
        <Chessboard id="BasicBoard" 
        customDarkSquareStyle={{backgroundColor:darkColor}} 
        customLightSquareStyle={{backgroundColor:lightColor}} 
        customArrowColor={arrowColor} 
        boardOrientation={state.color} 
        position={game.fen()} 
        areArrowsAllowed={true} 
        onPieceDrop={moveMethod} />
        <SinglePlayerPanel color={state.color} level={state.difficulty} resignation={()=>resignGame()}/>
        {gameOver !== "" && <SinglePlayerModal content={gameOver} pgnProp={game.pgn()} />}
        <MainDial/>
        </div>
    );
}

export default SinglePlayer;