import React, {useState} from 'react';
import {Select, FormControl, InputLabel, MenuItem} from '@mui/material';

function SelectChart(props) {
    const [chartType, setChartType] = useState(10);

    const handleChange = (value) => {
        setChartType(value);
        switch (value) {
            case 10:
                props.signalChart("area");
                break;
            case 20:
                props.signalChart("pie");
                break;
            default: 
                break;
        }
    }
    return(
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Players' rating</InputLabel>
            <Select displayEmpty value={chartType} onChange={(e) => handleChange(e.target.value)}>
                <MenuItem value={10}>Area Chart</MenuItem>
                <MenuItem value={20}>Pie Chart</MenuItem>
            </Select>
        </FormControl>
    );
}

export default SelectChart;