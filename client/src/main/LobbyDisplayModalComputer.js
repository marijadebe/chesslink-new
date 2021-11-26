import { Dialog, DialogContent, Button, DialogTitle, DialogActions } from '@mui/material';
import LobbyDisplayModalComputerForm from './LobbyDisplayModalComputerForm';
import React from 'react';
import { useNavigate } from 'react-router';

function LobbyDisplayModalComputer(props) {
    var navigate = useNavigate();    
    var handleClose = () => {
        props.onClose();
    }
    var redirectToSinglePlayer = () => {
        navigate('/singleplayer', {state: {neco:"neco"} });
    }
    return(
        <Dialog onClose={handleClose} open={props.open}>
            <DialogTitle>Play against Computer</DialogTitle>
            <DialogContent>
                <LobbyDisplayModalComputerForm />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={redirectToSinglePlayer}>Challenge</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LobbyDisplayModalComputer;