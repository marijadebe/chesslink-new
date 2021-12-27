import { Dialog, DialogContent, Button, DialogTitle, DialogActions } from '@mui/material';
import LobbyDisplayModalComputerForm from './LobbyDisplayModalComputerForm';
import React, {useState} from 'react';
import { useNavigate } from 'react-router';

function LobbyDisplayModalComputer(props) {
    const [color, setColor] = useState("white");
    const [difficulty, setDifficulty] = useState("medium");
    var navigate = useNavigate();    
    var handleClose = () => {
        props.onClose();
    }
    var redirectToSinglePlayer = () => {
        navigate('/singleplayer', {state: {color:color,difficulty:difficulty} });
    }
    return(
        <Dialog onClose={handleClose} open={props.open}>
            <DialogTitle>Play against Computer</DialogTitle>
            <DialogContent>
                <LobbyDisplayModalComputerForm color={color} difficulty={difficulty} liftColor={(color)=>setColor(color)} liftDifficulty={(difficulty=>setDifficulty(difficulty))} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={redirectToSinglePlayer}>Challenge</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LobbyDisplayModalComputer;