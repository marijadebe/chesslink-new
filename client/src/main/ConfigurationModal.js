import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";

function ConfigurationModal(props) {
    return(
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Configuration</DialogTitle>
            <DialogContent>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfigurationModal;