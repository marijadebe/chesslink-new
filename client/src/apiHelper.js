import axios from 'axios';
axios.defaults.withCredentials = true;

export const deleteLogin = () => {
    axios.delete('http://localhost:8000/auth/log').then(()=>{
    
    })
}