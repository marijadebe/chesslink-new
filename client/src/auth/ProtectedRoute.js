import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import Loading from '../Loading.js';
import axios from 'axios';
axios.defaults.withCredentials = true;

function ProtectedRoute(props) {
    var [isLogged, setIsLogged] = useState("Loading");
    useEffect(() => {
        axios.get('http://localhost:8000/auth/log').then((response)=> {
            console.log(response);
            setIsLogged("True");
        }).catch((err) =>{
            setIsLogged("False");
        })
    }, [])
    switch(isLogged) {
        case "Loading":
            return <Loading />;
        case "True":
            return props.component;
        case "False":
            return <Navigate to="/signin" />;
        default:
            return <div></div>;
    }
}

export default ProtectedRoute;
