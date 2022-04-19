import Chess from "chess.js";
import React, { useEffect, useState, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { useLocation } from "react-router-dom";
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { IconButton, Paper, ButtonGroup } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FastForwardIcon from '@mui/icons-material/FastForward';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import MainDial from '../main/MainDial';
import "../css/Analysis.css";
import { API_URL } from "../apiHelper";
import axios from "axios";
axios.defaults.withCredentials = true;
function Analysis() {
    const {state} = useLocation();
    const [orientation, setOrientation] = useState('white');
    const [game, setGame] = useState(new Chess());
    const stateRef = useRef(state);
    const [lightColor, setLightColor] = useState("#FFFFFF");
    const [darkColor, setDarkColor] = useState("#B58863");
    const [arrowColor, setArrowColor] = useState('#83CF63');
    useEffect(() => {
        console.log(state)
        var newGame = new Chess();
        newGame.load_pgn(state)
        setGame(newGame);
        axios.get(`${API_URL}/api/users/yourself`).then((result)=> {
            console.log(result.data.preferences);
            setLightColor(JSON.parse(result.data.preferences).lightColor);
            setDarkColor(JSON.parse(result.data.preferences).darkColor);
            setArrowColor(JSON.parse(result.data.preferences).arrowColor);
        }).catch((err)=> {
        })
    },[])//pridej otaceni boardu, history, seznam tahu, etc...
    var move = (where) => {
        switch(where) {
            case 0:
                stateRef.current = "";
                var newGame = new Chess();
                newGame.load_pgn(stateRef.current);
                setGame(newGame);
                break;
            case 1:
                stateRef.current = stateRef.current.split(/[0-9]*\./)
                stateRef.current.shift()
                stateRef.current.pop()
                let currentPlaceholder = ""
                for(var i = 0; i < stateRef.current.length; i++) {
                    currentPlaceholder+=(i+1)+"."+stateRef.current[i];
                }
                stateRef.current = currentPlaceholder;
                var newGame = new Chess();
                newGame.load_pgn(stateRef.current);
                setGame(newGame);
                break;
            case 2:
                let stateRefTemp = stateRef.current.split(/[0-9]*\./)
                stateRefTemp.shift()
                var temp = state.split(/[0-9]*\./)
                temp.shift()
                if(temp.length > stateRefTemp.length) {
                    stateRefTemp.push(temp[stateRefTemp.length])
                    let currentPlaceholders = ""
                    for(var i = 0; i < stateRefTemp.length; i++) {
                        currentPlaceholders+=(i+1)+"."+stateRefTemp[i];
                    }
                    stateRef.current = currentPlaceholders;
                    var newGame = new Chess();
                    newGame.load_pgn(stateRef.current);
                    setGame(newGame);
                }
                break;
            case 3:
                var newGame = new Chess();
                stateRef.current = state;
                newGame.load_pgn(stateRef.current)
                setGame(newGame);
                break;
        }
    }
    
    return(
        <>
            <div>
            <Chessboard position={game.fen()} 
            boardOrientation={orientation} 
            areArrowsAllowed={true} 
            customDarkSquareStyle={{backgroundColor:darkColor}} 
            customLightSquareStyle={{backgroundColor:lightColor}} 
            customArrowColor={arrowColor} 
            />
            
            <div className="fenDisplay">
                <small>FEN:&nbsp;{game.fen()}</small>
            </div>
            </div>
            <Paper style={{margin:20,padding:5,height:"50%"}}>
                <div className="sideBar">
                    <div><IconButton onClick={()=>orientation == 'white'?setOrientation('black'):setOrientation('white')}><ThreeSixtyIcon/></IconButton></div>
                    <div class="listLi">{
                        state.split(/[0-9]*\./).slice(1).map((token,index) =>
                            <li key={index}>{index+1}.{token}</li>
                            )
                        }</div>
                    <div>
                    <ButtonGroup variant="outlined">
                        <IconButton onClick={()=>move(0)}><FastRewindIcon/></IconButton>
                        <IconButton onClick={()=>move(1)}><SkipPreviousIcon/></IconButton>
                        <IconButton onClick={()=>move(2)}><SkipNextIcon/></IconButton>
                        <IconButton onClick={()=>move(3)}><FastForwardIcon/></IconButton>
                    </ButtonGroup>
                    </div>
                </div>
            </Paper>
            <MainDial/>
        </>
    );
}

export default Analysis;