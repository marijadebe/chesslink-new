import React from 'react';

function ChesslinkLogo(props) {
    return(
        <img src="logo.svg" className="loginLogo" style={{verticalAlign:"text-bottom"}}width={props.size} height={props.size} alt="logo" />
    );
}

export default ChesslinkLogo;