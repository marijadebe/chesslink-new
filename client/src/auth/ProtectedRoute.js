import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import Loading from '../Loading.js';
import axios from 'axios';
axios.defaults.withCredentials = true;
var authValid = 0;

function ProtectedRoute(props) {
    var [isLogged, setIsLogged] = useState("Loading");
    useEffect(() => {
        axios.get('http://localhost:8000/auth/log').then((response)=> {
            authValid = parseInt(response.data);
            setIsLogged("True");
        }).catch((err) =>{
            setIsLogged("False");
        })
    }, [])
    axios.get('http://localhost:8000/auth/log').then((response)=> {
            authValid = parseInt(response.data);
            setIsLogged("True");
        }).catch((err) =>{
            setIsLogged("False");
        })
    switch(isLogged) {
        case "Loading":
            return <Loading />;
        case "True":
            if(props.requiresValid) {
                if(authValid === 1) {
                    return props.component;
                }else {
                    return <Navigate to="/verify" />;
                }
            }else {
                if(authValid === 1) {
                    return <Navigate to="/" />;
                }else {
                    return props.component;
                }
            }
        case "False":
            return <Navigate to="/signin" />;
        default:
            return <div></div>;
    }
}

export default ProtectedRoute;
