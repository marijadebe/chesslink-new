import { Button } from '@mui/material';
import LobbyDisplayModalComputer from './LobbyDisplayModalComputer';
import LobbyDisplayModalPlayer from './LobbyDisplayModalPlayer';
import React, {useState} from 'react';

function LobbyDisplay() {
    const [isComputerDisplayed, setIsComputerDisplayed] = useState(false);
    const [isPlayerDisplayed, setIsPlayerDisplayed] = useState(false);
    var handleClose = () => {
        setIsComputerDisplayed(false);
        setIsPlayerDisplayed(false);
    }
    return(
        <>
        <Button onClick={()=>setIsPlayerDisplayed(true)}>Create game</Button>
        <Button onClick={()=>setIsComputerDisplayed(true)}>Play against computer</Button>
        <LobbyDisplayModalComputer open={isComputerDisplayed} onClose={handleClose}/>
        <LobbyDisplayModalPlayer open={isPlayerDisplayed} onClose={handleClose}/>
        </>
    );
}

export default LobbyDisplay;