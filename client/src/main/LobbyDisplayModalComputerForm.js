import { FormLabel, MenuItem, Select, Slider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function LobbyDisplayModalComputerForm() {
    return(
        <Box component="form" p={3} sx={{display:'flex',flexDirection:'column'}}>
            <FormLabel>Time control</FormLabel>
            <Slider aria-label="Volume" valueLabelDisplay="auto"/>
            <FormLabel>Choose color</FormLabel>
            <Select>
                <MenuItem>Black</MenuItem>
                <MenuItem>White</MenuItem>
            </Select>
            <FormLabel>Choose difficulty</FormLabel>
            <Select>
                <MenuItem>Easy</MenuItem>
                <MenuItem>Medium</MenuItem>
                <MenuItem>Hard</MenuItem>
                <MenuItem>___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED</MenuItem>
            </Select>
        </Box>
    );
}

export default LobbyDisplayModalComputerForm;