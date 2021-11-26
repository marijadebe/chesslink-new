import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

function LobbyDisplayModalPlayer(props) {
    var handleClose = () => {
        props.onClose();
    }
    return(
        <Dialog onClose={handleClose} open={props.open}>
            <DialogTitle>Create Game</DialogTitle>
            <DialogContent>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained">Challenge</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LobbyDisplayModalPlayer;