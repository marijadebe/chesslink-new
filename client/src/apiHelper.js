import axios from 'axios';
axios.defaults.withCredentials = true;

export const API_URL = "http://localhost:8000";

export const deleteLogin = () => {
    axios.delete(`${API_URL}/auth/log`).then(()=>{
    
    })
}