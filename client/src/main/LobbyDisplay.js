import { Button } from '@mui/material';
import LobbyDisplayModalComputer from './LobbyDisplayModalComputer';
import LobbyDisplayModalPlayer from './LobbyDisplayModalPlayer';
import React, {useState} from 'react';
import "../css/LobbyDisplay.css";

function LobbyDisplay() {
    const [isComputerDisplayed, setIsComputerDisplayed] = useState(false);
    const [isPlayerDisplayed, setIsPlayerDisplayed] = useState(false);
    var handleClose = () => {
        setIsComputerDisplayed(false);
        setIsPlayerDisplayed(false);
    }
    return(
        <div className="lobbyDisplay">
        <Button onClick={()=>setIsPlayerDisplayed(true)}>Create game</Button>
        <Button onClick={()=>setIsComputerDisplayed(true)}>Play against computer</Button>
        <LobbyDisplayModalComputer open={isComputerDisplayed} onClose={handleClose}/>
        <LobbyDisplayModalPlayer open={isPlayerDisplayed} onClose={handleClose}/>
        </div>
    );
}

export default LobbyDisplay;