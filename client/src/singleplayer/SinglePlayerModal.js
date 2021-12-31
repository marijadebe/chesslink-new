import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SinglePlayerModal({content}) {
    var navigate = useNavigate();
    return(
        <Dialog open={true}>
            <DialogTitle>
                {content === "comwon" ? "Computer has won!" : "You have won!"}
            </DialogTitle>
            <DialogContent>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>navigate('/')}>Return to Homepage</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SinglePlayerModal;