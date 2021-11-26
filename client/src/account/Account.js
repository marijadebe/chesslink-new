import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Error from "../Error";
import axios from 'axios';
import Loading from "../Loading";
axios.defaults.withCredentials = true;
var userData;

function Account(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    let {name} = useParams();
    useEffect(()=> {
        axios.get('http://localhost:8000/api/users/ANY/'+name).then((result)=> {
            setLoading(false);
            userData = result.data;
        }).catch((err)=> {
            setLoading(false);
            setError(true);
        })
    },[])
    if(loading) {return(<Loading/>)}
    else if(error) {return(<Error type="404" />)}
    return(
        <>
        {}
        </>
    );
}

export default Account;