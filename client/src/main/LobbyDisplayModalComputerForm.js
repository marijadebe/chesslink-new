import { FormLabel, MenuItem, Select, Slider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function LobbyDisplayModalComputerForm(props) {
    var changeColor = (value) => {
        props.liftColor(value);
    }
    var changeDifficulty = (value) => {
        props.liftDifficulty(value);
    }
    return( 
        <Box component="form" p={3} sx={{display:'flex',flexDirection:'column'}}>
            <FormLabel>Time control</FormLabel>
            <Slider aria-label="Volume" valueLabelDisplay="auto"/>
            <FormLabel>Choose color</FormLabel>
            <Select value={props.color} onChange={(event)=>changeColor(event.target.value)}>
                <MenuItem value="black">Black</MenuItem>
                <MenuItem value="white">White</MenuItem>
            </Select>
            <FormLabel>Choose difficulty</FormLabel>
            <Select value={props.difficulty} onChange={(event)=>changeDifficulty(event.target.value)}>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
                <MenuItem value="extreme">___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED</MenuItem>
            </Select>
        </Box>
    );
}

export default LobbyDisplayModalComputerForm;