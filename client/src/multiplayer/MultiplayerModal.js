import { Dialog, DialogTitle } from "@mui/material";
import React, {useState, useEffect} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

function MultiplayerModal({content}) {
    const [data, setData] = useState({});
    useEffect(()=> {
        axios.get('/api/users/'+content).then((result) => {
            setData(result.data)
        }).catch((err) => {
        
        })
    },[])
    return(
        <Dialog open={true}>
            <DialogTitle>
                {data.username} has won!!
            </DialogTitle>
        </Dialog>
    )
}

export default MultiplayerModal;