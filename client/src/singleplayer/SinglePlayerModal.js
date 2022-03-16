import React, { useEffect, useState } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SinglePlayerModal({content,pgnProp}) {
    var navigate = useNavigate();
    const [pgn, setPgn] = useState("");

    useEffect(() => {
        console.log(pgnProp+" neco")
        setPgn(pgnProp);
    },[pgnProp])
    useEffect(()=> {
        console.log(pgn);
    },[pgn])
    console.log(content)
    return(
        <Dialog open={true}>
            <DialogTitle>
                {content === "draw" && "It's a draw."}
                {content === "comwon" && "Computer has won!"}
                {content === "youwon" && "You have won!"}
            </DialogTitle>
            <DialogContent>          
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={()=>navigate('/analysis',{state:pgn})}>Analyze</Button>
                <Button onClick={()=>navigate('/')}>Return to Homepage</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SinglePlayerModal;