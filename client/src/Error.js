import React from "react";
import { Alert } from "@mui/material";

function Error(props) {
    var getMessage = () => {
        switch(props.type) {
            case "404":
                return(
                    <Alert severity="error">Error 404 - Not Found!</Alert>
                );
            case "403":
                return(
                    <Alert severity="error">Error 403 - Forbidden!</Alert>
                );
            default:
                return(
                    <Alert severity="error">Unknown Error</Alert>
                );
        }
    }
    
    return(
        <div>
            {getMessage()}
        </div>

    );
}

export default Error;