import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputBase, Paper, TextField, Typography } from "@mui/material";
import React, {useState} from "react";
import "../css/ConfigurationModal.css";
import axios from 'axios';
import { API_URL } from "../apiHelper";
import ConfigurationModalColor from "./ConfigurationModalColor";
axios.defaults.withCredentials = true;

function ConfigurationModal(props) {
    const [file, setFile] = useState({});
    var changeFile = (event) => {
        setFile(event.target.files[0]);
    }
    var imageUpload = () => {
        const formData = new FormData();
        formData.append('image',file);
        axios.post(`${API_URL}/api/users/upload`,formData,{
            headers: { "Content-Type": "multipart/form-data" }
          }).then(()=> {
            console.log("povedlo se")
        }).catch((err)=> {
            console.log(err);
        })
    }
    return(
        <Dialog open={props.open} onClose={props.handleClose} fullWidth={true}>
            <DialogTitle>Configuration</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Account</Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="overline">Upload Avatar</Typography>
                        <Divider/>
                        <input type="file" accept="image/*" title="Image has to be 250 x 250px." onChange={(event)=>changeFile(event)}/><br/><br/>
                        <Button variant="contained" onClick={()=>imageUpload()}>Upload</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="overline">Change Password</Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Gameplay</Typography>
                        <Divider/>
                    </Grid>
                    <ConfigurationModalColor/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfigurationModal;