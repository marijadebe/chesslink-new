import { Dialog, DialogTitle, DialogActions, DialogContent, Button, DialogContentText, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useTheme } from '@mui/material/styles';

function InfoDialog(props) {
    const theme = useTheme();
    const handleClose = () => {
        props.closeDialog();
    }
    return(
        <Dialog
        open={props.isOpened}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"About"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Chesslink is a single page web application for playing chess and networking
            with other chess players.
            Github page: <Link href="https://github.com/marijadebe/chesslink-new">marijadebe/chesslink-new</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default InfoDialog;