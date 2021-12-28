import axios from 'axios';
axios.defaults.withCredentials = true;

export const deleteLogin = () => {
    axios.delete('/auth/log').then(()=>{
    
    })
}