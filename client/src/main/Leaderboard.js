import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loading from '../Loading';
import {Link as RouterLink} from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link, Typography, Divider } from '@mui/material';
import { API_URL } from '../apiHelper';
axios.defaults.withCredentials = true;

function Leaderboard() {
    const [data, setData] = useState([]);
    useEffect(()=> {
        axios.get(`${API_URL}/api/users/leaderboard`).then((res)=> {
            setData(res.data)
        })
    },[])
    if(data.length <= 0) return <Loading />
    return(
        <>
            <Typography
                sx={{ mt: 0.5, ml: 2 }}
                color="text.secondary"
                display="block"
                variant="caption"
                >Leaderboard</Typography><Divider/>
            <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Rating</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((row) => (
                    <TableRow
                    key={row.username}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell><Link component={RouterLink} to={"/users/"+row.username}>{row.username}</Link></TableCell>
                    <TableCell>{row.rating}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}

export default Leaderboard;