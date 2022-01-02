import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerData from './DrawerData';
import { Drawer } from '@mui/material';

function Navbar({isStatic}) {
    const [isOpen, setIsOpen] = useState(false);
    return(
      <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setIsOpen(true)}
            >
            <MenuIcon />
          </IconButton>
          Chesslink
        </Toolbar>
      </AppBar>
      <Drawer
      anchor='left'
      open={isOpen}
      onClose={()=>setIsOpen(false)}
      >
      <DrawerData/>
      </Drawer>
    </>
    );
}

export default Navbar;