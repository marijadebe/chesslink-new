import { Button, Dialog, DialogTitle } from "@mui/material";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../apiHelper";
axios.defaults.withCredentials = true;

function MultiplayerModal({content}) {
    var navigate = useNavigate();
    const [data, setData] = useState({});
    useEffect(()=> {
        axios.get(`${API_URL}/api/users/${content}`).then((result) => {
            setData(result.data)
        }).catch((err) => {
        
        })
    },[])
    return(
        <Dialog open={true}>
            <DialogTitle>
                {data.username} has won!!
                <Button onClick={()=>navigate('/')} >Return to homepage</Button>
            </DialogTitle>
        </Dialog>
    )
}

export default MultiplayerModal;