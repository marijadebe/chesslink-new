import React, {useState, useContext } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SettingsIcon from '@mui/icons-material/Settings';
import { deleteLogin } from "../apiHelper";
import { useNavigate } from "react-router";
import ModeContext from "../ModeContext";
import ConfigurationModal from "./ConfigurationModal";

function MainDial() {
    var navigate = useNavigate();
    const {colorMode,setColorMode} = useContext(ModeContext);
    const [isConfOpen, setConfOpen] = useState(false);

    var changeColorMode = () => {
        if(colorMode === 'dark') {
            setColorMode('light');
        }else {
            setColorMode('dark');
        }
    }
    var unLog = () => {
        console.log("necocoococ")
        deleteLogin();
        navigate("signin");
    }
    return(
        <>
        <ConfigurationModal open={isConfOpen} handleClose={()=>setConfOpen(false)} />
        <SpeedDial
        ariaLabel="Display more"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        >
            <SpeedDialAction icon={<LogoutIcon />} onClick={()=>unLog()} tooltipTitle="Logout" />
            <SpeedDialAction icon={<LightbulbIcon />} onClick={()=>changeColorMode()} tooltipTitle="Change theme" />
            <SpeedDialAction icon={<SettingsIcon />} onClick={()=>setConfOpen(true)}tooltipTitle="Settings" />
        </SpeedDial>
        </>
    )
}

export default MainDial;