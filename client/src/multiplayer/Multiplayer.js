import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import socket from '../socketInstance';
import "../css/Singleplayer.css";
import { Chessboard } from 'react-chessboard';
import MainDial from '../main/MainDial';
import MultiplayerPanel from './MultiplayerPanel';
import Chess from 'chess.js';
import axios from "axios";
import MultiplayerModal from './MultiplayerModal';
import PushNotification from '../pushnotifications/PushNotification';
import { API_URL } from '../apiHelper';
import Peer from 'simple-peer';
axios.defaults.withCredentials = true;

function Multiplayer() {
    const [game, setGame] = useState(new Chess());
    const {id} = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [data, setData] = useState({});
    const [gameOver, setGameOver] = useState(-1);
    const [yourMove, setYourMove] = useState(false);
    const [stream, setStream] = useState(null);
    const [peer, setPeer] = useState(null);
    
    const myVideoFeed = useRef();
    const userVideoFeed = useRef();
    const peerRef = useRef();

    var safeGameMutate = (modify) => {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }
    var moveMethod = (source, target, piece) => {
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
          socket.emit("moveRoom",game.fen(),id);
          return true;
    }
    useEffect(()=> {
        socket.emit("joinRoom", id)
        axios.get(`${API_URL}/api/boards/${id}`).then((res)=> {
            setData(res.data);
            setGame(new Chess(res.data.fen));
            console.log(res.data.whiteMove+", "+res.data.yourself+", "+res.data.playerWhite);
            console.log((res.data.whiteMove === 1 && res.data.playerWhite === res.data.yourself) || (res.data.whiteMove === 0 && res.data.playerBlack === res.data.yourself))
            if((res.data.whiteMove === 1 && res.data.playerWhite === res.data.yourself) || (res.data.whiteMove === 0 && res.data.playerBlack === res.data.yourself)) {
                setYourMove(true);
            }
        }).catch((err)=> {
        })
        socket.on("joinRoomCallback", (count) => {
            if(count === 2) {
                const peer = new Peer({initiator: false, trickle: false, stream});
                setIsPlaying(true);
            }else {
                const peer = new Peer({initiator: true, trickle: false, stream});
                setIsPlaying(false);
            }
            peer.on('stream', (currentStream) => {
                userVideoFeed.current.srcObject = currentStream;
            })
            peerRef.current = peer;
        })
        socket.on("gameMutate", (fen) => {
            setYourMove(true)
            setGame(new Chess(fen))
        })
        socket.on("playerWon", (fen,id)=>{
            setYourMove(false)
            setGame(new Chess(fen))
            setGameOver(id)
        })
        return () => {
            socket.off("joinRoomCallback")
            socket.off("gameMutate")
            socket.off("playerWon")
            socket.emit("leaveRoom", id)
            peerRef.current.destroy();
        }
    },[])

    useEffect(()=> {
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(
            (currentStream)=> {
                setStream(currentStream);
                myVideoFeed.current.srcObject = currentStream;
            }
        )
    },[])

    if(!isPlaying) return(<><Loading />Waiting for opponent...</>);
    if(Object.keys(data).length === 0) return(<><Loading />Fetching from API...</>);
    return(
        <div className="mainView">
            <Chessboard id="BasicBoard" position={game.fen()} areArrowsAllowed={true} onPieceDrop={moveMethod} boardOrientation={data.yourself===data.playerWhite ? "white" : "black"} />
            <MultiplayerPanel propData={data} />
            {gameOver !== -1 && <MultiplayerModal content={gameOver} />}
            <MainDial/> 
            <PushNotification/>
        </div>
    );
}

export default Multiplayer;