import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
import Peer from "peerjs";
import { v4 as uuidv4 } from 'uuid';
axios.defaults.withCredentials = true;

function Multiplayer() {
    const newGameAudio = useMemo(()=>new Audio('../res/chess_move.mp3'));
    const [game, setGame] = useState(new Chess());
    const {id} = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [data, setData] = useState({});
    const [gameOver, setGameOver] = useState(-1);
    const [yourMove, setYourMove] = useState(false);
    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);
    const peerInstance = useRef(null);
    var state = useLocation().state;

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
          newGameAudio.play();
          socket.emit("moveRoom",game.fen(),id);
          return true;
    }
    useEffect(()=> {
        console.log(API_URL.substring(0, API_URL.lastIndexOf(":8000")).replace('http://',''));
        const peer = new Peer(uuidv4(), {
            host: "localhost",
            key: "peerjs",
            port: "9000",
            path: "/app"
        })
        console.log("Me peerID je "+peer.id);
        peer.on("call", (call) => {
            console.log("Dostal jsem volani");
            console.log(peer);
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({video:true,audio:true}, (stream) => {
                localStreamRef.current.srcObject = stream;
                localStreamRef.current.muted = true;
                localStreamRef.current.play();
                call.answer(stream);
                stream.getVideoTracks()[0].enabled = state.video;
                stream.getAudioTracks()[0].enabled = state.audio;
            })
            call.on('stream', (remoteStream) => {
                remoteStreamRef.current.srcObject = remoteStream;
                remoteStreamRef.current.play();  
            })
        })
        peerInstance.current = peer;
        socket.emit("joinRoom", id, peer.id)
        axios.get(`${API_URL}/api/boards/${id}`).then((res)=> {
            setData(res.data);
            setGame(new Chess(res.data.fen));
            if((res.data.whiteMove === 1 && res.data.playerWhite === res.data.yourself) || (res.data.whiteMove === 0 && res.data.playerBlack === res.data.yourself)) {
                setYourMove(true);
            }
        }).catch((err)=> {
        })
        socket.on("joinRoomCallback", (count, peerId) => {
            if(count == 2) {
                setIsPlaying(true);
            }
            else {
                setIsPlaying(false);
            }
        })
        socket.on("callSender",(pid) => {
            console.log("PeerID: "+pid);
            console.log("MyID: "+peerInstance.current.id);
            call(pid);
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
        socket.on("playerLoss", (fen,id) => {
            setYourMove(false)
            setGame(new Chess(fen))
            setGameOver(id)
        })
        return () => {
            socket.off("joinRoomCallback")
            socket.off("gameMutate")
            socket.off("playerWon")
            socket.off("playerLoss")
            socket.emit("leaveRoom", id)
            peer.destroy();
        }
    },[]);
    var safeGameMutate = (modify) => {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }
    var resignGame = () => {
        socket.emit("playerResign");
    }
    var call = (remotePeerJSId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({video: true, audio: true}, (stream)=> {
            localStreamRef.current.srcObject = stream;
            localStreamRef.current.muted = true;
            localStreamRef.current.play();
            let call = peerInstance.current.call(remotePeerJSId, stream);
            call.on('stream', (remoteStream) => {
                remoteStreamRef.current.srcObject = remoteStream;
                remoteStreamRef.current.play();  
            })
            stream.getVideoTracks()[0].enabled = state.video;
            stream.getAudioTracks()[0].enabled = state.audio;
        })
    }
    if(!isPlaying) return(<><Loading />Waiting for opponent...</>);
    if(Object.keys(data).length === 0) return(<><Loading />Fetching from API...</>);
    return(
        <div className="mainView">
            <div className="chessboard">
            <Chessboard id="BasicBoard" boardWidth={450} position={game.fen()} areArrowsAllowed={true} onPieceDrop={moveMethod} boardOrientation={data.yourself===data.playerWhite ? "white" : "black"} />
            </div>
            <MultiplayerPanel resignation={()=>resignGame()} propData={data} sourceData={localStreamRef} remoteData={remoteStreamRef} />
            {gameOver !== -1 && <MultiplayerModal content={gameOver} />}
            <MainDial/>
            <PushNotification/>
        </div>
    );
}

export default Multiplayer;